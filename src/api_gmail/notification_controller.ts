import fs from 'fs'; 
import path from "path";
import rp from 'request-promise';
import { Response, NextFunction, Request } from "express";
import { NotificationInterface } from "../model/interfaces";
import { Notification } from "../model/notification";
import { RelatedResourceNotFound } from '../api/error_response/related_resource_not_found';
import { BadResquestResponse } from '../api/error_response/bad_resquest_response';
import { GmailService } from './gmail_service';
import { UNQfyController } from '../api/controllers/unqfy_controller';
import { ErrorResponse } from '../api/error_response/error_response';


export class NotificationController {

    private static instance: NotificationController;
    private notification!: Notification;
    
    public static getToken(req: Request, res: Response): Response {
        try {
            let token: string = GmailService.getToken();
            return res.json({token});
        } catch(e) {
            return UNQfyController.handleError(res, new ErrorResponse(400, 'token invalido'));
        }
    }

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


    public static validateData(req: Request, res: Response, next: NextFunction) {
        const artistId: number = req.params.artistId;
        const email: string = req.params.email;
        if(!artistId || !email) {
            return new Promise((resolve, reject) => {
                reject(new BadResquestResponse());
            }) 
        }
        next();
    }

    public static subscribe(req: Request, res: Response): Promise<Response> {
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
                return res.status(200);     
            })
            .catch(err => {
                return new Promise((resolve, reject) => {
                    reject(new RelatedResourceNotFound());
                });
            });
    }

    public static unsubscribe(req: Request, res: Response): Promise<Response> {
        const notificationI: NotificationInterface = req.body;
        let artistId: number = notificationI.artistId;
        let email: string = notificationI.email;
        let artist = {
            uri: `localhost:3000/api/artist/${artistId}`,
            json: true
        }
        return rp(artist)
            .then(data => {
                this.instance.notification.unsubscribe(artistId, email);
                return res.status(200);     
            })
            .catch(err => {
                return new Promise((resolve, reject) => {
                    reject(new RelatedResourceNotFound());
                });
            });
    }

    public static notify(req: Request, res: Response): Promise<Response>{
        const notificationI: NotificationInterface = req.body;
        let artistId: number = notificationI.artistId;
        let artist = {
            uri: `localhost:3000/api/artist/${artistId}`,
            json: true
        }
        return rp(artist)
            .then(data => {
                let emailsSub = this.instance.notification.subscriptorsOnly(artistId);
                if(emailsSub != undefined){
                    emailsSub.forEach((email: string) => GmailService.sendEmail(
                        `Nuevo album para artista: ${artistId}`,
                        "",
                        email)
                    )
                }
                return res.status(200);     
            })
            .catch(err => {
                return new Promise((resolve, reject) => {
                    reject(new RelatedResourceNotFound());
                });
            });
    }

    public static subscriptions(req: Request, res: Response): Promise<Response> {
        let artistId: number = req.params.artistId;
        let artist = {
            uri: `localhost:3000/api/artist/${artistId}`,
            json: true
        }
        return rp(artist)
            .then(data => {
                const subs = this.instance.notification.subscriptors(artistId);
                return res.status(200).json(subs);     
            })
            .catch(err => {
                return new Promise((resolve, reject) => {
                    reject(new RelatedResourceNotFound());
                });
            });
    }
    
    public static deleteSubscriptions(req: Request, res: Response): Promise<Response> {
        const notificationI: NotificationInterface = req.body;
        let artistId: number = notificationI.artistId;
        let artist = {
            uri: `localhost:3000/api/artist/${artistId}`,
            json: true
        }
        return rp(artist)
            .then(data => {
                this.instance.notification.deleteSubscriptors(artistId);
                return res.status(200);     
            })
            .catch(err => {
                return new Promise((resolve, reject) => {
                    reject(new RelatedResourceNotFound());
                });
            });        
    }
}