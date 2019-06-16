import { Track } from "./track";

export class Album {

    public id: number = 0;
    public idArtist: number;
    public tracks: Array<Track>;
    public name: string;
    public year: number;

    constructor(idArtist: number,  name: string, year: number) {
        this.idArtist = idArtist;
        this.tracks = new Array;
        this.name = name;
        this.year = year;
    }

    public setId(id:number): void {
        this.id = id;
    }

    public hasTrack(trackName: string): boolean {
        return this.tracks.some(track => track.name === trackName);
    }

    public setYear(newYear: number): void {
        this.year = newYear;
    }

    public addTrack(track: Track): void {
        this.tracks.push(track);
    }

    public deleteTrack(track: Track): void {
        this.tracks.splice(this.tracks.indexOf(track), 1);
    }

    public toJson() {
        return {
            id: this.id,
            name: this.name,
            year: this.year
        }
    }
}