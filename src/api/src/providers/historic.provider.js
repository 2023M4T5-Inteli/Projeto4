const historicMongoRepository = require('../repositories/historic.repository');
const historicService = require('../services/historic.service');

module.exports = function historicServiceProvider() {
    return new historicService(historicMongoRepository);
};
