const maintainerSchema = require('../schemas/maintainer.schema');
const MongoRepository = require('./mongo.repository');

class MaintainerMongoRepository extends MongoRepository {}

module.exports = new MaintainerMongoRepository(maintainerSchema, 'Maintainer');
