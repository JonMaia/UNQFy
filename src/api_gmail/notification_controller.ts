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

    public getNotification(): Notification {
        let filename = path.join(__dirname, '..', '..', 'notification.json');
        if(this.notification === undefined && fs.existsSync(filename)){
            this.notification = Notification.load(filename);
        } else if(this.notification === undefined) {
            this.notification = new Notification();
            this.saveNotification();
        }
        return this.notification;
    }

    public saveNotification(): void {
        let filename = path.join(__dirname, '..', '..', 'notification.json');
        this.notification.save(filename);
    }

    public static validateData(req: Request, res: Response, next: NextFunction) {
        const notification: NotificationInterface = req.body;
        if(!notification.artistId || !notification.email) {
            return UNQfyController.handleError(res, new BadResquestResponse());
        }
        next();
    }

    public static validateEmailData(req: Request, res: Response, next: NextFunction) {
        const emailBody = req.body;
        if(!emailBody.artistId || !emailBody.subject || !emailBody.message || !emailBody.from) {
            return UNQfyController.handleError(res, new BadResquestResponse());
        }
        next();
    }

    public static subscribe(req: Request, res: Response): Promise<Response> {
        const notificationI: NotificationInterface = req.body;
        let artistId: number = notificationI.artistId;
        let email: string = notificationI.email;
        let artist = {
            uri: `http://localhost:3000/api/artists/${artistId}`,
            json: true
        }
        return rp(artist)
            .then(data => {
                this.getInstance().getNotification().addSubscriptor(artistId, email);
                this.getInstance().saveNotification();
                return res.status(200).json();
            })
            .catch(err => {
                return UNQfyController.handleError(res, new RelatedResourceNotFound());
            });
    }

    public static unsubscribe(req: Request, res: Response): Promise<Response> {
        const notificationI: NotificationInterface = req.body;
        let artistId: number = notificationI.artistId;
        let email: string = notificationI.email;
        let artist = {
            uri: `http://localhost:3000/api/artists/${artistId}`,
            json: true
        }
        return rp(artist)
            .then(data => {
                this.getInstance().getNotification().unsubscribe(artistId, email);
                return res.status(200).json();
            })
            .catch(err => {
                return UNQfyController.handleError(res, new RelatedResourceNotFound());
            });
    }

    public static notify(req: Request, res: Response): Promise<Response>{
        const emailBody = req.body;
        let artistId: number = emailBody.artistId;
        let artist = {
            uri: `http://localhost:3000/api/artists/${artistId}`,
            json: true
        }
        return rp(artist)
            .then(data => {
                let subscription = this.getInstance().getNotification().findSubscription(artistId);
                if(subscription != undefined) {
                    subscription.emails.forEach((emailTo: string) => GmailService.sendEmail(
                        emailBody.subject,
                        emailBody.message,
                        emailTo,
                        emailBody.from)
                    )
                }
                return res.status(200).json();
            })
            .catch(err => {
                return UNQfyController.handleError(res, new RelatedResourceNotFound());
            });
    }

    public static subscriptions(req: Request, res: Response): Promise<Response> {
        let artistId: number = Number(req.query.artistId);
        let artist = {
            uri: `http://localhost:3000/api/artists/${artistId}`,
            json: true
        }
        return rp(artist)
            .then(data => {
                const subs = this.getInstance().getNotification().subscriptors(artistId);
                return res.status(200).json(subs);     
            })
            .catch(err => {
                return UNQfyController.handleError(res, new RelatedResourceNotFound());
            });
    }
    
    public static deleteSubscriptions(req: Request, res: Response): Promise<Response> {
        const notificationI: NotificationInterface = req.body;
        let artistId: number = notificationI.artistId;
        if(!artistId) {
            return Promise.resolve(UNQfyController.handleError(res, new BadResquestResponse()));
        }
        let artist = {
            uri: `http://localhost:3000/api/artists/${artistId}`,
            json: true
        }
        return rp(artist)
            .then(data => {
                this.getInstance().getNotification().deleteSubscriptors(artistId);
                this.getInstance().saveNotification();
                return res.status(200).json();
            })
            .catch(err => {
                return UNQfyController.handleError(res, new RelatedResourceNotFound());
            });
    }
}