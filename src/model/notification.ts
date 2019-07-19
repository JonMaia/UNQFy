const picklify = require('picklify');
import fs from 'fs';
import { Subscription } from './subscription';

export class Notification {
    
    private subscriptions: Array<Subscription>;

    constructor() {
        this.subscriptions = new Array();
    }

    public addSubscriptor(artistId: number, email: string): void {
        let subscription: Subscription | undefined = this.findSubscription(artistId);
        if(!subscription) {
            subscription = new Subscription(artistId);
            this.subscriptions.push(subscription);
        }
        subscription.addEmail(email);
    }

    public findSubscription(artistId: number): Subscription | undefined {
        return this.subscriptions.find(subscription => subscription.artistId === artistId);
    }

    public unsubscribe(artistId: number, email: string){
        let subscription: Subscription | undefined = this.findSubscription(artistId);
        if(subscription) {
            subscription.removeEmail(email);
        }
    }

    public subscriptors(artistId: number) {
        let emails: Array<string> = new Array();
        let subscription = this.findSubscription(artistId);
        if(subscription) {
            emails = subscription.emails;
        }
        return { artistId, subscriptors: emails };
    }

    public deleteSubscriptors(artistId: number) {
        let subscription: Subscription | undefined = this.findSubscription(artistId);
        if(subscription) {
            subscription.removeAllEmails();
        }
    }

    public save(filename: string) {
        const serializedData = picklify.picklify(this);
        fs.writeFileSync(filename, JSON.stringify(serializedData, null, 2));
    }

    public static load(filename: string) {
        const serializedData = fs.readFileSync(filename, {encoding: 'utf-8'});
        const classes = [Notification, Subscription];
        return picklify.unpicklify(JSON.parse(serializedData), classes);
    }

}