import { Album } from "./album";
import { SpotifyService } from "../api_spotify/spotify_service";

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

    public populateAlbumsFromSpotify() {
        return SpotifyService.getAlbumsToArtist(this.id, this.name)
                .then((albums: Array<Album>) => {
                    albums.forEach(album => {
                        if(!this.hasAlbum(album.name)) {
                            album.idArtist = this.id;
                            this.albums.push(album);
                        }
                    });
                    return albums;
                })
    }

    public toJson() {
        return {
            id: this.id,
            name: this.name,
            albums : this.albums.map(album => album.toJson()),
            country: this.country
        }
    }
}