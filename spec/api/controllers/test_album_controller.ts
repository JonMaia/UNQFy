import { App } from '../../../src/api/server/app';
import chai, { assert } from 'chai';
import chaiHttp = require('chai-http');
import { UNQfyController } from '../../../src/api/controllers/unqfy_controller';
import { UNQfy } from '../../../src/unqfy';

let app: App;
let unqfy: UNQfy = new UNQfy();

before(() => {
	chai.use(chaiHttp);
	chai.should();
    app = new App(5005);
    app.setRoutesUnqfy();
    app.start();

    unqfy.addArtist({name: 'Iron Maiden', country: 'Inglaterra'});
    unqfy.addAlbum({artistId: 1, name: 'The Book of Souls', year: 2018});
});

after(() => {
	app.shutDown();
});

describe('Album Controller', () => {

    it('Init singleton Unqfy', () => {
        // Inicializo aca la instancia de unqfy porque si lo hago en el before es pisada
        // por otros test que en su before harán lo mismo, ya que es un singleton
        UNQfyController.getInstance().setUnqfy(unqfy);
    })


    it("GET a '/api/albums/:id' debe devolver el album con el id pasado por parametro", () => {
        return chai.request(app.getApp())
            .get('/api/albums/1')
            .set('content-type', 'application/json')
            .then(res => {
                assert.equal(res.status, 200);
                //assert.equal(res.body.id, 1);
                assert.equal(res.body.name, 'The Book of Souls');
                assert.equal(res.body.year, 2018);
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

    it("POST a '/api/albums' debe agregar el album pasado en el body", () => {
        return chai.request(app.getApp())
            .post('/api/albums') 
            .set('content-type', 'application/json')
            .send({artistId: 1, name: 'Brave New World', year: 2000})
            .then( res => {
                assert.equal(res.status, 201);
                //assert.equal(res.body.id, 2);
                assert.equal(res.body.name, 'Brave New World');
                assert.equal(res.body.year, 2000);
            })
            .catch( error => {
                console.log(error);
                assert.isNotOk({status: 201}, 'No se agrego el album');
            })
    });
});