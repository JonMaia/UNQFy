import rp from 'request-promise';
import { Observer } from "./observer";
import { Album } from "../model/album";
import { Artist } from "../model/artist";
import { Track } from "../model/track";

export class NotificationObserver implements Observer {
    
    public notifyAddAlbum(album:Album): void {
        console.log('notificar por email')
        this.notifyByEmail(album);
    }
    
    public notifyDeleteAlbum(album: Album | undefined): void {
    
    }

    public notifyAddArtist(artist: Artist): void {
    
    }

    public notifyDeleteArtist(artist: Artist | undefined): void {
    
    }
    
    public notifyAddTrack(track: Track): void {
    
    }
    
    public notifyDeleteTrack(track: Track | undefined): void {
    
    }
    
    public notifyUpdateArtist(artist: Artist | undefined): void {
    
    }

    public notifyByEmail(album: Album){
        let options = {
            body: {
                "artistId": album.idArtist,
                "subject": `Nuevo album para artista: ${album.name}`,
                "message": `Se ha agregado el album: ${album.name} al artista ${album.idArtist}`,
                "from": "UNQfy <UQNfy.notifications@gmail.com>"     
            },
            uri: `http://localhost:8000/api/notification/notify`,
            method: 'POST',
            json: true
        }
        rp(options)
            .then(data => {
                console.log(`Se notifico correctamente a los suscriptores del artista '${album.name}'`);
            })
            .catch(err => {
                console.log(err.message);
            });
    }
}