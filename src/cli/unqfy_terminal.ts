import {UNQfy} from '../unqfy';

export class UNQfyTerminal {

    public static executeCommand(command: string, unqfy: UNQfy, argv: any) {
        switch(command) {
            case 'addArtist': 
                this.addArtist(unqfy, argv);
                break;
    
            case 'deleteArtist':
                this.deleteArtist(unqfy, argv);
                break;
            
            case 'getArtist':
                this.getArtist(unqfy, argv);
                break;
    
            case 'getAlbum':
                this.getAlbum(unqfy, argv);
                break;     
            
            case 'addAlbum': 
                this.addAlbum(unqfy, argv);
                break; 
    
            case 'deleteAlbum':
                this.deleteAlbum(unqfy, argv);
                break;
            
            case 'addTrack':
                this.addTrack(unqfy, argv);
                break;    

            case 'deleteTrack':
                this.deleteTrack(unqfy, argv);
                break;

            case 'getTrack':
                this.getTrack(unqfy, argv);
                break;

            case 'searchByName':
                this.searchByName(unqfy, argv);
                break;
            
            case 'createPlaylist':
                this.createPlaylist(unqfy, argv);
                break;
            
            case 'getPlaylist':
                this.getPlaylist(unqfy, argv);
                break;
            
            case 'deletePlaylist':
                this.deletePlaylist(unqfy, argv);
                break;

            default:
                console.log('Operación desconocida.');
                console.log('--help     para ver los comandos')
        }
    }

    public static deletePlaylist(unqfy: UNQfy, argv: any) {
        let id = Number(argv.id);
        if(isNaN(id)) {
            console.log(`El id '${argv.id}' no es valido. Debe ingresar un número.`);
            return;
        }
        try {
            unqfy.deletePlayList(id);
            console.log(`El playlist '${id}' fue borrado.`);
        } catch(e) {
            console.log(`Error: ${e.message}`);
        }
    }


    public static getPlaylist(unqfy: UNQfy, argv: any) {
        let id = parseInt(argv.id);
        if(isNaN(id)) {
            console.log(`El id '${argv.id}' no es valido. Debe ingresar un número.`);
            return;
        }
        if(id !== -1) {
            this.findPlaylistById(unqfy, id);
        } else {
            this.findPlaylistByName(unqfy, argv.name);
        }
    }

    public static findPlaylistByName(unqfy: UNQfy, name: any) {
        let playlist = unqfy.getPlaylistByPartialName(name);
        if(playlist.length > 0) {
            console.log(playlist);
        } else {
            console.log(`No se encontro el playlist que corresponda con '${name}'`);
        }
    }

    public static findPlaylistById(unqfy: UNQfy, id: number) {
        let playlist = unqfy.getPlaylistById(id);
        if(playlist !== undefined) {
            console.log(playlist);
        } else {
            console.log(`No se encontro playlist con id: ${id}`);
        }
    }

    private static createPlaylist(unqfy: UNQfy, argv: any) {
        let name = argv.name;
        let genres = argv.genres.split(",");
        let duration = argv.duration;
        try {
            let playlist = unqfy.createPlaylist(name, genres, duration);
            console.log(playlist);
        } catch(e) {
            console.log(`Error: ${e.message}`);
        }
    }

    private static addArtist(unqfy: UNQfy, argv: any) {
        let name = argv.name;
        let country = argv.country;
        try{
            let artist = unqfy.addArtist({name, country});
            console.log(artist);
        } catch(e) {
            console.log(`Error: ${e.message}`);
        }
    }

    private static addAlbum(unqfy: UNQfy, argv: any) {
        let artistId = argv.artistId;
        let name = argv.name;
        let year = argv.year;
        try{
            let album = unqfy.addAlbum({artistId ,name ,year});
            console.log(album);
        } catch(e) {
            console.log(`Error: ${e.message}`);
        }
    }

    private static addTrack(unqfy: UNQfy, argv: any) {
        let name = argv.name;
        let duration = argv.duration;
        let genres = argv.genres.split(",");
        let idAlbum = argv.idAlbum;
        try{
            let track = unqfy.addTrack(idAlbum, {name, duration, genres});
            console.log(track);
        } catch(e) {
            console.log(`Error: ${e.message}`);
        }
    }
    
    private static deleteArtist(unqfy: UNQfy, argv: any) {
        let id = Number(argv.id);
        if(isNaN(id)) {
            console.log(`El id '${argv.id}' no es valido. Debe ingresar un número.`);
            return;
        }
        try {
            unqfy.deleteArtist(id);
            console.log(`El artista '${id}' fue borrado.`);
        } catch(e) {
            console.log(`Error: ${e.message}`);
        }
    }

    private static getArtist(unqfy: UNQfy, argv: any) {
        let id = parseInt(argv.id);
        if(isNaN(id)) {
            console.log(`El id '${argv.id}' no es valido. Debe ingresar un número.`);
            return;
        }
        if(id !== -1) {
            this.findArtistById(unqfy, id);
        } else {
            this.findArtistByName(unqfy, argv.name);
        }
    }
    
