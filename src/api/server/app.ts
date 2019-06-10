import express, {Application} from 'express';
import { Server } from 'http';

import IndexRoutes from  '../routes/index_route';
import AlbumRoutes from  '../routes/album_routes';
import ArtistRoutes from '../routes/artist_routes';
import TrackRoutes from  '../routes/track_routes';
import SpotifyRoutes from '../routes/spotify_routes';

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
        this.app.use(IndexRoutes);
        this.app.use('/api', ArtistRoutes);
        this.app.use('/api', AlbumRoutes);
        this.app.use('/api', TrackRoutes);
        this.app.use('/api', SpotifyRoutes)
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