const picklify = require('picklify'); // para cargar/guarfar unqfy
import fs from 'fs'; // para cargar/guarfar unqfy
import {Artist} from './model/artist';
import {ArtistInterface, AlbumInterface} from './model/interfaces';
import { Album } from './model/album';
import { Track } from './model/track';
import {TrackInterface} from './model/interfaces';

// COMPLETAR POR EL ALUMNO: exportar todas las clases que necesiten ser utilizadas desde un modulo cliente
export class UNQfy {
    private listeners: any;
    private artists: Array<Artist>;
    private albumes: Array<Album>;
    private tracks: Array<Track>;
    private trackID: number = 0;
    private albumID: number = 0;

    constructor() {
        this.artists = new Array;
        this.albumes = new Array;
        this.tracks = new Array;
        this.tracks = new Array;
    }

    /**
     * Crea un nuevo artista con los datos pasados por parametro, lo guarda y retorna.  
     * Previamente, verifica que no exista un artista con el nombre pasado por parametro, si existe el artista lanza un error.
     * @param artistData - Debe tener mínimamente: name(string), country(string)
     */
    public addArtist(artistData: ArtistInterface): Artist {
        if(!this.existsArtist(artistData.name)) {
            let newArtist = new Artist(artistData.name, artistData.country);
            this.artists.push(newArtist);
            return newArtist;
        } else {
            throw new Error(`Ya existe el artista '${artistData.name}'`);
        }
    }

    /**
     * Busca y elimina el artista con el id pasado por parametro
     * @param id 
     */
    public deleteArtist(id: number): void {
        let artist = this.getArtistById(id);
        if(artist !== undefined) {
            this.artists.splice(this.artists.indexOf(artist), 1);
        }
    }

    /**
     * Retorna true si existe un artista con el nombre pasado por parametro
     * @param name 
     */
    public existsArtist(name: string): boolean {
        return this.artists.some(artist => artist.name === name);
    }

    /**
     * Retorna una lista de artistas que coincidan, incluso parcialmente, con el nombre pasado por parametro
     * @param name 
     */
    public filterArtistsByName(name: string): Array<Artist> {
        return this.artists.filter(artist => artist.name.includes(name));
    }

    // albumData: objeto JS con los datos necesarios para crear un album
    //   albumData.name (string)
    //   albumData.year (number)
    // retorna: el nuevo album creado

    public getAlbumByNamePartial(name: string): Array<Album> {
        return this.albumes.filter(album => album.name.includes(name));
    }

/*
    public addAlbumIdArtist (artistId: number, albumData:AlbumInterface): Album {

        return this.addAlbum({artist: 'dd', name: albumData.name, year: albumData.year})
       
        
    }
*/
    public addAlbum(albumData: AlbumInterface): Album {  

        /* Crea un album y lo agrega al artista con id artistId.
            El objeto album creado debe tener (al menos):
            - una propiedad name (string)
            - una propiedad year (number)
        */
          
        let artistDate = this.getArtistById(albumData.artistId);

        let album = this.getAlbumByNamePartial(albumData.name)
                            .filter(alb => alb.artist.id === albumData.artistId);


        if(artistDate !== undefined){

            if(album.length  == 0) {
                    let newAlbum = new Album(artistDate, albumData.name, albumData.year);
                    newAlbum.setId(this.getNextTrackId());
                    this.albumes.push(newAlbum);
                    return newAlbum;
            } else {
                throw new Error(`El album '${albumData.name}' del artista '${artistDate.name}' ya a sido creado`);
            }
        } else {
            throw new Error(`No existe artista con el Id: '${albumData.artistId}'`);
        }
    }

    public getNextAlbumId() : number {
        let idNewAlbum = this.albumID;
        this.albumID ++;
        return idNewAlbum;
    }
    
    public deleteAlbum(id: number): void {
        let album = this.getAlbumById(id);
        if(album !== undefined) {
            //let tracksAlbumes = album.tracks;
            //tracksAlbumes.find(track => this.deleteTrack(track.id));    
            this.albumes.splice(this.albumes.indexOf(album),1);
        } else {
            throw new Error(`El album con el id:${id} no existe`);
        }
    }

    private findAlbumByName(name: string): Album | undefined {
        return this.albumes.find(album => album.name === name);
    }
        
    public searchNameArtistById(id: Number): string {
        let artist = this.artists.find(artist => artist.id === id)
        if(artist !== undefined) {
            return artist.name;
        } else {
            throw new Error(`El Artista con el id: '${id}' no existe`);
        }
    }

    // trackData: objeto JS con los datos necesarios para crear un track
    //   trackData.name (string)
    //   trackData.duration (number)
    //   trackData.genres (lista de strings)
    // retorna: el nuevo track creado
    public addTrack(albumId: number, trackData: TrackInterface) {
    /* Crea un track y lo agrega al album con id albumId.
    El objeto track creado debe tener (al menos):
        - una propiedad name (string),
        - una propiedad duration (number),
        - una propiedad genres (lista de strings)*/
        let newTrack = new Track(trackData.name, trackData.duration, trackData.genres);
        newTrack.id = this.getNextTrackId();
        this.tracks.push(newTrack);
        //albumId.addTrack(newTrack);
        return newTrack;
    }

    public getNextTrackId() : number {
        let trackID = this.trackID;
        this.trackID ++;
        return trackID;
    }

    public filterAlbumByName(name: string): Array<Album> {
        return this.albumes.filter(album => album.name.includes(name));
    }

    public getArtistById(id: number): Artist | undefined {
        return this.artists.find(artist => artist.id === id);
    }

    public getAlbumById(id: number): Album | undefined {
        return this.albumes.find(album => album.id === id);
    }

    public getTrackById(id: number): Track | undefined {
        return this.tracks.find(track => track.id === id);
    }

    public getPlaylistById(id: number) {

    }

    // genres: array de generos(strings)
    // retorna: los tracks que contenga alguno de los generos en el parametro genres
    public getTracksMatchingGenres(genres: Array<string>): Array<Track> | undefined {
        return this.tracks.filter((track) => {    
            if(track.containsGenre(genres)) {
                return track;
            }
        })
    }

    // artistName: nombre de artista(string)
    // retorna: los tracks interpredatos por el artista con nombre artistName
    public getTracksMatchingArtist(artistName: any) {

    }


    // name: nombre de la playlist
    // genresToInclude: array de generos
    // maxDuration: duración en segundos
    // retorna: la nueva playlist creada
    public createPlaylist(name: string, genresToInclude: any, maxDuration: any) {
    /*** Crea una playlist y la agrega a unqfy. ***
        El objeto playlist creado debe soportar (al menos):
        * una propiedad name (string)
        * un metodo duration() que retorne la duración de la playlist.
        * un metodo hasTrack(aTrack) que retorna true si aTrack se encuentra en la playlist.
    */

    }

    public searchByName(name: string) {
        
    }

    public save(filename: string) {
        const listenersBkp = this.listeners;
        this.listeners = [];

        const serializedData = picklify.picklify(this);

        this.listeners = listenersBkp;
        fs.writeFileSync(filename, JSON.stringify(serializedData, null, 2));
    }

    public static load(filename: string) {
        const serializedData = fs.readFileSync(filename, {encoding: 'utf-8'});
        //COMPLETAR POR EL ALUMNO: Agregar a la lista todas las clases que necesitan ser instanciadas
        const classes = [UNQfy, Artist, Album, Track];
        return picklify.unpicklify(JSON.parse(serializedData), classes);
    }
}