import { MusixMatchService } from "../api_musix_match/musix_match_service";
import { TrackMusixMatch } from "../api_musix_match/track_musix_match";

export class Track {

    public id: number = 0;
    public name: string;
    public duration: number;
    public genres: Array<string>;
    public album: number;

    constructor(name: string, duration: number, genres: Array<string>, albumId: number) {
        this.name = name;
        this.duration = duration;
        this.genres = genres;
        this.album = albumId;
    }

    public getGenres(){
        return this.genres;
    }

    public containsGenre(genres: Array<string>): boolean {
        return this.genres.some(genre => genres.includes(genre));
    }

    public getLyrics() {
        return MusixMatchService.getLyrics(this.id, '', this.name)
            .then((trackMM : TrackMusixMatch | undefined) => {
                if(trackMM !== undefined) {
                    return Promise.resolve(trackMM.lyrics);
                }
                return Promise.resolve('');
            })
    }
}