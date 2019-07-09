import rp from 'request-promise';
import { Observer } from "./observer";

export class LoggingObserver implements Observer{

    public log(mensagge:string, level: string): void{
        let options = {
            body: {
                "message": mensagge,
                "level": level     
            },
            uri: `http://localhost:3000/api/log/logging`,
            method: 'POST',
            json: true
        }
            rp(options)    
    }

}
