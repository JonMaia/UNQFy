import { SpotifyAuth } from "./SpotifyAuth";
import { Request, Response } from "express";
import rp from 'request-promise';
import { ArtistSpotify } from "./artist_spotify";

export class SpotifyController {

    public static getToken(req: Request, res: Response): Response {
        let token: string | undefined = SpotifyAuth.getToken();
        if(token) {
            return res.json({token});
        } else {
            return res.status(400).json({error: 'token invalido'});
        }
    }

    public static findArtistByName(req: Request, res: Response): Promise<Response> {
        let token: string | undefined = SpotifyAuth.getToken();
        if(token === undefined) {
            return new Promise((resolve, reject) => {
                reject(res.status(400).json({error: 'token invalido'}));
            });
        }
        let options = {
            uri: `https://api.spotify.com/v1/search?q=${req.body.artist}&type=artist`,
            headers: {
                'Authorization': token
            }
        }
        return rp(options)
            .then(data => {
                let dataSpotify = JSON.parse(data);
                let artists = dataSpotify.artists.items.reduce((listArtist: Array<ArtistSpotify>,artistData: any) => {
                    listArtist.push(new ArtistSpotify(artistData.name, artistData.id));
                    return listArtist;
                }, [])
                return res.json(artists);
            })
            .catch(err => {
                return res.status(400).json({ error: 'Ha ocurrido un error al obtener los datos. Por favor, intente de nuevo'});
            })
    }
}
