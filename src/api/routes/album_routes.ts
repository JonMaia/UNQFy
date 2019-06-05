import {Router} from 'express';
import {AlbumController} from '../controllers/album_controller';

const router = Router();
/*
router.route('/albums')
    .post(AlbumController.validateData, AlbumController.registerAlbum);
*/
router.route('/albums/:id')
    .get(AlbumController.getAlbum);
/*
router.route('/:id')
    .delete(AlbumController.deleteUser)
*/
export default router;