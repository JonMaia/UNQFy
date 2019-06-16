import {Router} from 'express';
import {AlbumController} from '../controllers/album_controller';

const router = Router();

router.route('/albums')
    .post(AlbumController.validateData.bind(AlbumController), AlbumController.registerAlbum.bind(AlbumController));

router.route('/albums/:id')
    .get(AlbumController.getAlbum.bind(AlbumController));

router.route('/albums/:id')
    .put(AlbumController.updateYearInAlbum.bind(AlbumController));

    /*
router.route('/:id')
    .delete(AlbumController.deleteUser)
*/
export default router;