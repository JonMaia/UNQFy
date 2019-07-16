import { Router } from "express";
import { NotificationController } from "../../api_gmail/notification_controller";

const router = Router();

router.route('/notification')
      .get(NotificationController.getToken.bind(NotificationController))

router.route('/notification/subscribe')
      .post(NotificationController.validateData.bind(NotificationController), NotificationController.subscribe.bind(NotificationController));

router.route('/notification/unsubscribe')
      .post(NotificationController.validateData.bind(NotificationController), NotificationController.unsubscribe.bind(NotificationController));

router.route('/notification/notify')
      .post(NotificationController.validateData.bind(NotificationController), NotificationController.notify.bind(NotificationController));

router.route('/notification/subscriptions?artistId=:id')
      .get(NotificationController.validateData.bind(NotificationController), NotificationController.subscriptions.bind(NotificationController));

router.route('/notification/subscriptions')
      .delete(NotificationController.validateData.bind(NotificationController), NotificationController.deleteSubscriptions.bind(NotificationController));

export default router;