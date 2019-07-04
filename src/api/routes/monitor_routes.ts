import {Router} from 'express';
import { MonitorController } from '../../api_monitor/monitor_controller';

const router = Router();

router.route('/monitor/active')
    .post(MonitorController.activate.bind(MonitorController))

router.route('/monitor/desactive')
    .post(MonitorController.desactivate.bind(MonitorController))

router.route('/monitor/status')
    .get(MonitorController.status.bind(MonitorController))

export default router;