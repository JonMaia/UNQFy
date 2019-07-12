import { Router } from "express";
import { GmailController } from "../../api_gmail/gmail_controller";


const router = Router();

router.route('/subscribe')
      .post(GmailController.validateData.bind(GmailController), GmailController.subscribe.bind(GmailController));

router.route('/unsubscribe')
      .post(GmailController.validateData.bind(GmailController), GmailController.unsubscribe.bind(GmailController));

router.route('/notify')
      .post(GmailController.validateData.bind(GmailController), GmailController.notify.bind(GmailController));

router.route('/subscriptions?artistId=:id')
      .get(GmailController.validateData.bind(GmailController), GmailController.subscriptions.bind(GmailController));

router.route('/subscriptions')
      .delete(GmailController.validateData.bind(GmailController), GmailController.deleteSubscriptions.bind(GmailController));

export default router;