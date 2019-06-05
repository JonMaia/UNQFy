import { Request, Response } from "express";
import { UNQfyController } from "./unqfy_controller";
import { Track } from "../../model/track";

export class TrackController extends UNQfyController {

    public static getTrackById(req: Request, res: Response): Response {
        const trackId: number = Number(req.params.id);
        let track: Track | undefined = this.getUnqfy().getTrackById(trackId);
        if(track !== undefined) {
            return res.json(track);
        } else {
            return res.status(404).json({
                status: 404,
                errorCode: "RESOURCE_NOT_FOUND"
            })
        }
    }
}