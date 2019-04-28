import {UNQfy} from './unqfy';

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
            
            default:
                console.log('Operación desconocida.');
                console.log('--help     para ver los comandos')
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
    
    private static deleteArtist(unqfy: UNQfy, argv: any) {
        let id = Number(argv.id);
        if(isNaN(id)) {
            console.log(`El id '${argv.id}' no es valido. Debe ingresar un número.`);
            return;
        }
        unqfy.deleteArtist(id);
        console.log(`El artista '${id}' fue borrado.`);
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
            console.log(`No se encontraron artistas que matcheen con '${name}'`);
        }
    }
        
    private static getAlbum(unqfy: UNQfy, argv: any) {
        let id = parseInt(argv.id);
        if(isNaN(id)) {
            console.log(`El id '${argv.id}' no es valido. Debe ingresar un número.`);
            return;
        }
        if(id !== -1) {
            this.findAlbumById(unqfy, id);
        } else {
            this.findAlbumByName(unqfy, argv.name);
        }
    }

    private static findAlbumById(unqfy: UNQfy, id: number) {
        let album = unqfy.getAlbumById(id);
        if(album !== undefined) {
            console.log(album);
        } else {
            console.log(`No se encontro artista con id: ${id}`);
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
}