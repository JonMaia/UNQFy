import { App } from '../../../src/api/server/app';
import chai, { assert } from 'chai';
import chaiHttp = require('chai-http');
import { UNQfy } from '../../../src/unqfy';
import { UNQfyController } from '../../../src/api/controllers/unqfy_controller';
import { Album } from '../../../src/model/album';

let app: App;

before(() => {
	chai.use(chaiHttp);
	chai.should();
    app = new App(5003);
    app.start();

});

after(() => {
	app.shutDown();
});

describe('Artist Controller', () => {

    it('Init singleton Unqfy', () => {
        // Inicializo aca la instancia de unqfy porque si lo hago en el before es pisada
        // por otros test que en su before harán lo mismo, ya que es un singleton
        UNQfyController.getInstance().setUnqfy(new UNQfy());
    })

    it("POST a '/api/artists/' debe crear un artista", () => {
        return chai.request(app.getApp())
            .post('/api/artists/')
            .set('content-type', 'application/json')
            .send({name: "El Kuelgue", country: "Argentina"})
            .then(res => {
                assert.equal(res.status, 201)
                assert.equal(res.body.id, 1);
                assert.equal(res.body.name, 'El Kuelgue');
            })
            .catch(error => {
                console.log(error);
                assert.isNotOk({status: 201}, 'No se agrego el artist');
            })
    });

    it("POST a '/api/artists/1/populate_albums' debe buscar y agregar todos los albumes del artista de spotify", () => {
        return chai.request(app.getApp())
            .post('/api/artists/1/populate_albums')
            .set('content-type', 'application/json')
            .then(res => {
                let albums = res.body;
                let albumsExpected = [
                    new Album(0, 'Cariño Reptil', 2015), new Album(0, 'Ruli', 2013), new Album(0, 'Beatriz', 2012)
                ];
                assert.equal(JSON.stringify(albums), JSON.stringify(albumsExpected.map(album => album.toJson())));
            })
            .catch(error => {
                console.log(error);
                assert.isNotOk({status: 201}, 'No se agregaron los albumes al artista');
            })
    });
});
