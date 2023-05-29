const espRouterServiceProvider = require('../providers/esp-router.provider');
const Controller = require('./controller');

module.exports = class EspRouterController extends Controller {
    static async list(req, res) {
        const espRouterService = espRouterServiceProvider();

        const espRouterList = await espRouterService.list();

        res.json(espRouterList);
    }

    static async find(req, res) {
        const espRouterService = espRouterServiceProvider();

        const espRouter = await espRouterService.findById(req.params.id);

        res.json(espRouter);
    }

    static async create(req, res) {
        Controller.validationResult(req);
        const { sectorId, mac } = Controller.matchData(req);

        const espRouterService = espRouterServiceProvider();

        const espRouter = await espRouterService.create(sectorId, mac);

        res.json(espRouter);
    }

    static async update(req, res) {
        const body = Controller.matchData(req);

        const espRouterService = espRouterServiceProvider();
        await espRouterService.update({
            ...body,
            _id: req.params.id,
        });

        const espRouter = await espRouterService.findById(req.params.id);

        res.json(espRouter);
    }

    static async delete(req, res) {
        const espRouterService = espRouterServiceProvider();

        const espRouter = await espRouterService.delete(req.params.id);

        res.json(espRouter);
    }
};
