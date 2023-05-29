const SectorSchema = require('../schemas/sector.schema');
const MongoRepository = require('./mongo.repository');

class SectorMongoRepository extends MongoRepository {}

module.exports = new SectorMongoRepository(SectorSchema, 'Sector');
