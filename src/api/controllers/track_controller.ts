import { Request, Response } from "express";
import { UNQfyController } from "./unqfy_controller";
import { Track } from "../../model/track";
import { ResourceNotFoundResponse } from "../error_response/resource_not_found_response";

export class TrackController extends UNQfyController {

    public static getTrackById(req: Request, res: Response): Response {
        const trackId: number = Number(req.params.id);
        let track: Track | undefined = this.getUnqfy().getTrackById(trackId);
        if(track !== undefined) {
            return res.json(track);
        } else {
            return this.handleError(res, new ResourceNotFoundResponse());
        }
    }
}