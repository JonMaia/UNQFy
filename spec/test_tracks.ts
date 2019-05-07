import {assert} from 'chai';
import {UNQfy} from '../src/unqfy';
import { Track } from '../src/model/track';
import { Album } from '../src/model/album';
import { Artist } from '../src/model/artist';
import { Playlist } from '../src/model/playlist';

function createTrack(unqfy: UNQfy,album: number, name: string, duration: number, genres: Array<string>) {

    return unqfy.addTrack(album, {name, duration, genres});
}

function createAndAddAlbum(unqfy: UNQfy, artistId: number, albumName: string, albumYear: number) {

    return unqfy.addAlbum({artistId, name: albumName, year: albumYear });   
}

function createArtist(unqfy: UNQfy, name: string, country: string) {
    return unqfy.addArtist({name, country});
}

function createPlaylist(unqfy: UNQfy, name: string, genres: Array<string>, duration: number){
    return unqfy.createPlaylist(name, genres, duration);
}

describe('Test administrador de tracks', () => {

    let unqfy: UNQfy;
    let genres: Array<string>;
    let track: Track;
    let album: Album;
    let artist: Artist;
    let playlist: Playlist;

    beforeEach(() => {
        unqfy = new UNQfy();
        genres = ['Metal']
        artist = createArtist(unqfy, 'Iron Maiden', 'Reino Unido');
        album = createAndAddAlbum(unqfy, artist.id, 'The Book of Souls', 2015);
        track = createTrack(unqfy, album.id, 'If Eternity Should Fail', 200, genres);
        playlist = createPlaylist(unqfy, 'Metal del bueno', ['Metal'], 400);
    })

    it('Creación de track', () => {
        assert.equal(track.name, 'If Eternity Should Fail');
        assert.equal(track.duration, 200);
        assert.equal(track.genres, genres);
    });

    it('Un track que contiene el genero Metal', () => {
        let tracks = unqfy.getTracksMatchingGenres(['Metal']);
        tracks.push(track);
        assert.notEqual(tracks, undefined);
        if(tracks !== undefined){
            assert.equal(tracks[0].id, track.id);
        }
    });

    it('Al eliminar un track tambien se borra del playlist', () => {
        assert.isTrue(unqfy.existsTrack(track.id));
        assert.isTrue(playlist.hasTrack(track));
        unqfy.deleteTrack(track.id);
        assert.isFalse(unqfy.existsTrack(track.id));
        assert.isFalse(playlist.hasTrack(track));
    });

    it('Al eliminar un track tambien se borra del album', () => {
        assert.isTrue(unqfy.existsTrack(track.id));
        assert.isTrue(album.hasTrack(track.name));
        unqfy.deleteTrack(track.id);
        assert.isFalse(unqfy.existsTrack(track.id));
        assert.isFalse(album.hasTrack(track.name));
    });
});