import { Album } from "../model/album";

export abstract class Observer {

    public abstract log(mensagge:string, level: string): void;
}   