const InternalServerError = require('../errors/internal-server-error');
const Service = require('./service');

module.exports = class SectorService extends Service {
    constructor(repository) {
        super(repository);
    }

    async create(name, mapX, mapY) {
        if (!name) {
            throw new InternalServerError('Sector must have a name address');
        }

        return await this.repository.create({
            name,
            mapX,
            mapY,
        });
    }
};
