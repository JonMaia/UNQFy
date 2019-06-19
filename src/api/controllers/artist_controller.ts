import { Request, Response, NextFunction } from 'express';
import { ArtistInterface } from '../../model/interfaces';
import { Artist } from '../../model/artist';
import { UNQfyController } from './unqfy_controller';
import { ResourceNotFoundResponse } from '../error_response/resource_not_found_response';
import { BadResquestResponse } from '../error_response/bad_resquest_response';
import { ResourceAlreadyExists } from '../error_response/resource_already_exists';

export class ArtistController extends UNQfyController{

    public static registerArtist(req: Request, res: Response): Response {
        const artistBody: ArtistInterface = req.body;   
        if(!this.getUnqfy().existsArtist(artistBody.name)){
            let artist: Artist = this.getUnqfy().addArtist(artistBody);
            console.log('-----------------------Post Artist--------------------------------')
            console.log(this.getUnqfy())
            this.saveUnqfy();
            return res.status(201).json(artist.toJson());
        }else{
            return this.handleError(res, new ResourceAlreadyExists());
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
            return this.handleError(res, new BadResquestResponse());
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
            let updateartist: Artist|undefined = this.getUnqfy().updateArtist(artistId,artistBody.name,artistBody.country);   
            if(updateartist !== undefined) {
                this.saveUnqfy();
                return res.status(200).json(artist.toJson());
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
            this.saveUnqfy();
            return res.status(204).json();
        } else {
            return this.handleError(res, new ResourceNotFoundResponse());
        }
    }

    public static searchArtist(req: Request, res: Response): Response {

         const artistQuery: ArtistInterface = req.query;
        if(artistQuery.name == undefined){
            let allArtist: Array<Artist> = this.getUnqfy().getAllArtists();
            return res.status(200).json(allArtist);
        }else{
            let artists: Array<Artist> = this.getUnqfy().filterArtistsByNameNoSensible(artistQuery.name); 
            return res.status(200).json(artists);
        }
      }
}