import { App } from '../../src/api/server/app';
import chai, { assert } from 'chai';
import chaiHttp = require('chai-http');
import { MusixMatchService } from '../../src/api_musix_match/musix_match_service';

let app: App;

before(() => {
	chai.use(chaiHttp);
	chai.should();
    app = new App(7000);
    app.start();
});

after(() => {
	app.shutDown();
});

describe('Musix Match Controller', () => {

    it("GET hacia '/api/musix_match/tracks' debe devolver una lista de nombres y id de tracks, según el artista y track pasado", () => {
        return chai.request(app.getApp())
            .get('/api/musix_match/tracks')
            .set('content-type', 'application/json')
            .send({artist: 'El Kuelgue', track: 'En Avenidas'})
            .then(res => {
                let tracks = res.body;
                let tracksExpected = [{id: 35109730, name: 'En Avenidas'}]
                assert.equal(res.status, 200);
                assert.equal(JSON.stringify(tracks), JSON.stringify(tracksExpected))
            }).catch(error => {
                console.log(error);
                assert.isNotOk({id: 35109730, name: 'En Avenidas'}, 'Se produjo un error al buscar los tracks');
            });
    });

    it("GET hacia '/api/musix_match/tracks/lyrics/:id' debe devolver la letra de la canción que se pase, en este caso será 'En Avenidas'", () => {
        return chai.request(app.getApp())
            .get('/api/musix_match/tracks/lyrics/35109730')
            .set('content-type', 'application/json')
            .then(res => {
                let track = res.body
                let lyricsExpected = "Este es el acting que te respeta si quiero\nyo seguiré caminando en topper y joguinetas.\nSi te vienen tratando entre algodones\nuna aspirineta vencida te regala nociones.\n\nY un poco si porque también lo extraño\ny un poco no lo puedo dejar\n\nY un poco sí y un poco no,\ny un poco sí también\nY un poco sí y un poco no,\nen Avenidas\nY un poco sí y un poco no,\ny un poco sí también\nen Avenidas.\n\n...\n\n******* This Lyrics is NOT for Commercial use *******\n(1409618448246)";
                assert.equal(track.lyrics, lyricsExpected);
            })
            .catch(error => {
                console.log(error);
                assert.isNotOk('', 'Se produjo un error al obtener el lyric')
            });
    })
});
