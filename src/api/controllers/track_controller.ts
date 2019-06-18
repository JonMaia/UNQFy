import { Request, Response } from "express";
import { UNQfyController } from "./unqfy_controller";
import { Track } from "../../model/track";
import { ResourceNotFoundResponse } from "../error_response/resource_not_found_response";
import { ErrorResponse } from "../error_response/error_response";

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

    /**
     * Busca y retorna un lyrics de un track
     * Primero verifica que si el track de musix match existe en la cache, de no ser así
     * Empieza a realizar las consultas correspondientes a musix match para obtener el track junto a su lyrics
     * Luego, se retorna en el response el json de track MusixMatch.
     * En caso de que sucediera un error o que el track que se paso no exista, se devolvera un error 'RESOURCE NOT FOUND'
     * @param req 
     * @param res 
     */
    public static getLyricsFromTrack(req: Request, res: Response) {
        const trackId: number = Number(req.params.id);
        let track: Track | undefined = this.getUnqfy().getTrackById(trackId);
        if(track !== undefined) {
            track.getLyrics()
                .then((lyrics: string) => {
                    if(track !== undefined) {
                        return res.json({name: track.name, lyrics: lyrics})
                    }
                })
                .catch((err: ErrorResponse) => {
                    return this.handleError(res, err);
                });
        } else {
            return this.handleError(res, new ResourceNotFoundResponse());
        }
    }

}