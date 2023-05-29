const EspSchema = require('../schemas/esp.schema');
const MongoRepository = require('./mongo.repository');

class EspMongoRepository extends MongoRepository {}

module.exports = new EspMongoRepository(EspSchema, 'Esp');
