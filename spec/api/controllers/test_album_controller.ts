import { App } from '../../../src/api/server/app';
import chai, { assert } from 'chai';
import chaiHttp = require('chai-http');

let app: App;

before(() => {
	chai.use(chaiHttp);
	chai.should();
    app = new App(5002);
    app.start();
});

after(() => {
	app.shutDown();
});

describe('Album Controller', () => {

    it("GET a '/api/albums/:id' debe devolver el album con el id pasado por parametro", () => {
        return chai.request(app.getApp())
            .get('/api/albums/1')
            .set('content-type', 'application/json')
            .then(res => {
                assert.equal(res.status, 200);
                assert.equal(res.body.id, 1);
            }).catch(error => {
                assert.isNotOk({status: 200, id: 1}, 'No se encontro el album ID 1');
            });
    });

    it("GET a '/api/albums/:id' pasando un id inexistente debe devolver una respuesta con error 404", () => {
        return chai.request(app.getApp())
            .get('/api/albums/10000')
            .set('content-type', 'application/json')
            .then(res => {
                assert.equal(res.status, 404);
                assert.equal(res.body.status, 404);
                assert.equal(res.body.errorCode, "RESOURCE_NOT_FOUND");

            }).catch(error => {
                assert.isNotOk({status: 404, errorCode: "RESOURCE_NOT_FOUND"}, 'No se obtuvo la respuesta esperada');
            });
    });

    it("GET a '/api/albums/:id' debe devolver un json que contenga el id, nombre y anio del album", () => {
        return chai.request(app.getApp())
            .get('/api/albums/1')
            .set('content-type', 'application/json')
            .then(res => {
                assert.equal(res.status, 200);
                assert.equal(res.body.id, 1);
                assert.equal(res.body.name, 'Favourite Worst Nightmare');
                assert.equal(res.body.year, 2007);
            })
            .catch(error => {
                console.log(error);
                assert.isNotOk({status: 200}, 'No se obtuvo el album');
            })
    });

    it("POST a '/api/albums' debe agregar el album pasado en el body", () => {
        return chai.request(app.getApp())
            .post('api/albums')
            .set('content-type', 'application/json')
            .send({name: 'The Book of Souls', year: 2018})
            .then(res => {
                let album = res.body;
                let albumExpected = [{name: 'The Book of Souls', year: 2018}];
                assert.equal(JSON.stringify(album), JSON.stringify(albumExpected));
            })
            .catch(error => {
                console.log(error);
                assert.isNotOk({status: 201}, 'No se agrego el album');
            })
    });
});