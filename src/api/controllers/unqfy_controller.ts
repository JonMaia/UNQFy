import { UNQfy } from "../../unqfy";
import fs from "fs";
import path from "path";
import { Response } from "express";
import { ErrorResponse } from "../error_response/error_response";

export class UNQfyController {
 
    private static instance: UNQfyController;
    private unqfy!: UNQfy;

    private constructor() {

    }

    public static getInstance(): UNQfyController {
        if(!UNQfyController.instance) {
            UNQfyController.instance = new UNQfyController();
        }
        return UNQfyController.instance;
    }

    public static handleError(res: Response, error: ErrorResponse): Response {
        return res.status(error.status).json({
            status: error.status,
            errorCode: error.message
        })
    }

    public getUnqfy(): UNQfy{
        let filename = path.join(__dirname, '..', '..', '..', 'data.json');
        if(this.unqfy === undefined && fs.existsSync(filename)){
            this.unqfy = UNQfy.load(filename);
        } else if(this.unqfy === undefined) {
            this.unqfy = new UNQfy();
            this.saveUnqfy();
        }
        return this.unqfy;
    }

    public saveUnqfy(): void {
        let filename = path.join(__dirname, '..', '..', '..', 'data.json');
        this.unqfy.save(filename);
    }

    // Solo se permite el seteo de unqfy para el entorno dev
    public setUnqfy(unqfy: UNQfy): void {
        if(process.env.NODE_ENV === 'DEV') {
            this.unqfy = unqfy;
        }
    }

}