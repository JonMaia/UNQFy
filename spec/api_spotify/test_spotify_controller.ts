import { App } from '../../src/api/server/app';
import chai, { assert } from 'chai';
import chaiHttp = require('chai-http');
import { Album } from '../../src/model/album';

let app: App;

before(() => {
	chai.use(chaiHttp);
	chai.should();
    app = new App(5000);
    app.setRoutesUnqfy();
    app.start();
});

after(() => {
	app.shutDown();
});

describe('Spotify Controller', () => {

    it("GET hacia '/api/spotify' debe devolver un token valido", () => {
        return chai.request(app.getApp())
            .get('/api/spotify')
            .set('content-type', 'application/json')
            .then(res => {
                assert.equal(res.status, 200);
                assert.isTrue(res.body.token.includes('Bearer '));
            }).catch(error => {
                console.log(error);
                assert.isNotOk({status: 200, token: 'Bearer [token]'}, 'No se obtuvo el token');
            });
    });

    it("GET hacia '/api/spotify/artists' debe devolver los artistas que matchean con el nombre pasado junto con su id", () => {
        return chai.request(app.getApp())
            .get('/api/spotify/artists')
            .set('content-type', 'application/json')
            .send({artist: 'El Kuelgue'})
            .then(res => {
                let artists = res.body;
                let artistExpected = [{artist: 'El Kuelgue', id: '6jRUKVZllu1wtgXHbqvUmT'}];
                assert.equal(JSON.stringify(artists), JSON.stringify(artistExpected));
            })
            .catch(e => {
                console.log(e);
                assert.isNotOk({status: 200, artists: [{name: 'El Kuelgue', id: ''}]}, 'Se produjo un error');
            })
    });

    it("GET hacia '/api/spotify/albums/:id' debe devolver todos los albumes de un artista, en este caso del artista 'El Kuelgue'", () => {
        return chai.request(app.getApp())
            .get('/api/spotify/albums/6jRUKVZllu1wtgXHbqvUmT')
            .set('content-type', 'application/json')
            .then(res => {
                let albums = res.body;
                let albumsExpected = [
                    new Album(0, 'Cariño Reptil', 2015), new Album(0, 'Ruli', 2013), new Album(0, 'Beatriz', 2012)
                ];
                assert.equal(JSON.stringify(albums), JSON.stringify(albumsExpected));
            })
            .catch(e => {
                console.log(e);
                assert.isNotOk({}, 'Se produjo un error al obtener los albumes')
            })
    });

    it("GET hacia '/api/spotify/albums/:id' con un id no existente, debe devolver un error 400", () => {
        return chai.request(app.getApp())
            .get('/api/spotify/albums/invalid_id')
            .set('content-type', 'application/json')
            .then(res => {
                let error = res.body;
                assert.equal(res.status, 400);
                assert.equal(error.status, 400);
            })
            .catch(e => {
                assert.isNotOk({}, 'Se esperaba un error 400');
            })
    });
});