import { Router } from 'express';
import { SpotifyController } from '../../api_spotify/SpotifyController';

const router = Router();

router.route('/spotify')
        .get(SpotifyController.getToken)

router.route('/spotify/artists/')
        .get(SpotifyController.findArtistByName.bind(SpotifyController))

export default router;