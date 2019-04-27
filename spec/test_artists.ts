import {assert} from 'chai';
import {UNQfy} from '../src/unqfy';

function createArtist(unqfy: UNQfy, name: string, country: string) {
    return unqfy.addArtist({name: 'El Kuelgue', country: 'Argentina'});
}

describe('Test administrador de artistas', () => {

    let unqfy: UNQfy;

    beforeEach(() => {
        unqfy = new UNQfy();
    })

    it('Creación de artista', () => {
        let artist = createArtist(unqfy, 'El Kuelgue', 'Argentina');

        assert.equal(artist.name, 'El Kuelgue');
        assert.equal(artist.country, 'Argentina');
    });


    it('Al crear un artista con un nombre ya existente, debe lanzarse una excepción', () => {
        createArtist(unqfy, 'El Kuelgue', 'Argentina');

        assert.throws(() => { createArtist(unqfy, 'El Kuelgue', 'Argentina');}, Error, "Ya existe el artista 'El Kuelgue'");
    });


    it('Un artista debe poder ser eliminado por su nombre', () => {
        let artist = createArtist(unqfy, 'El Kuelgue', 'Argentina');

        unqfy.deleteArtist(artist.id);

        assert.isFalse(unqfy.existsArtist('El Kuelgue'));
    });

});