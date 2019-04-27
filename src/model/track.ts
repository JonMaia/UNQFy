export class Track {

    public id: number;
    public name: string;
    public duration: number;
    public genres: Array<string>;

    constructor(name: string, duration: number, genres: Array<string>) {
        this.name = name;
        this.duration = duration;
        this.genres = genres;
        this.id = Math.floor(Math.random() * 1000);
    }

    public setID(): void {
        this.id = Math.floor(Math.random() * 1001);
    }

    public getGenres(){
        return this.genres;
    }

    public containsGenre(genres: Array<string>): boolean {
        return this.genres.some(genre => genres.includes(genre));
    }
}