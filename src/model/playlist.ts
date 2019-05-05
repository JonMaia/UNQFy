import { Track } from "./track";

export class Playlist {

    public id: number = 0;
    public tracks: Array<Track>;
    public name: string;
    public duration: number;

    constructor(name: string, duration: number, tracks: Array<Track>) {
        this.tracks = tracks;
        this.name = name;
        this.duration = duration;
    }

    public getDuration(): number {
        return this.duration;
    }

    public hasTrack(track: Track) {
        return this.tracks.includes(track);
    }

}