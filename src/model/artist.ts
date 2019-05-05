import { Album } from "./album";

export class Artist {

    public id: number;
    public name: string;
    public country: string;
    public albums: Array<Album>

    constructor(name: string, country: string) {
        this.name = name;
        this.country = country;
        this.id = 0;
        this.albums = new Array;
    }

    public hasAlbum(albumName: string): boolean {
        return this.albums.some(album => album.name === albumName);
    }

    public addAlbum(album: Album): void {
        this.albums.push(album);
    }
}