import { Router } from 'express';
import { TrackController } from '../controllers/track_controller';

const router = Router();

router.route('/tracks/:id')
        .get(TrackController.getTrackById.bind(TrackController))

export default router;