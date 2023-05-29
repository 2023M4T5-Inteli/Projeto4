const { Router } = require('express');
const NotificationController = require("../controllers/notification.controller");
const createNotificationValidation = require('../validations/notification/create-notification.validation');
const updateNotificationValidation = require('../validations/notification/update-notification.validation');

const router = Router();

router.get('/', NotificationController.list);
router.get('/:id', NotificationController.find);
router.post('/', ...createNotificationValidation, NotificationController.create);
router.put('/:id', ...updateNotificationValidation, NotificationController.update);
router.delete('/:id', NotificationController.delete);

module.exports = router;