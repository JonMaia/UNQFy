export class Track {

    public id: number = 0;
    public name: string;
    public duration: number;
    public genres: Array<string>;
    public album: number;

    constructor(name: string, duration: number, genres: Array<string>, albumId: number) {
        this.name = name;
        this.duration = duration;
        this.genres = genres;
        this.album = albumId;
    }

    public getGenres(){
        return this.genres;
    }

    public containsGenre(genres: Array<string>): boolean {
        return this.genres.some(genre => genres.includes(genre));
    }
}