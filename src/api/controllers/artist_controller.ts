import { Request, Response, NextFunction } from 'express';
import { ArtistInterface } from '../../model/interfaces';
import { Artist } from '../../model/artist';
import { UNQfyController } from './unqfy_controller';
import { ResourceNotFoundResponse } from '../error_response/resource_not_found_response';
import { BadResquestResponse } from '../error_response/bad_resquest_response';


export class ArtistController extends UNQfyController{

    public static registerArtist(req: Request, res: Response): Response {
        const artistBody: ArtistInterface = req.body;
        let artist: Artist = this.getUnqfy().addArtist(artistBody);
        return res.status(201).json({message: 'Artist creado', artist: artist.toJson()});   
    }   
    public static validateData(req: Request, res: Response, next: NextFunction): void {
        this.validateJson(res, req.body);
        const artistBody: ArtistInterface = req.body;
        this.validateDatas(res, artistBody);
        next();
    }
    private static validateJson(res: Response, artistBody: ArtistInterface): Response | undefined {
        if(!artistBody){
            return this.handleError(res, new BadResquestResponse());
        }
    }
    private static validateDatas(res: Response, artistBody: ArtistInterface): void {
        this.validateNameArtist(res, artistBody);
        this.validateCountry(res, artistBody);
    }
    private static validateNameArtist(res: Response, artistBody: ArtistInterface): Response | undefined {
        if(!artistBody.name){
            return this.handleError(res, new BadResquestResponse());
        }
    }
    private static validateCountry(res: Response, artistBody: ArtistInterface): Response | undefined {
        if(!artistBody.country){
            return this.handleError(res, new BadResquestResponse()); 
        }
    }
    public static getArtist(req: Request, res: Response): Response {
        const artistId: number = Number(req.params.id);
        let artist: Artist | undefined = this.getUnqfy().getArtistById(artistId);
        if(artist !== undefined) {
            return res.json(artist);
        } else {
            return this.handleError(res, new ResourceNotFoundResponse());
        }
    }

    public static updateArtist(req: Request, res: Response): Response {
        const artistId: number = Number(req.params.id);
        const artistBody: ArtistInterface = req.body;
        let artist: Artist | undefined = this.getUnqfy().getArtistById(artistId);
        if(artist !== undefined) {
            let updateartist: Artist|undefined = this.getUnqfy().updateArtist(artistId,artistBody.name);   
            if(updateartist !== undefined) {
                return res.status(200).json({message: 'Artist actualizado', artist: updateartist.toJson()});
            }else{
                return this.handleError(res, new ResourceNotFoundResponse());
            }
        } else {
            return this.handleError(res, new ResourceNotFoundResponse());
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
        let artist: Artist | undefined = this.getUnqfy().getArtistById(artistId);
        if(artist !== undefined) {
            this.getUnqfy().deleteArtist(artistId);
            return res.status(204);
        } else {
            return this.handleError(res, new ResourceNotFoundResponse());
        }
    }

    public static searchArtist(req: Request, res: Response): Response {
      
        const artistQuery: ArtistInterface = req.query;
        let artists: Array<Artist> = this.getUnqfy().filterArtistsByName(artistQuery.name);
        if(artists.length !== 0) {
            return res.status(200).json({ artists: artists });
        } else {
            return this.handleError(res, new ResourceNotFoundResponse());
        }
    }

}