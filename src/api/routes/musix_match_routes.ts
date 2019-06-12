import { Router } from 'express';
import { MusixMatchController } from '../../api_musix_match/musix_match_controller';

const router = Router();

router.route('/musix_match/tracks')
        .get(MusixMatchController.findTracks.bind(MusixMatchController));

router.route('/musix_match/tracks/lyrics/:id')
        .get(MusixMatchController.findLyricsByTrack.bind(MusixMatchController));

export default router;