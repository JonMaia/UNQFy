import { Request, Response } from "express";
import net from "net";
import { SlackService } from "../services/slack_service";

export class MonitorController {

    private static enabled: boolean = true;
    private static readonly SERVERS = [
        {name_server: 'Monitor', hostname: 'localhost', port: 5000, enabled: false},
        {name_server: 'Logging', hostname: 'localhost', port: 4000, enabled: false},
        {name_server: 'Notification', hostname: 'localhost', port: 8000, enabled: false},
        {name_server: 'UnqFy', hostname: 'localhost', port: 3000, enabled: false}
    ]

    public static activate(req: Request, res: Response): Response {
        MonitorController.enabled = true;
        return res.status(200).json();
    }

    public static desactivate(req: Request, res: Response): Response {
        MonitorController.enabled = false;
        return res.status(200).json();
    }

    public static status(req: Request, res: Response): Response | undefined {
        if(!MonitorController.enabled) {
            return res.status(200).json({
                service: 'Monitor',
                status: 'Offline'
            });
        } else {
            Promise.all(MonitorController.SERVERS.map((server) => {
                return this.checkConnection(server.hostname, server.port)
                        .then(() => {
                            if(!server.enabled) {
                                new SlackService().notifyServiceIsWorking(server.name_server);
                                server.enabled = true;
                            }
                            return true;
                        })
                        .catch((err) => {
                            new SlackService().notifyServiceIsNotWorking(server.name_server);
                            server.enabled = false;
                            if(err.code) {
                                console.log(`${err.code}: '${err.address}:${err.port}'`)
                            } else {
                                console.log(err);
                            }
                            return false;
                        })
                        .then((isOnline: boolean) => {
                            return {
                                service: server.name_server,
                                status: (isOnline ? 'Online' : 'Offline')
                            }
                        });
            }))
            .then((serverStatus) => {
                return res.status(200).json(serverStatus);
            })
        }
    }

    private static checkConnection(host: string, port: number, timeout?: number) {
        return new Promise((resolve, reject) => {
            timeout = timeout || 10000;     // default of 10 seconds
            let timer = setTimeout(() => {
                reject("timeout");
                socket.end();
            }, timeout);
            let socket = net.createConnection(port, host, () => {
                clearTimeout(timer);
                resolve();
                socket.end();
            });
            socket.on('error', (err) => {
                clearTimeout(timer);
                reject(err);
                socket.end();
            });
        });
    }
}