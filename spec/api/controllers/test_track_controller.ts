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
    app = new App(5001);
    app.setRoutesUnqfy();
    app.start();

    unqfy.addArtist({name: 'El Kuelgue', country: 'Argentina'});
    unqfy.addAlbum({artistId: 1, name: 'Ruli', year: 2013});
});

after(() => {
	app.shutDown();
});

describe('Track Controller', () => {

    it('Init singleton Unqfy', () => {
        // Inicializo aca la instancia de unqfy porque si lo hago en el before es pisada
        // por otros test que en su before harán lo mismo, ya que es un singleton
        UNQfyController.getInstance().setUnqfy(unqfy);
    })

    it("POST a '/api/tracks/' debe crear un track con los datos pasados por el body", () => {
        return chai.request(app.getApp())
            .post('/api/tracks')
            .set('content-type', 'application/json')
            .send({idAlbum: 1, name: 'En Avenidas', duration: 180, genres: []})
            .then(res => {
                assert.equal(res.status, 201);
                assert.equal(res.body.id, 1);
                assert.equal(res.body.name, 'En Avenidas');
            }).catch(error => {
                console.log(error);
                assert.isNotOk({status: 201}, 'No se creo el track');
            });
    });

    it("POST a '/api/tracks/' debe devolver un error cuando se le pasa un idAlbum inexistente", () => {
        return chai.request(app.getApp())
            .post('/api/tracks')
            .set('content-type', 'application/json')
            .send({idAlbum: 9999, name: 'En Avenidas', duration: 180, genres: []})
            .then(res => {
                assert.equal(res.status, 404);
                assert.equal(res.body.status, 404);
                assert.equal(res.body.errorCode, "RELATED_RESOURCE_NOT_FOUND");
            }).catch(error => {
                console.log(error);
                assert.isNotOk({status: 404}, 'Album encontrado');
            });
    });

    it("POST a '/api/tracks/' debe devolver un error cuando se quiere crear un track con un nombre ya existente en el mismo album", () => {
        return chai.request(app.getApp())
            .post('/api/tracks')
            .set('content-type', 'application/json')
            .send({idAlbum: 1, name: 'En Avenidas', duration: 180, genres: []})
            .then(res => {
                assert.equal(res.status, 409);
                assert.equal(res.body.status, 409);
                assert.equal(res.body.errorCode, "RESOURCE_ALREADY_EXISTS");
            }).catch(error => {
                console.log(error);
                assert.isNotOk({status: 404}, 'Album encontrado');
            });
    });

    it("GET a '/api/tracks/:id' debe devolver el track con el id pasado por parametro", () => {
        return chai.request(app.getApp())
            .get('/api/tracks/1')
            .set('content-type', 'application/json')
            .then(res => {
                assert.equal(res.status, 200);
                assert.equal(res.body.id, 1);
                assert.equal(res.body.name, 'En Avenidas');
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

    it("GET a '/api/tracks/:id/lyrics' debe devolver un json que contenga el nombre y la letra del track", () => {
        return chai.request(app.getApp())
            .get('/api/tracks/1/lyrics')
            .set('content-type', 'application/json')
            .then(res => {
                assert.equal(res.status, 200);
                // Estamos usando los datos de test de datos.sh
                assert.equal(res.body.name, 'En Avenidas');
                assert.equal(res.body.lyrics, 'Este es el acting que te respeta si quiero\nyo seguiré caminando en topper y joguinetas.\nSi te vienen tratando entre algodones\nuna aspirineta vencida te regala nociones.\n\nY un poco si porque también lo extraño\ny un poco no lo puedo dejar\n\nY un poco sí y un poco no,\ny un poco sí también\nY un poco sí y un poco no,\nen Avenidas\nY un poco sí y un poco no,\ny un poco sí también\nen Avenidas.\n\n...\n\n******* This Lyrics is NOT for Commercial use *******\n(1409618448246)');
            })
            .catch(error => {
                console.log(error);
                assert.isNotOk({status: 200}, 'No se obtuvo los lyrics del tema');
            })
    });
});