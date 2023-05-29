const InternalServerError = require('../errors/internal-server-error');
const Service = require('./service');

module.exports = class EspRouterService extends Service {
    constructor(repository) {
        super(repository);
    }

    async create(sectorId, mac) {
        if (!sectorId) {
            throw InternalServerError('EspRouter must have a sectorId');
        }

        if (!mac) {
            throw InternalServerError('EspRouter must have a mac');
        }

        return this.repository.create({ sectorId, mac });
    }
};
