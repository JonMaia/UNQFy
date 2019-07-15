import fs from 'fs'; 
import path from "path";
import rp from 'request-promise';
import { Response, NextFunction } from "express";
import { NotificationInterface } from "../model/interfaces";
import { Notification } from "../model/notification";
import { ResourceNotFoundResponse } from '../api/error_response/resource_not_found_response';



export class NotificationController {

    private static instance: NotificationController;
    private notification!: Notification;

    public static getInstance(): NotificationController {
        if(!NotificationController.instance) {
            NotificationController.instance = new NotificationController();
        }
        return NotificationController.instance;
    }

    public getNotification(): Notification{
        let filename = path.join(__dirname, '..', '..', '..', 'notification.json');
        if(this.notification === undefined && fs.existsSync(filename)){
            this.notification = Notification.load(filename);
        } else if(this.notification === undefined) {
            this.notification = new Notification();
            this.saveNotification();
        }
        return this.notification;
    }

    public saveNotification(): void {
        let filename = path.join(__dirname, '..', '..', '..', 'notification.json');
        this.notification.save(filename);
    }

    public setNotification(notification: Notification): void {
        if(process.env.NODE_ENV === 'DEV') {
            this.notification = this.notification;
        }
    }


    /*public static validateData(req: Request, res: Response, next: NextFunction) {
        const artistId: number = req.;
        const email: string = req.params.email;
        if(!artistId || !email) {
            return UNQfyController.handleError(res, new BadResquestResponse()); 
        }
        next();
    }*/

    public static subscribe(req: Request, res: Response): Response {
        const notificationI: NotificationInterface = req.body;
        let artistId: number = notificationI.artistId;
        let email: string = notificationI.email;
        let artist = {
            uri: `localhost:3000/api/artist/${artistId}`,
            json: true
        }
        return rp(artist)
            .then(data => {
                this.instance.notification.addSubscriptor(artistId, email);
            })
            .catch(err => {
                return new Promise((resolve, reject) => {
                    reject(new ResourceNotFoundResponse());
                });
            });
    }

    public static unsubscribe(req: Request, res: Response): Response {

    }

    public static notify(req: Request, res: Response): Response{

    }

    public static subscriptions(req: Request, res: Response): Response{

    }
    
    public static deleteSubscriptions(req: Request, res: Response): Response {
        
    }
}