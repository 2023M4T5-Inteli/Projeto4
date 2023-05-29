const sectorMongoRepository = require('../repositories/sector.repository');
const SectorService = require('../services/sector.service');

module.exports = function sectorServiceProvider() {
    return new SectorService(sectorMongoRepository);
};
