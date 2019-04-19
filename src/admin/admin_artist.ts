import {Artist} from '../model/artist';

export default class AdminArtist {

    private artists: Array<Artist>;

    constructor() {
        this.artists = new Array;
    }

    /**
     * Crea un nuevo artista con los datos pasados por parametro, lo guarda y retorna.  
     * Previamente, verifica si existe un artista con el nombre pasado por parametro, si existe el artista lanza un error
     * @param name 
     * @param country 
     */
    public createArtist(name: string, country: string): Artist {
        let artist = this.findArtistByName(name);
        if(artist === undefined) {
            let newArtist = new Artist(name, country);
            this.getArtists().push(newArtist);
            return newArtist;
        } else {
            throw new Error(`Ya existe el artista '${name}'`);
        }
    }

    public findArtistByName(name: string): Artist | undefined {
        return this.getArtists().find(artist => artist.name === name);
    }

    private getArtists(): Array<Artist> {
        return this.artists;
    }

}