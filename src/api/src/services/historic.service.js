const InternalServerError = require('../errors/internal-server-error');
const Service = require('./service');

module.exports = class HistoricService extends Service {
    constructor(repository) {
        super(repository);
    }

    async create(espId, mantainerId, date, sector, atStation) {
        if (!espId) {
            throw new InternalServerError('Historic must have a espId');
        }

        if (!mantainerId) {
            throw new InternalServerError('Historic must have a mantainerId');
        }

        if (!date) {
            throw new InternalServerError('Historic must have a date');
        }

        if (!sector) {
            throw new InternalServerError('Historic must have a sector');
        }

        if (!atStation) {
            throw new InternalServerError('Historic have atStation declaration');
        }

        return await this.repository.create({
            espId,
            mantainerId,
            date,
            sector,
            atStation,
        });
    }
};
