import * as fs from "fs";
import * as path from 'path';

export class SpotifyAuth {

    public static getToken() {
        let jsonPath = path.join(__dirname, '..', '..', 'spotifyCreds.json');
        try {
            let jsonString = fs.readFileSync(jsonPath, 'utf8');
            const spotifyCreds = JSON.parse(jsonString);
            console.log(spotifyCreds);
        } catch(e) {
            console.log('Se debe generar el archivo spotifyCreds.json');
            console.log('Ingrese en consola: node src/generateSpotifyCredentials.js');
        }
    }
}

SpotifyAuth.getToken();