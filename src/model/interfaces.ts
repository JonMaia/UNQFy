export interface ArtistInterface {
    name: string;
    country: string;
}

export interface AlbumInterface {
    artistId: number;
    name: string;
    year: number;
}

export interface TrackInterface {
    name: string;
    duration: number;
    genres: Array<string>;
}

export interface LogInterface {
    message: string;
    level: string;
}