import { Request, Response } from "express";
import { UNQfyController } from "./unqfy_controller";
import { Track } from "../../model/track";
import { ResourceNotFoundResponse } from "../error_response/resource_not_found_response";
import { MusixMatchService } from "../../api_musix_match/musix_match_service";
import { Artist } from "../../model/artist";
import { ErrorResponse } from "../error_response/error_response";
import { TrackMusixMatch } from "../../api_musix_match/track_musix_match";

export class TrackController extends UNQfyController {

    private static cache: Map<number, TrackMusixMatch> = new Map();

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
        let trackMusixMatch: TrackMusixMatch;
        if(track !== undefined) {
            let trackFromCache: TrackMusixMatch | undefined = this.getTrackMusixMatchFromCache(track.id);
            if(trackFromCache !== undefined) {
                return res.json(trackFromCache.toJson());
            }
            let artistName = this.getArtistNameByTrack(track);
            return MusixMatchService.findTracks(artistName, track.name)
                .then((tracks: Array<TrackMusixMatch>) => {
                    trackMusixMatch = tracks[0];
                    return MusixMatchService.findLyricsByTrack(trackMusixMatch.id);
                })
                .then((trackLyrics: TrackMusixMatch) => {
                    trackMusixMatch.lyrics = trackLyrics.lyrics;
                    if(track !== undefined) {
                        // Tengo que hacer esta validación porque al parecer los promises no saben del scope en el que estan
                        this.saveInCache(track.id, trackMusixMatch);
                    }
                    return res.json(trackMusixMatch.toJson());
                })
                .catch((err: ErrorResponse) => {
                    return this.handleError(res, err);            
                });
        } else {
            return this.handleError(res, new ResourceNotFoundResponse());
        }
    }

    private static getArtistNameByTrack(track: Track) {
        let artist: Artist | undefined = this.getUnqfy().getArtistByTrack(track);
        if (artist !== undefined) {
            return artist.name;
        }
        return '';
    }

    private static getTrackMusixMatchFromCache(idTrack: number) {
        return this.cache.get(idTrack);
    }

    private static saveInCache(idTrack: number, trackMM: TrackMusixMatch) {
        this.cache.set(idTrack, trackMM);
    }
}