import { Request, Response, NextFunction } from 'express';
import { AlbumInterface } from '../model/interfaces';
import { Album } from '../model/album';
import { UNQfyController } from './unqfy_controller';

export class AlbumController extends UNQfyController{
    
    public static getAlbum(req: Request, res: Response): Promise<Response> {
        const albumHeader: AlbumInterface = req.params.id
        try {
            let album = this. getAlbumById(albumHeader)
            return res.json({
                artistId: album.idArtist,
                name: album.name,
                year: album.year 
            })
        }
    }

    /*public static validateData(req: Request, res: Response, next: NextFunction): Response | undefined {
        const albumBody: AlbumInterface = req.body;
        if(!albumBody.artistId && !albumBody.name && !albumBody.year){
            return res.status(400).json({error: 'Debe ingresar el '})
        }
    }*/
}