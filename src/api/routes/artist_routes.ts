import {Router} from 'express';
import {ArtistController} from '../controllers/artist_controller';

const router = Router();

router.route('/artists')
    .post(ArtistController.validateData.bind(ArtistController), ArtistController.registerArtist.bind(ArtistController));

router.route('/artists/:id')
    .get(ArtistController.getArtist.bind(ArtistController));

router.route('/artists/:id')
    .patch(ArtistController.validateData.bind(ArtistController), ArtistController.updateArtist.bind(ArtistController));

router.route('/artists/:id')
    .delete(ArtistController.deleteArtist.bind(ArtistController))

router.route('/artists')
    .get(ArtistController.searchArtist.bind(ArtistController))

export default router;