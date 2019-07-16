import { App } from '../../src/api/server/app';
import chai, { assert } from 'chai';
import chaiHttp = require('chai-http');
import { Album } from '../../src/model/album';

let app: App;

before(() => {
	chai.use(chaiHttp);
	chai.should();
    app = new App(8000);
    app.setRoutesUnqfy();
    app.start();
});

after(() => {
	app.shutDown();
});

describe('Notification Controller', () => {

    it("GET hacia '/api/notification' debe devolver un token valido", () => {
        return chai.request(app.getApp())
            .get('/api/notification')
            .set('content-type', 'application/json')
            .then(res => {
                assert.equal(res.status, 200);
                assert.isTrue(res.body.token.includes('Bearer '));
            }).catch(error => {
                console.log(error);
                assert.isNotOk({status: 200, token: 'Bearer [token]'}, 'No se obtuvo el token');
            });
    });

    it("POST hacia '/api/subscribe' debe devolver un artista con un subscriptor", () => {
        return chai.request(app.getApp())
            .post('/api/subscribe')
            .set('content-type', 'application/json')
            .send({artistId: 1, email: 'unqfy@gmail.com'})
            .then(res => {
                let sub = { email: 'unqfy@gmail.com'};
                let subExpect = 
                assert.equal(JSON.stringify(sub, JSON.stringify(subExpect));
            })
            .catch(e => {
                console.log(e);
                assert.isNotOk({status: 200, artistsId: 1, 'Se produjo un error');
            })
    });