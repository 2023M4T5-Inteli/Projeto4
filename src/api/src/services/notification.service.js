const InternalServerError = require('../errors/internal-server-error');
const Service = require('./service');

module.exports = class notificationService extends Service {
    constructor(repository) {
        super(repository);
    }

    async create(content, category, espId, maintainerId, sectorId, routerId) {
        if (!content) {
            throw new InternalServerError('Notification must have a content');
        }

        return await this.repository.create({
            esp: espId,
            maintainer: maintainerId,
            sector: sectorId,
            category,
            content,
            router: routerId,
        });
    }

    async createEspMaintainerNotification(esp, lastMaintainer, maintainer) {
        if (lastMaintainer && !maintainer) {
            return await this.create(`Localizador de MAC ${esp.mac} deixou de ter o colaborador de RFID ${lastMaintainer.rfid} como responsável`, 'esp-maintainer', esp.id);
        } else if (!lastMaintainer && maintainer) {
            return await this.create(`Localizador de MAC ${esp.mac} passou a ter o colaborador de RFID ${maintainer.rfid} como responsável`, 'esp-maintainer', esp.id, maintainer.id);
        } else if (lastMaintainer && maintainer && lastMaintainer.id != maintainer.id) {
            return await this.create(
                `Localizador de MAC ${esp.mac} deixou de ter o colaborador de RFID ${lastMaintainer.rfid} e passou a ter o colaborador de RFID ${maintainer.rfid} como responsável`,
                'esp-maintainer',
                esp.id,
                maintainer.id
            );
        }
    }

    async createEspSectorNotification(esp, lastSector, sector) {
        if (lastSector && sector && lastSector.id != sector.id) {
            return await this.create(
                `Localizador de MAC ${esp.mac} deixou de estar conectado ao setor ${lastSector.name} e conectou-se ao setor ${sector.name}`,
                'esp-sector',
                esp.id,
                null,
                sector.id
            );
        } else if (lastSector && !sector) {
            return this.create(`Localizador de MAC ${esp.mac} deixou de estar conectado ao setor ${lastSector.name} e conectou-se a um setor não registrado`, 'esp-sector', esp.id);
        } else if (!lastSector && sector) {
            return this.create(`Localizador de MAC ${esp.mac} passou a estar conectado ao setor ${sector.name}`, 'esp-sector', esp.id, null, sector.id);
        }
    }
};
