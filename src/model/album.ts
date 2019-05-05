import { Artist } from "./artist";
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


}