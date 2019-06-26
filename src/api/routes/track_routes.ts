import { Router } from 'express';
import { TrackController } from '../controllers/track_controller';

const router = Router();

router.route('/tracks')
        .post(TrackController.addTrack.bind(TrackController))

router.route('/tracks/:id')
        .get(TrackController.getTrackById.bind(TrackController))

router.route('/tracks/:id/lyrics')
        .get(TrackController.getLyricsFromTrack.bind(TrackController))

export default router;