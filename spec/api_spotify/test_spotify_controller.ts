import { App } from '../../src/api/server/app';
import chai, { assert } from 'chai';
import chaiHttp = require('chai-http');

let app: App;

before(() => {
	chai.use(chaiHttp);
	chai.should();
    app = new App(5000);
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
    })
});