    private static findArtistById(unqfy: UNQfy, id: number) {
        let artist = unqfy.getArtistById(id);
        if(artist !== undefined) {
            console.log(artist);
        } else {
            console.log(`No se encontro artista con id: ${id}`);
        }
    }
    
    private static findArtistByName(unqfy: UNQfy, name: string) {
        let artists = unqfy.filterArtistsByName(name);
        if(artists.length > 0) {
            console.log(artists);
        } else {
            console.log(`No se encontraron artistas que correspondan con '${name}'`);
        }
    }
        
    private static getAlbum(unqfy: UNQfy, argv: any) {
        let id = Number(argv.id);
        let idArtist = Number(argv.idArtist);
        if(isNaN(id) || isNaN(idArtist)) {
            console.log(`El id o idArtist '${argv.id}' no es valido. Debe ingresar un número.`);
            return;
        }
        if(id !== -1) {
            this.findAlbumById(unqfy, id);
        } else if(idArtist !== -1) {
            this.findAlbumByArtistId(unqfy, idArtist);
        } else {
            this.findAlbumByName(unqfy, argv.name);
        }
    }

    private static findAlbumById(unqfy: UNQfy, id: number) {
        let album = unqfy.getAlbumById(id);
        if(album !== undefined) {
            console.log(album);
        } else {
            console.log(`No se encontro album con id: ${id}`);
        }
    }

    private static findAlbumByArtistId(unqfy: UNQfy, id: number) {
        let artist = unqfy.getArtistById(id);
        if(artist !== undefined && artist.albums.length > 0) {
            console.log(artist.albums);
        } else {
            console.log(`No se encontro album con Artist Id: ${id}`);
        }
    }
    
    private static findAlbumByName(unqfy: UNQfy, name: string) {
        let artists = unqfy.filterAlbumByName(name);
        if(artists.length > 0) {
            console.log(artists);
        } else {
            console.log(`No se encontraron albumes que matcheen con '${name}'`);
        }
    }

    
    private static deleteAlbum(unqfy: UNQfy, argv: any) {
        let id = Number(argv.id);
        if(isNaN(id)) {
            console.log(`El id '${argv.id}' no es valido. Debe ingresar un número.`);
            return;
        }
        try{
            unqfy.deleteAlbum(id);
            console.log(`El album '${id}' fue borrado`);
        } catch(e) {
            console.log(`${e.message}`);
        }
    }

    private static deleteTrack(unqfy: UNQfy, argv: any) {
        let trackId = argv.id;
        if(isNaN(trackId)) {
            console.log(`El id '${argv.id}' no es valido. Debe ingresar un número.`);
            return;
        }
        try {
            unqfy.deleteTrack(trackId);
            console.log(`El track '${trackId}' fue borrado`);
        } catch(e) {
            console.log(`Error: ${e.message}`);
        }
    }

    private static getTrack(unqfy: UNQfy, argv: any) {
        let trackId = Number(argv.id);
        let artistId = Number(argv.idArtist);
        if(isNaN(trackId) || isNaN(artistId)) {
            console.log(`El id o artistId '${argv.id}' no es valido. Debe ingresar un número.`);
            return;
        }
        if(trackId !== -1) {
            this.getTrackById(unqfy, trackId);
        } else if(artistId !== -1) {
            this.getTracksByArtistId(unqfy, artistId);
        } else if(argv.genres !== '') {
            this.getTracksByGenres(unqfy, argv.genres);
        } else {
            this.findTrackByName(unqfy, argv.name);
        }
    }

    private static getTrackById(unqfy:UNQfy, trackId: number) {
        let track = unqfy.getTrackById(trackId);
        if(track === undefined) {
            console.log('No se encontro el id de track');
        } else {
            console.log(track);
        }
    }

    private static getTracksByArtistId(unqfy: UNQfy, artistId: number):void {
        let tracks = unqfy.getTracksMatchingArtist(artistId);
        if(tracks.length > 0) {
            console.log(tracks);
        } else {
            console.log(`No se encontraron tracks que correspondan al artist Id '${artistId}'`);
        }
    }

    private static getTracksByGenres(unqfy: UNQfy, genresString: string):void {
        let genres = genresString.split(",");
        let tracks = unqfy.getTracksMatchingGenres(genres);
        if(tracks !== undefined && tracks.length > 0) {
            console.log(tracks);
        } else {
            console.log(`No se encontraron tracks que correspondan con los generos '${genresString}'`);
        }
    }

    private static findTrackByName(unqfy: UNQfy, name: string) {
        let tracks = unqfy.getTrackByPartialName(name);
        if(tracks.length === 0) {
            console.log(`No se encontraron tracks que correspondan con '${name}'`);
        } else {
            console.log(tracks);
        }
    }

    private static searchByName(unqfy: UNQfy, argv: any) {
        console.log(unqfy.searchByName(argv.name));
    }
}