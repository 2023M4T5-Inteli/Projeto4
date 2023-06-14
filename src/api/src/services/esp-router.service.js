const InternalServerError = require('../errors/internal-server-error');
const Service = require('./service');

module.exports = class EspRouterService extends Service {
    constructor(repository) {
        super(repository);
    }

    async create(sectorId, mac, name) {
        if (!mac) {
            throw new InternalServerError('EspRouter must have a mac');
        }

        return await this.repository.create({ sector: sectorId, mac, name });
    }

    async findById(id) {
        return await this.find({ _id: id });
    }

    async findByMac(mac) {
        return await this.find({ mac });
    }
};
