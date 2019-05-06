import { Track } from "./track";

export class Playlist {

    public id: number = 0;
    public tracks: Array<Track> = [];
    public name: string;
    public duration: number;
    public genres: Array<string>;

    constructor(name: string, duration: number, genres: Array<string>) {
        this.genres = genres;
        this.name = name;
        this.duration = duration;
    }

    public getDuration(): number {
        return this.duration;
    }

    public hasTrack(track: Track) {
        return this.tracks.includes(track);
    }

    public addTrackPL(track: Track) {
        if (this.duration + track.duration < )
            this.tracks.push(track);
    }

    public durationTracks(): number {
        return this.tracks.reduce((duration: number, track: Track) => {
            return duration + track.duration;  
        }, 0);
    }

}