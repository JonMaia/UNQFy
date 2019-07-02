import { Album } from "../model/album";

export abstract class Observer {

    public abstract addAlbum(album: Album): void;

}