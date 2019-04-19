const picklify = require('picklify'); // para cargar/guarfar unqfy
import fs from 'fs'; // para cargar/guarfar unqfy
import AdminArtist from './admin/admin_artist'
import {Artist} from './model/artist';
import {ArtistInterface} from './model/interfaces';

// COMPLETAR POR EL ALUMNO: exportar todas las clases que necesiten ser utilizadas desde un modulo cliente
export class UNQfy {
    private listeners: any;
    private adminArtist: AdminArtist;

    constructor() {
        this.adminArtist = new AdminArtist();
    }

    /**
     * Crea un artista, lo agrega unqfy y lo retorna
     * @param artistData - Debe tener mínimamente: name(string), country(string)
     */
    public addArtist(artistData: ArtistInterface): Artist {
        return this.adminArtist.createArtist(artistData.name, artistData.country);
    }


    // albumData: objeto JS con los datos necesarios para crear un album
    //   albumData.name (string)
    //   albumData.year (number)
    // retorna: el nuevo album creado
    public addAlbum(artistId: number, albumData: any) {
    /* Crea un album y lo agrega al artista con id artistId.
        El objeto album creado debe tener (al menos):
        - una propiedad name (string)
        - una propiedad year (number)
    */
    }


    // trackData: objeto JS con los datos necesarios para crear un track
    //   trackData.name (string)
    //   trackData.duration (number)
    //   trackData.genres (lista de strings)
    // retorna: el nuevo track creado
    public addTrack(albumId: string, trackData: any) {
    /* Crea un track y lo agrega al album con id albumId.
    El objeto track creado debe tener (al menos):
        - una propiedad name (string),
        - una propiedad duration (number),
        - una propiedad genres (lista de strings)
    */
    }

    public getArtistById(id: number) {

    }

    public getAlbumById(id: number) {

    }

    public getTrackById(id: number) {

    }

    public getPlaylistById(id: number) {

    }

    // genres: array de generos(strings)
    // retorna: los tracks que contenga alguno de los generos en el parametro genres
    public getTracksMatchingGenres(genres: any) {

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
        const classes = [UNQfy, AdminArtist, Artist];
        return picklify.unpicklify(JSON.parse(serializedData), classes);
    }
}