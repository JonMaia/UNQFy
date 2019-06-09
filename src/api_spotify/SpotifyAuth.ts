import fs from "fs";
import path from 'path';
import { auth } from './generateSpotifyCredentials';

export class SpotifyAuth {

    public static authenticate() {
        auth();
    }

    public static getToken(): string | undefined {
        let jsonPath = path.join(__dirname, '..', '..', 'spotifyCreds.json');
        try {
            let jsonString = fs.readFileSync(jsonPath, 'utf8');
            const spotifyCreds = JSON.parse(jsonString);
            let elapsedTime = this.elapsedTimeInMinutesSinceTheTokenWasObtained(spotifyCreds.date_token);
            if(elapsedTime > 60) {
                throw new Error('Token invalido');
            }
            return `${spotifyCreds.token_type} ${spotifyCreds.access_token}`
        } catch(e) {
            console.log("Se debe generar el archivo spotifyCreds.json");
            console.log("Ingrese en consola: 'npm run auth_spotify'");
        }
    }

    private static elapsedTimeInMinutesSinceTheTokenWasObtained(dateTimeToken: number) {
        let date1 = dateTimeToken;
        let date2 = new Date();
        let res = Math.abs(date1 - date2.getTime()) / 1000;
        let hours = Math.floor(res / 3600) % 24
        let minutes = Math.floor(res / 60) % 60;
        return hours * 60 + minutes;
    }
}
