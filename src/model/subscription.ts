export class Subscription {
    
    public artistId: number;
    public emails: Array<string>

    constructor(artistId: number) {
        this.artistId = artistId;
        this.emails = new Array();
    }

    public addEmail(email: string): void {
        if(!this.hasEmail(email)) {
            this.emails.push(email);
        }
    }

    private hasEmail(searchedEmail: string): boolean {
        return this.emails.some(email => email === searchedEmail);
    }

    public removeEmail(emailToRemove: string): void {
        let indexEmail = this.emails.indexOf(emailToRemove);
        if(indexEmail !== -1) {
            this.emails.splice(indexEmail, 1);
        }
    }

    public removeAllEmails(): void {
        this.emails = new Array();
    }
}