import { UNQfy } from "../../unqfy";
import fs from "fs";
import path from "path";

export class UNQfyController {
 
    private static unqfy: UNQfy;

    protected static getUnqfy(){
        let filename = path.join(__dirname, '..', '..', '..', 'data.json');
        if(this.unqfy === undefined && fs.existsSync(filename)){
            this.unqfy = UNQfy.load(filename);
        } else {
            this.unqfy = new UNQfy();
        }
        return this.unqfy;
    }

    protected static saveUnqfy(unqfy: UNQfy) {
        let filename = path.join(__dirname, '..', '..', 'data.json');
        unqfy.save(filename);
    }
}