const espMongoRepository = require('../repositories/esp.repository');
const EspService = require('../services/esp.service');

module.exports = function espServiceProvider() {
    return new EspService(espMongoRepository);
};
