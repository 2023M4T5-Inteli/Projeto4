const Service = require('./service');

module.exports = class MaintenerService extends Service {
    constructor(repository) {
        super(repository);
    }

    async create(name, rfid, sector) {
        if (!name) {
            throw new InternalServerError('Maintener must have a name');
        }

        if (!rfid) {
            throw new InternalServerError('Maintener must have a rfid');
        }

        if (!sector) {
            throw new InternalServerError('Maintener must have a sector');
        }

        return await this.repository.create({
            name,
            rfid,
            sector,
        });
    }
};
