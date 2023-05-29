const EspRouterSchema = require('../schemas/esp-router.schema');
const MongoRepository = require('./mongo.repository');

class EspRouterMongoRepository extends MongoRepository {}

module.exports = new EspRouterMongoRepository(EspRouterSchema, 'EspRouter');
