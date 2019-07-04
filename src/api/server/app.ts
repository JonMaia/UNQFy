import express, {Application, Request, Response, NextFunction} from 'express';
import { Server } from 'http';
import morgan from 'morgan';

import IndexRoutes from  '../routes/index_route';
import AlbumRoutes from  '../routes/album_routes';
import ArtistRoutes from '../routes/artist_routes';
import TrackRoutes from  '../routes/track_routes';
import SpotifyRoutes from '../routes/spotify_routes';
import MusixMatchRoutes from '../routes/musix_match_routes';
import MonitorRoutes from '../routes/monitor_routes';
import { ResourceNotFoundResponse } from '../error_response/resource_not_found_response';
import { UNQfyController } from '../controllers/unqfy_controller';
import { ErrorRequestHandler } from 'express-serve-static-core';

export class App {

    private app: Application;
    private server!: Server;

    constructor(private port?: number) {
        this.app = express();
        this.settings();
        this.middlewars();
    }

    private settings() {
        this.app.set('port', this.port || process.env.PORT || 3000);
    }

    private middlewars() {
        this.app.use(express.json());
        this.app.use((err: ErrorRequestHandler, req: Request, res: Response, next: NextFunction) => {
            if(err) {
                return UNQfyController.handleError(res, new ResourceNotFoundResponse());
            }
            next();
        })
        if(process.env.NODE_ENV === 'DEV') {
            this.app.use(morgan('dev'));
        }
    }

    public setRoutesUnqfy() {
        this.app.use(IndexRoutes);
        this.app.use('/api', ArtistRoutes);
        this.app.use('/api', AlbumRoutes);
        this.app.use('/api', TrackRoutes);
        if(process.env.NODE_ENV === 'DEV') {
            this.app.use('/api', SpotifyRoutes);
            this.app.use('/api', MusixMatchRoutes);
        }
        this.setControlRutasInexistentes();
    }

    public setRoutesMonitor() {
        this.app.use('/api', MonitorRoutes);
        this.setControlRutasInexistentes();
    }

    private setControlRutasInexistentes() {
        this.app.use((req, res, next) => {
            if(!req.route) {
                UNQfyController.handleError(res, new ResourceNotFoundResponse());
            }
        });
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