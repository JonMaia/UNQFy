import { Album } from "../model/album";
import { Artist } from "../model/artist";
import { Track } from "../model/track";

export abstract class Observer {

    public abstract notifyAddAlbum(album:Album): void;
    public abstract notifyDeleteAlbum(album:Album|undefined): void;

    public abstract notifyAddArtist(artist:Artist): void;
    public abstract notifyDeleteArtist(artist:Artist|undefined): void;

    public abstract notifyAddTrack(track:Track): void;
    public abstract notifyDeleteTrack(track:Track|undefined): void;

    public abstract notifyUpdateArtist(artist:Artist|undefined): void;
}   