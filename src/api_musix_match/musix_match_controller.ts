import { UNQfyController } from "../api/controllers/unqfy_controller";
import { Request, Response } from "express";
import { MusixMatchService } from "./musix_match_service";
import { ErrorResponse } from "../api/error_response/error_response";

export class MusixMatchController extends UNQfyController {

    public static findTracks(req: Request, res: Response): Promise<Response> {
        return MusixMatchService.findTracks(req.body.artist, req.body.track)
            .then(data => {
                return res.json(data);
            })
            .catch((err: ErrorResponse) => {
                return this.handleError(res, err);
            });
    }

    public static findLyricsByTrack(req: Request, res: Response): Promise<Response> {
        let idTrack: number = req.params.id;
        return MusixMatchService.findLyricsByTrack(idTrack)
            .then(data => {
                return res.json(data);
            })
            .catch((err: ErrorResponse) => {
                return this.handleError(res, err);
            });
    }
}
