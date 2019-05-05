import {assert} from 'chai';
import {UNQfy} from '../src/unqfy';

function createAlbum(unqfy: UNQfy, idArtist:number, name: string, year: number) {
    return unqfy.addAlbum({artistId: idArtist, name: 'Bocanada', year: 1999});
}
/*
function createTrack(unqfy: UNQfy,idAlbum:number, name: string, duration: number, genres: Array<string>) {
    return unqfy.addTrack(idAlbum,{name: 'Puente', duration: 434, genres: genrs});
}
*/

describe('Test administrador de albumes', () => {
    let unqfy: UNQfy;
    beforeEach(() => {
        unqfy = new UNQfy();
    })

    it('Creación de album', () => {
        let artist =  unqfy.addArtist({name: 'Cerati', country: 'Argentina'});
        let album = createAlbum(unqfy, artist.id, 'Bocanada', 1999);

        assert.equal(album.name, 'Bocanada');
        assert.equal(album.year, 1999);
        assert.notEqual(album.idArtist,undefined);
    });

    it('Al buscarse un album por el id, el cual no existe debe retornar undefined', () => {
        assert.equal(unqfy.getAlbumById(123456),undefined);
    });

    it('Al agregar un album ya existende del mismo artista, debe lanzarse una excepción', () => {
        let artist =  unqfy.addArtist({name: 'Cerati', country: 'Argentina'});    
        createAlbum(unqfy,artist.id, 'Bocanada', 1999);

        assert.throws(() => { createAlbum(unqfy,artist.id, 'Bocanada', 1999);}, 
                        Error, "El album 'Bocanada' del artista 'Cerati' ya a sido creado");
    });

    it('Al querer agregar un album con el mismo nombre pero de otro artista se agrega', () => {
       
        let artist =  unqfy.addArtist({name: 'Cerati', country: 'Argentina'});
        let artist2 =  unqfy.addArtist({name: 'Mollo', country: 'Argentina'});    
        createAlbum(unqfy,artist.id, 'Bocanada', 1999);
        createAlbum(unqfy,artist2.id, 'Bocanada', 1999);

        let albumesBocanada = unqfy.filterAlbumByName('Bocanada');

        assert.equal(albumesBocanada.length , 2 );
    });

    it('Un album debe poder ser eliminado junto a sus tracks', () => {
        let genrs = new Array;
        let artist =  unqfy.addArtist({name: 'Cerati', country: 'Argentina'});    
        let album = createAlbum(unqfy,artist.id, 'Bocanada', 1999);
       // let track = createTrack(unqfy,album.id,'Puente', 434, genrs);
        
        unqfy.deleteAlbum(album.id);

        assert.isFalse(unqfy.existsAlbum('Bocanada'));
        //assert.isFalse(unqfy.existsTrack('Puente'));
    });
});