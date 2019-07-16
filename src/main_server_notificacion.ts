import {App} from './api/server/app';

function main() {
    const app = new App(8000);
    app.setRoutesNotificacion();

    app.start();
}

main();