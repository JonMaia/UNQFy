import { Request, Response, NextFunction } from 'express';
import { Album } from '../../model/album';
import { AlbumInterface } from '../../model/interfaces';
import { Artist } from '../../model/artist';
import { UNQfyController } from './unqfy_controller';
import { ResourceNotFoundResponse } from '../error_response/resource_not_found_response';
import { BadResquestResponse } from '../error_response/bad_resquest_response';
import { ResourceAlreadyExists } from '../error_response/resource_already_exists';
import { RelatedResourceNotFound } from '../error_response/related_resource_not_found';


export class AlbumController extends UNQfyController{
    
    public static getAlbum(req: Request, res: Response): Response {
        const albumId: number = Number(req.params.id);
        let album: Album | undefined = this.getUnqfy().getAlbumById(albumId);
        if(album !== undefined) {
            return res.status(200).json({message: 'Se a encontrado el album', album: album.toJson()});
        } else {
            return this.handleError(res, new ResourceNotFoundResponse());
        }
    }

    public static validateData(req: Request, res: Response, next: NextFunction): void {
        this.validateJson(res, req.body);
        const albumBody: AlbumInterface = req.body;
        this.validateDatas(res, albumBody);
        next();
    }

    private static validateJson(res: Response, albumBody: AlbumInterface): Response | undefined {
        if(!albumBody){
            return this.handleError(res, new BadResquestResponse());
            // Por si se envia un json invalido
        }
    }

    private static validateDatas(res: Response, albumBody: AlbumInterface): void {
        this.validateArtistId(res, albumBody);
        this.validateNameAlbum(res, albumBody);
        this.validateYearAlbum(res, albumBody);
    }

    private static validateArtistId(res: Response, albumBody: AlbumInterface): Response | undefined {
        if(!albumBody.artistId){
            return this.handleError(res, new BadResquestResponse());
        }
    }

    private static validateNameAlbum(res: Response, albumBody: AlbumInterface): Response | undefined {
        if(!albumBody.name){
            return this.handleError(res, new BadResquestResponse()); 
        }
    }

    public static validateYearAlbum(res: Response, albumBody: AlbumInterface): Response | undefined {
        if(!albumBody.year){
            return this.handleError(res, new BadResquestResponse()); 
        }
    }

    public static registerAlbum(req: Request, res: Response): Response {
        const albumBody: AlbumInterface = req.body;
        let name: string = albumBody.name;
        let albumByArtistId: number = albumBody.artistId;
        let artist: Artist | undefined = this.getUnqfy().getArtistById(albumByArtistId);
        if(!artist){
            return this.handleError(res, new RelatedResourceNotFound());
        }
        let newAlbum: Album | undefined = this.getUnqfy().getAlbumByArtistId(name, albumByArtistId);
        if(newAlbum === undefined) {
            let album: Album = this.getUnqfy().addAlbum(albumBody);
            this.saveUnqfy; 
            return res.status(201).json({message: 'Se agregó el album', album: album.toJson()});
        } else {
            return this.handleError(res, new ResourceAlreadyExists());
        }
    }

    public static updateYearInAlbum(req: Request, res: Response): Response | undefined {
        this.validateJson(res, req.body);
        const albumYear: number = Number(req.body.year);
        const albumId: number = Number(req.params.id);
        let album: Album | undefined = this.getUnqfy().getAlbumById(albumId);
        if(album !== undefined) {
            album.setYear(albumYear);
            this.saveUnqfy;
            return res.status(200).json({message: 'Se actualizó el año', album: album.toJson()});
        } else {
            return this.handleError(res, new ResourceNotFoundResponse());
        }
    }

    public static deleteAlbum(req: Request, res: Response): Response | undefined {
        const albumId: number = Number(req.params.id);
        let album: Album | undefined = this.getUnqfy().getAlbumById(albumId);
        if(album !== undefined) {
            this.getUnqfy().deleteAlbum(album.id);
            this.saveUnqfy;
            return res.status(204).json({message: 'Se eliminó correctamente el album'});
        } else {
            return this.handleError(res, new ResourceNotFoundResponse());
        }
    }

    public static getAlbumByName(req: Request, res: Response): Response | undefined {
        const albumName: string = req.params.name;
        let albums: Array<Album> | undefined = this.getUnqfy().filterAlbumByName(albumName);
        return res.status(200).json(albums.map(album => album.toJson()));
    }
}
