import {App} from './api/server/app';

function main() {
    const app = new App(3000);
    app.setRoutesUnqfy();

    app.start();
}

main();