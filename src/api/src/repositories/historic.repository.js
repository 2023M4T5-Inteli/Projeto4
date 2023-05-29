const HistoricSchema = require('../schemas/historic.schema');
const MongoRepository = require('./mongo.repository');

class HistoricMongoRepository extends MongoRepository {}

module.exports = new HistoricMongoRepository(HistoricSchema, 'Historic');