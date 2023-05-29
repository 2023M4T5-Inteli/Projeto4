const maintainerMongoRepository = require('../repositories/maintainer.repository');
const MainteinerService = require('../services/maintainer.service');

module.exports = function mainteinerServiceProvider() {
    return new MainteinerService(maintainerMongoRepository);
};
