import rp from 'request-promise';
import { ErrorResponse } from '../api/error_response/error_response';
import { TrackMusixMatch } from './track_musix_match';
import { ResourceNotFoundResponse } from '../api/error_response/resource_not_found_response';

export class MusixMatchService {

    private static readonly API_KEY: string = 'ccf4ee0d8f08795e824a621b3e03b7fe'; 
    private static cache: Map<number, TrackMusixMatch> = new Map();

    public static findTracks(artist: string, track: string): Promise<Array<TrackMusixMatch>> {
        let artistEncode: string = encodeURIComponent(artist);
        let trackEncode: string = encodeURIComponent(track);
        let options = {
            uri: `http://api.musixmatch.com/ws/1.1/track.search?apikey=${this.API_KEY}&q_artist=${artistEncode}&q_track=${trackEncode}`,
            json: true
        }
        return rp(options)
            .then(data => {
                let tracksMM: Array<TrackMusixMatch> = new Array;
                if(data.message.header.status_code === 200) {
                    let trackList = data.message.body.track_list;
                    tracksMM = trackList.reduce((trackList: Array<TrackMusixMatch>, track: any) => {
                        let trackMM = track.track
                        trackList.push(new TrackMusixMatch(trackMM.track_id,trackMM.track_name));
                        return trackList;
                    }, tracksMM);
                }
                return new Promise((resolve, reject) => {
                    if(tracksMM.length > 0) {
                        resolve(tracksMM);
                    }
                    reject(new ResourceNotFoundResponse());
                });
            })
            .catch(err => {
                return new Promise((resolve, reject) => {
                    reject(new ResourceNotFoundResponse());
                });
            });
    }

    public static findLyricsByTrack(idTrack: number): Promise<TrackMusixMatch> {
        let options = {
            uri: `http://api.musixmatch.com/ws/1.1/track.lyrics.get?apikey=${this.API_KEY}&track_id=${idTrack}`,
            json: true
        }
        return rp(options)
            .then(data => {
                return new Promise((resolve, reject) => {
                    if(data.message.header.status_code === 200) {
                        let lyrics = data.message.body.lyrics;
                        resolve(new TrackMusixMatch(idTrack, '', lyrics.lyrics_body));
                    }
                    reject(new ErrorResponse(data.message.header.status_code, 'Ha ocurrido un error'));
                });
            })
            .catch(err => {
                return new Promise((resolve, reject) => {
                    reject(new ResourceNotFoundResponse());
                });
            });
    }

    public static getLyrics(trackId: number, artistName: string, trackName: string): Promise<TrackMusixMatch | undefined> {
        let trackMusixMatch: TrackMusixMatch | undefined = this.getTrackMusixMatchFromCache(trackId);
        if(trackMusixMatch !== undefined) {
            return Promise.resolve(trackMusixMatch);
        }
        return MusixMatchService.findTracks(artistName, trackName)
            .then((tracks: Array<TrackMusixMatch>) => {
                trackMusixMatch = tracks[0];
                return MusixMatchService.findLyricsByTrack(trackMusixMatch.id);
            })
            .then((trackLyrics: TrackMusixMatch) => {
                if(trackMusixMatch !== undefined) {
                    trackMusixMatch.lyrics = trackLyrics.lyrics;
                    // Tengo que hacer esta validación porque al parecer los promises no saben del scope en el que estan
                    this.saveInCache(trackId, trackMusixMatch);
                }
                return Promise.resolve(trackMusixMatch);
            });
    }

    private static getTrackMusixMatchFromCache(idTrack: number) {
        return this.cache.get(idTrack);
    }

    private static saveInCache(idTrack: number, trackMM: TrackMusixMatch) {
        this.cache.set(idTrack, trackMM);
    }
}