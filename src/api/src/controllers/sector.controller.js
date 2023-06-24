const Controller = require('./controller');
const sectorServiceProvider = require('../providers/sector.provider');
const historicServiceProvider = require('../providers/historic.provider');
const espSectorProvider = require('../providers/esp.provider');

module.exports = class SectorController extends Controller {
    static async list(req, res) {
        const sectorService = sectorServiceProvider();

        const sectorList = await sectorService.list(req.query, req.query.orderBy || 'createdAt-desc', req.query.limit);

        res.json(sectorList);
    }

    static async listWithEsps(req, res) {
        const sectorService = sectorServiceProvider();
        const espService = espSectorProvider();

        let sectorList = await sectorService.list(req.query, req.query.orderBy || 'createdAt-desc', req.query.limit);
        const espList = await espService.list();

        sectorList = sectorList.map((sector) => {
            return {
                ...sector._doc,
                esps: espList.filter((esp) => esp.lastHistoric && esp.lastHistoric.espSector && esp.lastHistoric.espSector.id == sector.id),
                iaEsps: espList.filter((esp) => esp.lastHistoric && esp.lastHistoric.iaEspSector && esp.lastHistoric.iaEspSector.id == sector.id),
            };
        });

        res.json(sectorList);
    }

    static async find(req, res) {
        const sectorService = sectorServiceProvider();

        const sector = await sectorService.findById(req.params.id);

        res.json(sector);
    }

    static async findByVar(req, res) {
        const sectorService = sectorServiceProvider();

        const filter = {};
        filter[req.params.name] = req.params.value;
        const sector = await sectorService.find(filter, req.query.orderBy || 'createdAt-desc');

        res.json(sector);
    }

    static async create(req, res) {
        Controller.validationResult(req);
        const { name, mapX, mapY } = Controller.matchData(req);

        const sectorService = await sectorServiceProvider();
        const { _id } = await sectorService.create(name, mapX, mapY);
        const sector = await sectorService.findById(_id);

        res.json(sector);
    }

    static async update(req, res) {
        const body = Controller.matchData(req);

        const sectorService = sectorServiceProvider();
        await sectorService.update({
            ...body,
            _id: req.params.id,
        });

        const sector = await sectorService.findById(req.params.id);

        res.json(sector);
    }

    static async delete(req, res) {
        const sectorService = sectorServiceProvider();

        const sector = await sectorService.delete(req.params.id);

        res.json(sector);
    }
};
