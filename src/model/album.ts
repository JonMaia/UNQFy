import { Artist } from "./artist";

export class Album {

    public id: number = 0;
    public artist: Artist;
    public tracks: Array<String>;
    public name: string;
    public year: number;

    constructor(artist: Artist,  name: string, year: number) {
        this.artist = artist;
        this.tracks = new Array;
        this.name = name;
        this.year = year;
    }

    public setId(id:number): void {
        this.id = id;
    }


}