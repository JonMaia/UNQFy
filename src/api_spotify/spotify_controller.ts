import { SpotifyService } from "./spotify_service";
import { Request, Response } from "express";
import { ArtistSpotify } from "./artist_spotify";
import { Album } from "../model/album";
import { UNQfyController } from "../api/controllers/unqfy_controller";
import { ErrorResponse } from "../api/error_response/error_response";

export class SpotifyController {

    public static getToken(req: Request, res: Response): Response {
        try {
            let token: string = SpotifyService.getToken();
            return res.json({token});
        } catch(e) {
            return UNQfyController.handleError(res, new ErrorResponse(400, 'token invalido'));
        }
    }

    public static findArtistsByName(req: Request, res: Response): Promise<Response> {
        return SpotifyService.findArtistsByName(req.body.artist)
                .then((artists: Array<ArtistSpotify>) => { return res.json(artists)})
                .catch((err: ErrorResponse) => { return UNQfyController.handleError(res, err)});
    }

    public static findAlbumsFromArtist(req: Request, res: Response): Promise<Response> {
        return SpotifyService.findAlbumsFromArtist(req.params.id)
                .then((albums: Array<Album>) => { return res.json(albums)})
                .catch((err: ErrorResponse) => { return UNQfyController.handleError(res, err)})
    }
}
