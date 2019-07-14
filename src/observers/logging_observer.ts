import rp from 'request-promise';
import { Observer } from "./observer";

export class LoggingObserver implements Observer{

    public notifyAddAlbum(mensagge:string, level: string): void{
        this.log(mensagge,level)
    }
    public notifyDeleteAlbum(mensagge:string, level: string): void{
        this.log(mensagge,level)
    }

    public notifyAddArtist(mensagge:string, level: string): void{
        this.log(mensagge,level)
    }
    public notifyDeleteArtist(mensagge:string, level: string): void{
        this.log(mensagge,level)
    }

    public notifyAddTrack(mensagge:string, level: string): void{
        this.log(mensagge,level)
    }
    public notifyDeleteTrack(mensagge:string, level: string): void{
        this.log(mensagge,level)
    }

    public notifyUpdateArtist(mensagge:string, level: string): void{
        this.log(mensagge,level)
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
