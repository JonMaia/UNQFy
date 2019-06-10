import { SpotifyAuth } from "./SpotifyAuth";
import { Request, Response } from "express";
import rp from 'request-promise';
import { ArtistSpotify } from "./artist_spotify";
import { Album } from "../model/album";
import { UNQfyController } from "../api/controllers/unqfy_controller";
import { ErrorResponse } from "../api/error_response/error_response";

export class SpotifyController extends UNQfyController {

    public static getToken(req: Request, res: Response): Response {
        let token: string | undefined = SpotifyAuth.getToken();
        if(token) {
            return res.json({token});
        } else {
            return this.handleError(res, new ErrorResponse(400, 'token invalido'));
        }
    }

    public static findArtistByName(req: Request, res: Response): Promise<Response> {
        let token: string | undefined = SpotifyAuth.getToken();
        if(token === undefined) {
            return new Promise((resolve, reject) => {
                reject(this.handleError(res, new ErrorResponse(400, 'token invalido')));
            });
        }
        let options = {
            uri: `https://api.spotify.com/v1/search?q=${req.body.artist}&type=artist`,
            headers: {
                'Authorization': token
            },
            json: true
        }
        return rp(options)
            .then(data => {
                let artists = data.artists.items.reduce((listArtist: Array<ArtistSpotify>, artistData: any) => {
                    listArtist.push(new ArtistSpotify(artistData.name, artistData.id));
                    return listArtist;
                }, [])
                return res.json(artists);
            })
            .catch(err => {
                return this.handleError(res, new ErrorResponse(400, err.error.message));
            })
    }

    public static findAlbumsFromArtist(req: Request, res: Response): Promise<Response> {
        let token: string | undefined = SpotifyAuth.getToken();
        if(token === undefined) {
            return new Promise((resolve, reject) => {
                reject(this.handleError(res, new ErrorResponse(400, 'token invalido')));
            });
        }
        let options = {
            uri: `https://api.spotify.com/v1/artists/${req.params.id}/albums?include_groups=album`,
            headers: {
                'Authorization': token
            },
            json: true
        }
        return rp(options)
            .then(data => {
                let artists = data.items.reduce((listAlbums: Array<Album>, albumData: any) => {
                    let year: number = Number(albumData.release_date.split('-')[0]);
                    listAlbums.push(new Album(0, albumData.name, year));
                    return listAlbums;
                }, [])
                return res.json(artists);
            })
            .catch(err => {
                return this.handleError(res, new ErrorResponse(400, err.error.message));
            })
    }
}
