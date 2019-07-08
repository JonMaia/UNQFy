import { App } from '../../src/api/server/app';
import chai, { assert } from 'chai';
import chaiHttp = require('chai-http');
import { SlackService } from '../../src/services/slack_service';

before(() => {
	chai.use(chaiHttp);
	chai.should();
});

describe('Slack Api', () => {

    it("Enviar mensaje a un chat de slack", () => {
        const CHANNEL_ARIEL_RAMIREZ: string = 'DHA2Z1Z60';
        let date = new Date();
        let dia = date.getDate();
        let mes = date.getMonth() + 1;
        let hora = date.getHours();
        let minutos = date.getMinutes();
        return new SlackService().sendMessage(CHANNEL_ARIEL_RAMIREZ, `Test de mensaje de slack | ${dia}-${mes} ${hora}:${minutos}`)
                .then((data) => {
                    assert.ok(data, 'Se envío correctamente el mensaje')
                })
                .catch((error: Error) => {
                    assert.isNotOk('Se envío correctamente el mensaje', error.message);
                });
    });

});