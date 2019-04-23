import { Artist } from "./artist";

export class Album {

    public id: number;
    public artist: Artist;
    public tracks: Array<String>;
    public name: string;
    public year: Number;

    constructor(artist: Artist,  name: string, year: Number) {
        this.artist = artist;
        this.tracks = new Array;
        this.name = name;
        this.year = year;
        this.id = Math.floor(Math.random() * 1000);
    }
}