const Service = require('./service');
const InternalServerError = require('../errors/internal-server-error');

module.exports = class MaintainerService extends Service {
    constructor(repository) {
        super(repository);
    }

    async create(name, rfid, sectorId) {
        if (!rfid) {
            throw new InternalServerError('Maintainer must have a rfid');
        }

        return await this.repository.create({
            name,
            rfid,
            sector: sectorId,
        });
    }

    async findByRfid(rfid) {
        return await this.find({ rfid });
    }
};
