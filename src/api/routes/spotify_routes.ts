import { Router } from 'express';
import { SpotifyController } from '../../api_spotify/spotify_controller';

const router = Router();

router.route('/spotify')
        .get(SpotifyController.getToken.bind(SpotifyController))

router.route('/spotify/artists/')
        .get(SpotifyController.findArtistsByName.bind(SpotifyController))

router.route('/spotify/albums/:id')
        .get(SpotifyController.findAlbumsFromArtist.bind(SpotifyController))

export default router;