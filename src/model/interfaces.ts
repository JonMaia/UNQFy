export interface ArtistInterface {
    name: string;
    country: string;
}

export interface AlbumInterface {
    artist: string;
    name: string;
    year: Number;
}

export interface TrackInterface {
    name: string;
    duration: number;
    genres: Array<string>;
}
