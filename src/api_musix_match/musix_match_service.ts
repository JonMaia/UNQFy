import rp from 'request-promise';
import { ErrorResponse } from '../api/error_response/error_response';

export class MusixMatchService {

    private static readonly API_KEY: string = 'ccf4ee0d8f08795e824a621b3e03b7fe'; 

    public static findTracks(artist: string, track: string) {
        let artistEncode: string = encodeURIComponent(artist);
        let trackEncode: string = encodeURIComponent(track);
        let options = {
            uri: `http://api.musixmatch.com/ws/1.1/track.search?apikey=${this.API_KEY}&q_artist=${artistEncode}&q_track=${trackEncode}`,
            json: true
        }
        return rp(options)
            .then(data => {
                if(data.message.header.status_code === 200) {
                    let trackList = data.message.body.track_list;
                    return trackList.reduce((trackList: Array<any>, track: any) => {
                        let trackMM = track.track
                        trackList.push({id: trackMM.track_id, name: trackMM.track_name});
                        return trackList;
                    }, []);
                }
                return new Promise((resolve, reject) => {
                    reject(new ErrorResponse(data.message.header.status_code, 'Ha ocurrido un error'));
                });
            })
            .catch(err => {
                return new Promise((resolve, reject) => {
                    reject(new ErrorResponse(400, 'Ha ocurrido un error'));
                });
            });
    }

    public static findLyricsByTrack(idTrack: number) {
        let options = {
            uri: `http://api.musixmatch.com/ws/1.1/track.lyrics.get?apikey=${this.API_KEY}&track_id=${idTrack}`,
            json: true
        }
        return rp(options)
            .then(data => {
                if(data.message.header.status_code === 200) {
                    let lyrics = data.message.body.lyrics;
                    return {
                        id: idTrack,
                        lyrics: lyrics.lyrics_body
                    };
                }
                return new Promise((resolve, reject) => {
                    reject(new ErrorResponse(data.message.header.status_code, 'Ha ocurrido un error'));
                });
            })
            .catch(err => {
                return new Promise((resolve, reject) => {
                    reject(new ErrorResponse(400, 'Ha ocurrido un error'));
                });
            });
    }
}