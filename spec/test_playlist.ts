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
    let genres2: Array<string>;
    let track: Track;
    let track2: Track;
    let track3: Track;
    let track4: Track;
    let album: Album;
    let artist: Artist;
    let playlist: Playlist;

    beforeEach(() => {
        unqfy = new UNQfy();
        genres = ['Metal']
        genres2 = ['Metal', 'Rock']
        artist = createArtist(unqfy, 'Iron Maiden', 'Reino Unido');
        album = createAndAddAlbum(unqfy, artist.id, 'The Book of Souls', 2015);
        track = createTrack(unqfy, album.id, 'If Eternity Should Fail', 200, genres2);
        track2 = createTrack(unqfy, album.id, 'The Book of Souls', 200, genres2);
        track3 = createTrack(unqfy, album.id, 'Empire of the Clouds', 200, genres2);
        track4 = createTrack(unqfy, album.id, 'Speed of Light', 200, genres2)
        playlist = createPlaylist(unqfy, 'Metal del bueno', genres, 800);
    });

    it('Creación del playlist', () => {
        assert.equal(playlist.name, 'Metal del bueno');
        assert.equal(playlist.duration(), 800);
        assert.isTrue(playlist.genres === genres);
        assert.isTrue(playlist.hasTrack(track));
        assert.isTrue(playlist.hasTrack(track2));
        assert.isTrue(playlist.hasTrack(track3));
        assert.isTrue(playlist.hasTrack(track4));
    });

    it('Dado un playlist que contiene track2, cuando se elimina se quita de la playlist', () => {
        assert.isTrue(playlist.hasTrack(track));
        unqfy.deleteTrack(track.id);
        assert.isFalse(playlist.hasTrack(track));
    });

});    