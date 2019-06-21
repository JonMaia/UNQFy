import fs from "fs";
import path from 'path';
import rp from 'request-promise';
import { auth } from './generateSpotifyCredentials';
import { ErrorResponse } from "../api/error_response/error_response";
import { ArtistSpotify } from "./artist_spotify";
import { Album } from "../model/album";


export class SpotifyService {

    public static authenticate() {
        auth();
    }

    public static getToken(): string {
        let jsonPath = path.join(__dirname, '..', '..', 'spotifyCreds.json');
        let jsonString = fs.readFileSync(jsonPath, 'utf8');
        const spotifyCreds = JSON.parse(jsonString);
        let elapsedTime = this.elapsedTimeInMinutesSinceTheTokenWasObtained(spotifyCreds.date_token);
        if(elapsedTime > 60) {
            console.log("Se debe generar el archivo spotifyCreds.json");
            console.log("Ingrese en consola: 'npm run auth_spotify'");
            throw new Error('Token invalido');
        }
        return `${spotifyCreds.token_type} ${spotifyCreds.access_token}`
    }

    private static elapsedTimeInMinutesSinceTheTokenWasObtained(dateTimeToken: number) {
        let date1 = dateTimeToken;
        let date2 = new Date();
        let res = Math.abs(date1 - date2.getTime()) / 1000;
        let hours = Math.floor(res / 3600) % 24
        let minutes = Math.floor(res / 60) % 60;
        return hours * 60 + minutes;
    }

    /**
     * Retorna una lista de artistas junto a sus id.
     * @param nameArtist 
     */
    public static findArtistsByName(nameArtist: string): Promise<Array<ArtistSpotify>> {
        let token: string;
        try {
            token = this.getToken();    
        } catch(e) {
            return new Promise((resolve, reject) => {
                reject(new ErrorResponse(400, 'token invalido'));
            });
        }

        let options = {
            uri: `https://api.spotify.com/v1/search?q=${nameArtist}&type=artist`,
            headers: {
                'Authorization': token
            },
            json: true
        }
        return rp(options)
            .then(data => {
                return data.artists.items.reduce((listArtist: Array<ArtistSpotify>, artistData: any) => {
                    listArtist.push(new ArtistSpotify(artistData.name, artistData.id));
                    return listArtist;
                }, []);
            })
            .catch(err => {
                return new Promise((resolve, reject) => {
                    let error = err.error.error;
                    reject(new ErrorResponse(error.status, error.message));
                });
            })
    }

    public static findAlbumsFromArtist(idArtist: string): Promise<Array<Album>> {
        let token: string;
        try {
            token = this.getToken();    
        } catch(e) {
            return new Promise((resolve, reject) => {
                reject(new ErrorResponse(400, 'token invalido'));
            });
        }

        let options = {
            uri: `https://api.spotify.com/v1/artists/${idArtist}/albums?include_groups=album`,
            headers: {
                'Authorization': token
            },
            json: true
        }
        return rp(options)
            .then(data => {
                return data.items.reduce((listAlbums: Array<Album>, albumData: any) => {
                    let year: number = Number(albumData.release_date.split('-')[0]);
                    listAlbums.push(new Album(0, albumData.name, year));
                    return listAlbums;
                }, []);
            })
            .catch(err => {
                return new Promise((resolve, reject) => {
                    let error = err.error.error;
                    reject(new ErrorResponse(error.status, error.message));
                });
            })
    }

    public static getAlbumsToArtist(artistName: string) {
        return SpotifyService.findArtistsByName(artistName)
                .then((artists: Array<ArtistSpotify>) => {
                    let artist = artists[0]
                    return SpotifyService.findAlbumsFromArtist(artist.id);
                })
                .then((albums: Array<Album>) => {
                    return albums;
                })
    }
}
