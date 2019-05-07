import {assert} from 'chai';
import {UNQfy} from '../src/unqfy';
import { Track } from '../src/model/track';
import { Album } from '../src/model/album';
import { Artist } from '../src/model/artist';

function createTrack(unqfy: UNQfy,album: number, name: string, duration: number, genres: Array<string>) {

    return unqfy.addTrack(album, {name, duration, genres});
}

function createAndAddAlbum(unqfy: UNQfy, artistId: number, albumName: string, albumYear: number) {

    return unqfy.addAlbum({artistId, name: albumName, year: albumYear });   
}

function createArtist(unqfy: UNQfy, name: string, country: string) {
    return unqfy.addArtist({name, country});
}

describe('Test administrador de tracks', () => {

    let unqfy: UNQfy;
    let genres: Array<string>;
    let track: Track;
    let album: Album;
    let artist: Artist;

    beforeEach(() => {
        unqfy = new UNQfy();
        genres = ['Metal']
        artist = createArtist(unqfy, 'Iron Maiden', 'Reino Unido');
        album = createAndAddAlbum(unqfy, artist.id, 'The Book of Souls', 2015);
        track = createTrack(unqfy, album.id, 'If Eternity Should Fail', 8, genres);
    })

    it('Creación de track', () => {
        assert.equal(track.name, 'If Eternity Should Fail');
        assert.equal(track.duration, 8);
        assert.equal(track.genres, genres);
    });

    it('Un track que contiene el genero Metal', () => {
        let tracks = unqfy.getTracksMatchingGenres(['Metal']);
        tracks.push(track);
        assert.notEqual(tracks, undefined);
        if(tracks !== undefined){
            assert.equal(tracks[0].id, track.id);
        }
    })
});