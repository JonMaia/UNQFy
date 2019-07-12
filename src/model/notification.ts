
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
    
    public existSubscriptor(artistId: number, email: string){
        const getEmails: string[] | undefined = this.subscriptions.get(artistId);
        if(getEmails != undefined){
            return getEmails.includes(email);
        }
    }

    
}