import { UNQfy } from "../../unqfy";
import fs from "fs";
import path from "path";
import { Response } from "express";
import { ErrorResponse } from "../error_response/error_response";

export class UNQfyController {
 
    private static unqfy: UNQfy;

    protected static getUnqfy(): UNQfy{
        let filename = path.join(__dirname, '..', '..', '..', 'data.json');
        if(this.unqfy === undefined && fs.existsSync(filename)){
            this.unqfy = UNQfy.load(filename);
        } else if(this.unqfy === undefined) {
            this.unqfy = new UNQfy();
        }
        return this.unqfy;
    }

    protected static saveUnqfy(unqfy: UNQfy): void {
        let filename = path.join(__dirname, '..', '..', 'data.json');
        unqfy.save(filename);
    }

    public static handleError(res: Response, error: ErrorResponse): Response {
        return res.status(error.status).json({
            status: error.status,
            errorCode: error.message
        })
    }
}