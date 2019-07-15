const picklify = require('picklify');
import fs from 'fs';

export class Notification {
    
    private id: number;
    private subscriptions: Map<number, string[]>;

    constructor() {
        this.id = 0;
        this.subscriptions = new Map<number, []>();
    }

    public addSubscriptor(artistId: number, email: string){
        const getEmails: string[] | undefined = this.subscriptions.get(artistId);
        if(getEmails != undefined){
            getEmails.push(email);
            this.subscriptions.set(artistId, getEmails);
        }
    }   
    
   /* public existSubscriptor(artistId: number, email: string){
        const getEmails: string[] | undefined = this.subscriptions.get(artistId);
        if(getEmails != undefined){
            return getEmails.includes(email);
        }
    }*/

    public unsubscribe(artistId: number, email: string){
        let getEmails: string [] | undefined = this.subscriptions.get(artistId);
        if(getEmails != undefined){
            getEmails.filter(e => e == email);
            this.subscriptions.set(artistId, getEmails);
        }
    }

    public save(filename: string) {
        const serializedData = picklify.picklify(this);
        fs.writeFileSync(filename, JSON.stringify(serializedData, null, 2));
    }

    public static load(filename: string) {
        const serializedData = fs.readFileSync(filename, {encoding: 'utf-8'});
        const classes = [Notification];
        return picklify.unpicklify(JSON.parse(serializedData), classes);
    }

}