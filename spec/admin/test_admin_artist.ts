const {assert} = require('chai');
import AdminArtist from '../../src/admin/admin_artist';

describe('Test administrador de artistas', () => {

    let adminArtist = new AdminArtist();

    beforeEach(() => {
        adminArtist = new AdminArtist();
    })

    it('Creación de artista', () => {
        let artist = adminArtist.createArtist('El Kuelgue', 'Argentina');

        assert.equal(artist.name, 'El Kuelgue');
        assert.equal(artist.country, 'Argentina');
    });

    it('Al crear un artista con un nombre ya existente, debe lanzarse una excepción', () => {
        adminArtist.createArtist('El Kuelgue', 'Argentina');

        assert.throws(() => {adminArtist.createArtist('El Kuelgue', 'Argentina');}, Error, "Ya existe un artista con el nombre 'El Kuelgue'");
    });
});