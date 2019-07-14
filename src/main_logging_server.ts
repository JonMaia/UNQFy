import {App} from './api/server/app';

function main() {
    const app = new App(4000);
    app.setRoutesLog();

    app.start();
}

main();