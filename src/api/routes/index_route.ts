import {Router} from 'express';
import {indexWelcome} from '../controllers/index_controllers';

const router = Router();

router.route('/')
    .get(indexWelcome);

export default router;