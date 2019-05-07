const picklify = require('picklify'); // para cargar/guarfar unqfy
import fs from 'fs'; // para cargar/guarfar unqfy
import {Artist} from './model/artist';
import {ArtistInterface, AlbumInterface} from './model/interfaces';
import { Album } from './model/album';
import { Track } from './model/track';
import {TrackInterface} from './model/interfaces';
import { Playlist } from './model/playlist';

// COMPLETAR POR EL ALUMNO: exportar todas las clases que necesiten ser utilizadas desde un modulo cliente
export class UNQfy {
    
    private listeners: any;
    private artists: Array<Artist>;
    private albumes: Array<Album>;
    private tracks: Array<Track>;
    private artistId: number = 0;
    private trackID: number = 0;
    private albumID: number = 0;
    private playLists: Array<Playlist>;
    private playListID: number = 0;

    constructor() {
        this.artists = new Array;
        this.albumes = new Array;
        this.tracks = new Array;
        this.playLists = new Array;
    }

    /**
     * Crea un nuevo artista con los datos pasados por parametro, lo guarda y retorna.  
     * Previamente, verifica que no exista un artista con el nombre pasado por parametro, si existe el artista lanza un error.
     * @param artistData - Debe tener mínimamente: name(string), country(string)
     */
    public addArtist(artistData: ArtistInterface): Artist {
        if(!this.existsArtist(artistData.name)) {
            let newArtist = new Artist(artistData.name, artistData.country);
            newArtist.id = this.nextArtistId();
            this.artists.push(newArtist);
            return newArtist;
        } else {
            throw new Error(`Ya existe el artista '${artistData.name}'`);
        }
    }

    /**
     * @returns el siguiente id a asignar del artista
     */
    private nextArtistId(): number {
        let id = this.artistId;
        this.artistId++;
        return id;
    }

    /**
     * Busca y elimina el artista con el id pasado por parametro,
     * también elimina los albums y tracks asociados al artista
     * @param id 
     */
    public deleteArtist(id: number): void {
        let artist = this.getArtistById(id);
        if(artist !== undefined) {
            this.removeArtist(artist);
        } else {
            throw new Error(`No existe un artista con id '${id}'`);
        }
    }

    private removeArtist(artist: Artist): void {
        this.deleteReverse(artist.albums, this.removeAlbum.bind(this));
        this.artists.splice(this.artists.indexOf(artist), 1);
    }

