import {Router} from 'express';
import { LogController } from '../../api_log/log_controller';

const router = Router();

router.route('/log/active')
    .post(LogController.activate.bind(LogController))

router.route('/log/desactive')
    .post(LogController.desactivate.bind(LogController))

router.route('/log/logging')
    .post(LogController.validateData.bind(LogController), LogController.logging.bind(LogController))


export default router;