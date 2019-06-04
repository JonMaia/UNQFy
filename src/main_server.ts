import {App} from './server/app';

function main() {
    const app = new App(3000);

    app.start();
}

main();