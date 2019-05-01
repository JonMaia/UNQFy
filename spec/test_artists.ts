import {assert} from 'chai';
import {UNQfy} from '../src/unqfy';

function createArtist(unqfy: UNQfy, name: string, country: string) {
    return unqfy.addArtist({name: 'El Kuelgue', country: 'Argentina'});
}

function createAndAddAlbum(unqfy: UNQfy, artistId: number, albumName: string, albumYear: number) {
    return unqfy.addAlbum({artistId, name: albumName, year: albumYear });
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


    it('Un artista debe poder ser borrado por su id', () => {
        let artist = createArtist(unqfy, 'El Kuelgue', 'Argentina');

        unqfy.deleteArtist(artist.id);

        assert.isUndefined(unqfy.getArtistById(artist.id));
    });

    it('Al borrar un artista sus albumes deben borrarse también', () => {
        let artist = createArtist(unqfy, 'El Kuelgue', 'Argentina');
        let album = createAndAddAlbum(unqfy, artist.id, 'Ruli', 2013);

        assert.isTrue(unqfy.getAlbumById(album.id) !== undefined);

        unqfy.deleteArtist(artist.id);

        assert.isUndefined(unqfy.getArtistById(artist.id));
        assert.isUndefined(unqfy.getAlbumById(album.id));
    });

    it('Borrar un artista con un id inexistente, debe lanzar una excepción', () => {
        assert.throws(() => { unqfy.deleteArtist(100) }, Error, "No existe un artista con id '100'")
    });
});