const notificationMongoRepository = require("../repositories/notification.repository")
const NotificationService = require("../services/notification.service")

module.exports = function NotificationServiceProvider(){
    return new NotificationService(notificationMongoRepository)
}