import { UNQfyController } from "../api/controllers/unqfy_controller";
import { Request, Response } from "express";
import rp from 'request-promise';
import { ErrorResponse } from "../api/error_response/error_response";

export class MusixMatchController extends UNQfyController {

    private static readonly API_KEY: string = 'ccf4ee0d8f08795e824a621b3e03b7fe'; 

    public static findTracks(req: Request, res: Response): Promise<Response> {
        let artist: string = encodeURIComponent(req.body.artist);
        let track: string = encodeURIComponent(req.body.track);
        let options = {
            uri: `http://api.musixmatch.com/ws/1.1/track.search?apikey=${this.API_KEY}&q_artist=${artist}&q_track=${track}`,
            json: true
        }
        return rp(options)
            .then(data => {
                if(data.message.header.status_code === 200) {
                    let trackList = data.message.body.track_list;
                    let tracksMM = trackList.reduce((trackList: Array<any>, track: any) => {
                        let trackMM = track.track
                        trackList.push({id: trackMM.track_id, name: trackMM.track_name});
                        return trackList;
                    }, []);
                    return res.json(tracksMM);
                }
                return this.handleError(res, new ErrorResponse(data.message.header.status_code, 'Ha ocurrido un error'));
            })
            .catch(err => {
                return res.status(400);
            });
    }

    public static findLyricsByTrack(req: Request, res: Response): Promise<Response> {
        let idTrack = req.params.id;
        let options = {
            uri: `http://api.musixmatch.com/ws/1.1/track.lyrics.get?apikey=${this.API_KEY}&track_id=${idTrack}`,
            json: true
        }
        return rp(options)
            .then(data => {
                if(data.message.header.status_code === 200) {
                    let lyrics = data.message.body.lyrics;
                    let track = {
                        id: idTrack,
                        lyrics: lyrics.lyrics_body
                    }
                    return res.json(track);
                }
                return this.handleError(res, new ErrorResponse(data.message.header.status_code, 'Ha ocurrido un error'));
            })
            .catch(err => {
                return res.status(400);
            });
    }
}

class TrackMusixMatch {

    public id: number;
    public name :string;

    constructor(id: number, name: string) {
        this.id = id;
        this.name = name;
    }
}