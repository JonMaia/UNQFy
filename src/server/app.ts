import express, {Application} from 'express';
import { Server } from 'http';

export class App {

    private app: Application;
    private server!: Server;

    constructor(private port?: number) {
        this.app = express();
        this.settings();
        this.middlewars();
        this.routes();
    }

    private settings() {
        this.app.set('port', this.port || process.env.PORT || 3000);
    }

    private middlewars() {
        this.app.use(express.json());
    }

    private routes() {
        
    }

    public start(): void {
        const port = this.app.get('port');
        this.server = this.app.listen(port, () => {
            console.log(`Server on port ${port}`);
        });
    }

    shutDown(): void {
        this.server.close(() => {
            console.log(`Server on port ${this.app.get('port')} shutdown`);
        });
    }

    public getApp(): Application {
        return this.app;
    }
}