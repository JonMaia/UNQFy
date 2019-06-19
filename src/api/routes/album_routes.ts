import {Router} from 'express';
import {AlbumController} from '../controllers/album_controller';

const router = Router();

router.route('/albums')
    .post(AlbumController.validateData.bind(AlbumController), AlbumController.registerAlbum.bind(AlbumController));

router.route('/albums/:id')
    .get(AlbumController.getAlbum.bind(AlbumController));

router.route('/albums/:id')
    .put(AlbumController.updateYearInAlbum.bind(AlbumController));

router.route('/albums/:id')
    .delete(AlbumController.deleteAlbum.bind(AlbumController));

router.route('/albums')
    .get(AlbumController.getAlbumByName.bind(AlbumController));

export default router;