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
        this.albums = new Array();
    }

    public hasAlbum(albumName: string): boolean {
        return this.albums.some(album => album.name === albumName);
    }

    public addAlbum(album: Album): void {
        if(!this.hasAlbum(album.name)) {
            this.albums.push(album);
        } else {
            throw new Error(`El album '${album.name}' del artista '${this.name}' ya a sido creado`);
        }
    }

    public deleteAlbum(album: Album): void {
        this.albums.splice(this.albums.indexOf(album), 1);
    }
    public toJson() {
        return {
            id: this.id,
            name: this.name,
            country: this.country,
            albums : this.albums
        }
    }
}