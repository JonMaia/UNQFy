import {App} from './api/server/app';

function main() {
    const app = new App(5000);
    app.setRoutesMonitor();

    app.start();
}

main();