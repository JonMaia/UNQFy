import { Request, Response } from "express";
import net from "net";

export class MonitorController {

    private static enabled: boolean = true;
    private static readonly SERVERS = [
        {name_server: 'Monitor', hostname: 'localhost', port: 5000},
        {name_server: 'UnqFy', hostname: 'localhost', port: 3000}
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
                            return true;
                        })
                        .catch((err) => {
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