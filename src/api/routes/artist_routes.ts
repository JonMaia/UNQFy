import {Router} from 'express';
import {ArtistController} from '../controllers/artist_controller';

const router = Router();

router.route('/artists')
    .get(ArtistController.searchArtist.bind(ArtistController))
    .post(ArtistController.validateData.bind(ArtistController), ArtistController.registerArtist.bind(ArtistController));

router.route('/artists/:id')
    .get(ArtistController.getArtist.bind(ArtistController))
    .patch(ArtistController.validateData.bind(ArtistController), ArtistController.updateArtist.bind(ArtistController))
    .delete(ArtistController.deleteArtist.bind(ArtistController))

router.route('/artists/:id/populate_albums')
    .post(ArtistController.populateAlbumsFromSpotify)

export default router;