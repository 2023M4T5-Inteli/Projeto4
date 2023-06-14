const maintainerMongoRepository = require('../repositories/maintainer.repository');
const MaintainerService = require('../services/maintainer.service');

module.exports = function maintainerServiceProvider() {
    return new MaintainerService(maintainerMongoRepository);
};
