import { Router } from "express";
import { NotificationController } from "../../api_gmail/notification_controller";

const router = Router();

router.route('/subscribe')
      .post(NotificationController.validateData.bind(NotificationController), NotificationController.subscribe.bind(NotificationController));

router.route('/unsubscribe')
      .post(NotificationController.validateData.bind(NotificationController), NotificationController.unsubscribe.bind(NotificationController));

router.route('/notify')
      .post(NotificationController.validateData.bind(NotificationController), NotificationController.notify.bind(NotificationController));

router.route('/subscriptions?artistId=:id')
      .get(NotificationController.validateData.bind(NotificationController), NotificationController.subscriptions.bind(NotificationController));

router.route('/subscriptions')
      .delete(NotificationController.validateData.bind(NotificationController), NotificationController.deleteSubscriptions.bind(NotificationController));

export default router;