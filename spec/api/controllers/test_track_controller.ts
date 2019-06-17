import { App } from '../../../src/api/server/app';
import chai, { assert } from 'chai';
import chaiHttp = require('chai-http');

let app: App;

before(() => {
	chai.use(chaiHttp);
	chai.should();
    app = new App(5001);
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

    it("GET a '/api/tracks/:id/lyrics' debe devolver un json que contenga el nombre y la letra del track", () => {
        return chai.request(app.getApp())
            .get('/api/tracks/9/lyrics')
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