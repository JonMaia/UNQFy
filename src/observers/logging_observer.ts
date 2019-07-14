import rp from 'request-promise';
import { Observer } from "./observer";
import { Artist } from '../model/artist';
import { Album } from '../model/album';
import { Track } from '../model/track';

export class LoggingObserver implements Observer{

    public notifyAddAlbum(album:Album): void{
        this.log(`Se agrego el album '${album.name}' con el Id: '${album.id}'`,"info")
    }
    public notifyDeleteAlbum(album:Album|undefined): void{
        if(album !==undefined){
        this.log(`Se elimino el album '${album.name}' con el Id: '${album.id}'`,"info")
        }
    }

    public notifyAddArtist(artist:Artist): void{       
        this.log(`Se agrego el artista '${artist.name}' con el Id: '${artist.id}'`,"info")
    }
    public notifyDeleteArtist(artist:Artist|undefined): void{      
        if(artist !==undefined){  
        this.log(`Se elimino el artista '${artist.name}' con el Id: '${artist.id}'`,"info")
        }
    }

    public notifyAddTrack(track:Track): void{
        this.log(`Se agrego el track '${track.name}' con el Id: '${track.id}'`,"info")
    }
    public notifyDeleteTrack(track:Track|undefined): void{
        if(track !==undefined){
        this.log(`Se elimino el track '${track.name}' con el Id: '${track.id}'`,"info")
        }
    }

    public notifyUpdateArtist(artist:Artist|undefined): void{
        if(artist !==undefined){
        this.log(`Se acualizo el artista '${artist.name}' con el Id: '${artist.id}'`,"info")
        }
    }

    public log(mensagge:string, level: string): void{
        let options = {
            body: {
                "message": mensagge,
                "level": level     
            },
            uri: `http://localhost:4000/api/log/logging`,
            method: 'POST',
            json: true
        }
            rp(options)   
    }

}
