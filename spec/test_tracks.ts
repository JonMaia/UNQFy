import {assert} from 'chai';
import {UNQfy} from '../src/unqfy';
import { Track } from '../src/model/track';

function createTrack(unqfy: UNQfy, name: string, duration: number, genres: Array<string>) {
    // TODO: cambiar string del album por el objeto
    return unqfy.addTrack('The Book of Souls', {name, duration, genres, });
}

describe('Test administrador de tracks', () => {

    let unqfy: UNQfy;
    let genres: Array<string>;
    let track: Track;

    beforeEach(() => {
        unqfy = new UNQfy();
        genres = ['Rock', 'Metal']
        track = createTrack(unqfy, 'If Eternity Should Fail', 8, genres);
    })

    it('Creación de track', () => {
        assert.equal(track.name, 'If Eternity Should Fail');
        assert.equal(track.duration, 8);
        assert.equal(track.genres, genres);
    });

    it('Un track que contiene el genero Rock', () => {
        let tracks = unqfy.getTracksMatchingGenres(['Rock']);
       
        assert.notEqual(tracks, undefined);
        if(tracks !== undefined){
            assert.equal(tracks[0].id, track.id);
        }
    })
});