const InternalServerError = require('../errors/internal-server-error');
const Service = require('./service');

module.exports = class EspService extends Service {
    constructor(repository) {
        super(repository);
    }

    async create(mac, tabletName) {
        if (!mac) {
            throw new InternalServerError('Esp must have a mac address');
        }

        return await this.repository.create({
            mac,
            tabletName,
        });
    }

    async findByMac(mac) {
        return await this.find({ mac });
    }
};
