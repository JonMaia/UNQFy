import { Request, Response, NextFunction } from 'express';
import { ArtistInterface } from '../../model/interfaces';
import { Artist } from '../../model/artist';
import { UNQfyController } from './unqfy_controller';
import { ResourceNotFoundResponse } from '../error_response/resource_not_found_response';
import { BadResquestResponse } from '../error_response/bad_resquest_response';
import { ResourceAlreadyExists } from '../error_response/resource_already_exists';
import { RelatedResourceNotFound } from '../error_response/related_resource_not_found';
import { ErrorResponse } from '../error_response/error_response';
import { Album } from '../../model/album';

export class ArtistController {

    public static registerArtist(req: Request, res: Response): Response {
        const artistBody: ArtistInterface = req.body;   
        if(!UNQfyController.getInstance().getUnqfy().existsArtist(artistBody.name)){
            let artist: Artist = UNQfyController.getInstance().getUnqfy().addArtist(artistBody);
            UNQfyController.getInstance().saveUnqfy();
            return res.status(201).json(artist.toJson());
        }else{
            return UNQfyController.handleError(res, new ResourceAlreadyExists());
        }   
    }   
    public static validateData(req: Request, res: Response, next: NextFunction): void {
        this.validateJson(res, req.body);
        const artistBody: ArtistInterface = req.body;
        if (this.validateDatas(res, artistBody) == undefined){
            next();
        };     
    }
    private static validateJson(res: Response, artistBody: ArtistInterface): Response | undefined {
        if(!artistBody){
            return UNQfyController.handleError(res, new BadResquestResponse());
        }
    }
    private static validateDatas(res: Response, artistBody: ArtistInterface): Response | undefined {
        let nameValidate : Response | undefined = this.validateNameArtist(res, artistBody);
        if(nameValidate == undefined){
            return this.validateCountry(res, artistBody);
        }
        return nameValidate;
    }
    private static validateNameArtist(res: Response, artistBody: ArtistInterface): Response | undefined {
        if(!artistBody.name){
            return UNQfyController.handleError(res, new BadResquestResponse());
        }
    }
    private static validateCountry(res: Response, artistBody: ArtistInterface): Response | undefined {
        if(!artistBody.country){
            return UNQfyController.handleError(res, new BadResquestResponse()); 
        }
    }
    public static getArtist(req: Request, res: Response): Response {
        const artistId: number = Number(req.params.id);
        let artist: Artist | undefined = UNQfyController.getInstance().getUnqfy().getArtistById(artistId);
        if(artist !== undefined) {
            return res.json(artist.toJson());
        } else {
            return UNQfyController.handleError(res, new ResourceNotFoundResponse());
        }
    }

    public static updateArtist(req: Request, res: Response): Response {
        const artistId: number = Number(req.params.id);
        const artistBody: ArtistInterface = req.body;
        let artist: Artist | undefined = UNQfyController.getInstance().getUnqfy().getArtistById(artistId);
        if(artist !== undefined) {
            let updateartist: Artist|undefined = UNQfyController.getInstance().getUnqfy().updateArtist(artistId,artistBody.name,artistBody.country);   
            if(updateartist !== undefined) {
                UNQfyController.getInstance().saveUnqfy();
                return res.status(200).json(artist.toJson());
            }else{
                return UNQfyController.handleError(res, new ResourceNotFoundResponse());
            }
        } else {
            return UNQfyController.handleError(res, new ResourceNotFoundResponse());
        }
    }
    public static validateName(req: Request, res: Response, next: NextFunction): void {
        this.validateJson(res, req.body);
        const artistBody: ArtistInterface = req.body;
        this.validateNameArtist(res, artistBody);
        next();
    }

    public static deleteArtist(req: Request, res: Response): Response {
        const artistId: number = Number(req.params.id);
        let artist: Artist | undefined = UNQfyController.getInstance().getUnqfy().getArtistById(artistId);
        if(artist !== undefined) {
            UNQfyController.getInstance().getUnqfy().deleteArtist(artistId);
            UNQfyController.getInstance().saveUnqfy();
            return res.status(204).json();
        } else {
            return UNQfyController.handleError(res, new ResourceNotFoundResponse());
        }
    }

    public static searchArtist(req: Request, res: Response): Response {
        const artistName: string = req.query.name || '';
        let artists: Array<Artist> = UNQfyController.getInstance().getUnqfy().filterArtistsByNameNoSensible(artistName); 
        return res.status(200).json(artists.map(artist => artist.toJson()));
    }

    public static populateAlbumsFromSpotify(req: Request, res: Response) {
        let id: number = Number(req.params.id);
        let artist: Artist | undefined = UNQfyController.getInstance().getUnqfy().getArtistById(id);
        if(artist !== undefined) {
            artist.populateAlbumsFromSpotify()
                .then((albums: Array<Album>) => {
                    return res.status(201).json(albums.map(album => album.toJson()));
                })
                .catch((err: ErrorResponse) => {
                    return UNQfyController.handleError(res, err);
                })
        } else {
            return UNQfyController.handleError(res, new RelatedResourceNotFound());
        }
    }
}