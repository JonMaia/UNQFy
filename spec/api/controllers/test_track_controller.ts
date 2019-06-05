import { App } from '../../../src/api/server/app';
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

describe('Track Controller', () => {

    it("GET a '/api/tracks/:id' debe devolver el track con el id pasado por parametro", () => {
        return chai.request(app.getApp())
            .get('/api/tracks/1')
            .set('content-type', 'application/json')
            .then(res => {
                assert.equal(res.status, 200);
                assert.equal(res.body.id, 1);
            }).catch(error => {
                assert.isNotOk({status: 200, id: 1}, 'No se encontro el track ID 1');
            });
    });

    it("GET a '/api/tracks/:id' pasando un id inexistente debe devolver una respuesta con error 404", () => {
        return chai.request(app.getApp())
            .get('/api/tracks/10000')
            .set('content-type', 'application/json')
            .then(res => {
                assert.equal(res.status, 404);
                assert.equal(res.body.status, 404);
                assert.equal(res.body.errorCode, "RESOURCE_NOT_FOUND");

            }).catch(error => {
                assert.isNotOk({status: 404, errorCode: "RESOURCE_NOT_FOUND"}, 'No se obtuvo la respuesta esperada');
            });
    });
});