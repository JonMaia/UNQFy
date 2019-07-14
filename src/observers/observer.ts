import { Album } from "../model/album";

export abstract class Observer {

    public abstract notifyAddAlbum(mensagge:string, level: string): void;
    public abstract notifyDeleteAlbum(mensagge:string, level: string): void;

    public abstract notifyAddArtist(mensagge:string, level: string): void;
    public abstract notifyDeleteArtist(mensagge:string, level: string): void;

    public abstract notifyAddTrack(mensagge:string, level: string): void;
    public abstract notifyDeleteTrack(mensagge:string, level: string): void;

    public abstract notifyUpdateArtist(mensagge:string, level: string): void;
}   