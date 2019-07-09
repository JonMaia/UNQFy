const picklify = require('picklify'); // para cargar/guarfar unqfy
import { Request, Response, NextFunction } from 'express';
import { LogInterface } from '../model/interfaces';
import { UNQfyController } from '../api/controllers/unqfy_controller';
import { BadResquestResponse } from '../api/error_response/bad_resquest_response';
import path from "path";
import fs from 'fs';
import { winston } from './loggly_service';

export class LogController {

    private static state: boolean = true;

    public static activate(req: Request, res: Response): Response {
        this.state = true;
        return res.status(200).json();
    }

    public static desactivate(req: Request, res: Response): Response {
        this.state = false;
        return res.status(200).json();
    }

    public static logging(req: Request, res: Response): Response {
        const logBody: LogInterface = req.body;
        let filename = path.join(__dirname, '..', '..', 'logger.txt');
        fs.appendFileSync(filename, JSON.stringify(logBody,null, 2));
        
        winston.log(logBody.level, logBody.message);

        return res.status(200).json();
    }

    public static validateData(req: Request, res: Response, next: NextFunction) {
        const logBody: LogInterface = req.body;
        if(!logBody || !logBody.level || !logBody.message) {
            return UNQfyController.handleError(res, new BadResquestResponse()); 
        }
        next();
    }  
}