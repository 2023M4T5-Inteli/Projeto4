const espRouterMongoRepository = require('../repositories/esp-router.repository');
const EspRouterService = require('../services/esp-router.service');

module.exports = function espRouterServiceProvider() {
    return new EspRouterService(espRouterMongoRepository);
};