    /**
     * Elimina los elementos de un array desde el último elemento al primero.
     * Ya que al eliminar de manera normal (inicio a fin) cuando se realiza un splice los index se vuelven a calcular y
     * esto provoca que muchos elementos no se eliminen dentro de una iteración
     * @param array con elementos a eliminar
     * @param deleteFunction que se ejecutará para eliminar el elemento
     */
    private deleteReverse(array: Array<any>, deleteFunction: Function): void {
        for (let index = array.length - 1; index >= 0; index--) {
            let element = array[index];
            deleteFunction(element);
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

    /**
     * Crea un album, lo agrega a albumes y agrega agrega ese album al lista de albumes del artista correspondiente,  
     * salvo en caso que el album del artista (con el artistId especifico) ya exista, en ese caso lanza una excepcion
     * @param albumData -  artistId: number; name: string; year: number; 
     */
    public addAlbum(albumData: AlbumInterface): Album {    
        let artistDate = this.getArtistById(albumData.artistId);
        if(artistDate !== undefined){
            if(!this.existAlbumToArtist(albumData.name,albumData.artistId)) {
                let newAlbum = new Album(albumData.artistId, albumData.name, albumData.year);
                newAlbum.setId(this.getNextAlbumId());
                this.albumes.push(newAlbum);
                artistDate.addAlbum(newAlbum);
                return newAlbum;
            } else {
                throw new Error(`El album '${albumData.name}' del artista '${artistDate.name}' ya a sido creado`);
            }
        } else {
            throw new Error(`No existe artista con el Id: '${albumData.artistId}'`);
        }
    }

    /**
     * Retorna si al artista con el idArtista tiene o no un album con el nombre nameAlbum
     * @param nameAlbum 
     * @param idArtist
     */
    private existAlbumToArtist(nameAlbum:string, idArtist:number): boolean{
        let albumes = this.filterAlbumByName(nameAlbum)
        .filter(alb => alb.idArtist === idArtist);

        return albumes.length > 0;
    }

    /**
     * Retorna el siguiente id disponible para un album
     */
    public getNextAlbumId() : number {
        let idNewAlbum = this.albumID;
        this.albumID ++;
        return idNewAlbum;
    }

    /**
     * Elimina un album con el id recibido por parametro
     * @param id 
     */
    public deleteAlbum(id: number): void {
        let album = this.getAlbumById(id);
        if(album !== undefined) {
            this.removeAlbum(album);
        } else {
            throw new Error(`El album con el id:${id} no existe`);
        }
    }

    private removeAlbum(album: Album): void {
        this.deleteReverse(album.tracks, this.removeTrack.bind(this));
        let artist = this.getArtistById(album.idArtist);
        if(artist !== undefined) {
            artist.deleteAlbum(album);
        }
        this.albumes.splice(this.albumes.indexOf(album),1);
    }

    /**
     * Retorna un string con el nombre del artista con el id recicibo por parametro
     * @param id 
     */    
    public searchNameArtistById(id: number): string {
        let artist = this.artists.find(artist => artist.id === id)
        if(artist !== undefined) {
            return artist.name;
        } else {
            throw new Error(`El Artista con el id: '${id}' no existe`);
        }
    }
    /**
     * Retorna true si existe un album con el nombre pasado por parametro
     * @param name 
     */
    public existsAlbum(idAlbum: number): boolean {
        return this.albumes.some(album => album.id === idAlbum);
    }

    /**
     * Se crea un nuevo track, pero antes se verifica que el album a donde se va a agregar exista y que no exista un 
     * track con el mismo nombre en el album, caso contrario lanzara excepción
     * @returns track
     * @param albumId 
     * @param trackData 
     */
    public addTrack(albumId: number, trackData: TrackInterface) {
        let album = this.getAlbumById(albumId);
        if (album !== undefined) {
            if(!album.hasTrack(trackData.name)) {
                let newTrack = new Track(trackData.name, trackData.duration, trackData.genres, albumId);
                newTrack.id = this.getNextTrackId();
                this.tracks.push(newTrack);
                album.addTrack(newTrack);
                return newTrack;
            } else {
                throw new Error(`El track '${trackData.name}' ya se encuentra en el album`);
            }    
        } else {
            throw new Error(`El album no existe, deberia crearlo`);
        }
    }

    public deleteTrack(trackId: number) {
        let track = this.getTrackById(trackId);
        if(track !== undefined) {
            this.removeTrack(track);
        }
    }

    private removeTrack(track: Track) {
        let album = this.getAlbumById(track.album);
        if(album !== undefined) {
            album.deleteTrack(track);
        }
        this.deleteTrackInPlayLists(track);
        this.tracks.splice(this.tracks.indexOf(track), 1);
    }

    public getTrackByName(name: string) {
        return this.tracks.find(track => track.name === name);
    }

    public getTrackByPartialName(name: string): Array<Track> {
        return this.tracks.filter(track => track.name.includes(name));
    }

    public getNextTrackId() : number {
        let trackId = this.trackID;
        this.trackID ++;
        return trackId;
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

    public getAlbumsByArtistId(idArtist: number): Array<Album> {
        return this.albumes.filter(album => album.idArtist === idArtist);
    }

    public getTrackById(id: number): Track | undefined {
        return this.tracks.find(track => track.id === id);
    }

    public getPlaylistById(id: number): Playlist | undefined{
        return this.playLists.find(playlist => playlist.id == id);
    }

    // genres: array de generos(strings)
    // retorna: los tracks que contenga alguno de los generos en el parametro genres
    public getTracksMatchingGenres(genres: Array<string>): Array<Track> {
        return this.tracks.filter((track) => {    
            return track.containsGenre(genres);
        })
    }

    /**
     * @returns los tracks interpretados por el artista con el id pasado por parametro
     * @param idArtist 
     */
    public getTracksMatchingArtist(idArtist: number): Array<Track> {
        let albums = this.filterAlbumsByArtistId(idArtist);
        if(albums !== undefined) {
            return albums.reduce((listTracks: Array<Track>, album: Album) => {
                return listTracks.concat(album.tracks);
            }, []);
        }
        return new Array;
    }

    public existsTrack(idTrack: number): boolean {
        return this.tracks.some(track => track.id === idTrack);
    }

    private filterAlbumsByArtistId(idArtist: number): Array<Album> | undefined {
        return this.albumes.filter(album => album.idArtist === idArtist);
    }

    public deletePlayList(playListID: number) {
        let playList = this.getPlaylistById(playListID);
        if(playList !== undefined) {
            this.removePlayList(playList);
        }
    }

    private removePlayList(playList: Playlist) {
        this.playLists.splice(this.playLists.indexOf(playList), 1);
    }

    // name: nombre de la playlist
    // genresToInclude: array de generos
    // maxDuration: duración en segundos
    // retorna: la nueva playlist creada
    public createPlaylist(name: string, genresToInclude: Array<string>, maxDuration: number) {
    /*** Crea una playlist y la agrega a unqfy. ***
        El objeto playlist creado debe soportar (al menos):
        * una propiedad name (string)
        * un metodo duration() que retorne la duración de la playlist.
        * un metodo hasTrack(aTrack) que retorna true si aTrack se encuentra en la playlist.
    */
        let playList = this.getPlaylistByName(name);
        if (playList === undefined) {
            let newPlayList = new Playlist(name, maxDuration, genresToInclude);
            newPlayList.id = this.getNextPlayListId();
            this.tracks.forEach(track => {
                newPlayList.addTrackPL(track);
            })  
            return newPlayList;
        } else {
            throw new Error('El playlist que se intenta crear ya existe')
        }
    }

    public getNextPlayListId(): number {
        let playListId = this.playListID;
        this.playListID ++;
        return playListId;
    }

    public getPlaylistByName(name: string) {
        return this.playLists.find(playlist => playlist.name === name);
    }

    public deleteTrackInPlayLists(track: Track){
        this.playLists.forEach(playlist => {
            playlist.tracks.splice(1,1,track);
        })
    }

    public addTrackInPlayList(track: Track, playlist: Playlist){
        if ( !playlist.hasTrack(track)) {
            playlist.tracks.push(track);
        }
    }

    /**
     * @returns todos los artistas, albumes, tracks y playlist que coincidan con el nombre pasado por parametro
     * @param name 
     */
    public searchByName(name: string) {
        let artists = this.filterArtistsByName(name);
        let albums = this.filterAlbumByName(name);
        let tracks = this.getTrackByPartialName(name);
        let playList = this.getPlaylistByName(name);
        return {
            artists,
            albums,
            tracks,
            playList
        }
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
        const classes = [UNQfy, Artist, Album, Track, Playlist];
        return picklify.unpicklify(JSON.parse(serializedData), classes);
    }
}