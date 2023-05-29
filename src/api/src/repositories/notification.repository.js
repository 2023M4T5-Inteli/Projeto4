const NotificationSchema = require("../schemas/notification.schema"); //importando a schema de notificação
const MongoRepository = require('./mongo.repository');

class NotificationMongoRepository extends MongoRepository{} //isso extende tudo que tem na classe MongoRepository para NotificationMongoRepository

module.exports = new NotificationMongoRepository(NotificationSchema,"notification")