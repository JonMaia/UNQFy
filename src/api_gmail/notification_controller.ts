import { UNQfyController } from "../api/controllers/unqfy_controller";
import { BadResquestResponse } from "../api/error_response/bad_resquest_response";
import { Response, NextFunction } from "express";
import { NotificationInterface } from "../model/interfaces";



export class GmailController {

    private static instance: Notification;
    private notification!: Notification;

    /*public static validateData(req: Request, res: Response, next: NextFunction) {
        const artistId: number = req.;
        const email: string = req.params.email;
        if(!artistId || !email) {
            return UNQfyController.handleError(res, new BadResquestResponse()); 
        }
        next();
    }*/

    public static subscribe(req: Request, res: Response): Response {
        const notification: NotificationInterface = req.body;
        let artistId: number = notification.artistId;
        let email: string = notification.email;
        const artist: Artist | undefined = UNQfyController.getInstance().getUnqfy().getArtistById(artistId);
        if(artist != undefined){
            // this.notify.
        }
        return res;
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