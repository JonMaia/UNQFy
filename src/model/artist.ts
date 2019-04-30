export class Artist {

    public id: number;
    public name: string;
    public country: string;

    constructor(name: string, country: string) {
        this.name = name;
        this.country = country;
        this.id = 0;
    }
}