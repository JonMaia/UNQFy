import { Track } from "./track";

export class Playlist {

    public id: number = 0;
    public tracks: Array<Track> = [];
    public name: string;
    public maxDuration: number;
    public genres: Array<string>;

    constructor(name: string, maxDuration: number, genres: Array<string>) {
        this.genres = genres;
        this.name = name;
        this.maxDuration = maxDuration;
    }

    public duration(): number {
        return this.maxDuration;
    }

    public hasTrack(track: Track) {
        return this.tracks.includes(track);
    }

    public addTrackPL(track: Track) {
        if (this.durationTracks() + track.duration <= this.maxDuration && track.containsGenre(this.genres)){
            this.tracks.push(track);
        }    
    }

    public durationTracks(): number {
        return this.tracks.reduce((duration: number, track: Track) => {
            return duration + track.duration;  
        }, 0);
    }

}