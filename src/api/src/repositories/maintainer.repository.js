const MaintenerSchema = require('../schemas/maintainer.schema');
const MongoRepository = require('./mongo.repository');

class MaintenerMongoRepository extends MongoRepository {}

module.exports = new MaintenerMongoRepository(MaintenerSchema, 'Maintener');
