import { UNQfy } from "../unqfy";
import fs from "fs"

export class UNQfyController {
 
    private static unqfy: UNQfy;

    protected static getUnqfy(filename = 'data.json'){
        if(!this.unqfy && fs.existsSync(filename)){
            this.unqfy = UNQfy.load(filename);
        } else {
            this.unqfy = new UNQfy();
        }
        return this.unqfy;
    }

    protected static saveUnqfy(unqfy: UNQfy, filename = 'data.json'){
        unqfy.save(filename);
    }
}