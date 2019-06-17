export class TrackMusixMatch {
    public id: number;
    public name: string;
    public lyrics: string;

    constructor(id: number, name: string, lyrics?: string) {
        this.id = id;
        this.name = name;
        this.lyrics = lyrics || '';
    }

    public toJson() {
        return {
            name: this.name,
            lyrics: this.lyrics
        }
    }
}