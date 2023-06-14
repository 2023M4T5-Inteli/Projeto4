const espRouterServiceProvider = require('../providers/esp-router.provider');
const Controller = require('./controller');

module.exports = class EspRouterController extends Controller {
    static async list(req, res) {
        const espRouterService = espRouterServiceProvider();

        const espRouterList = await espRouterService.list(req.query, req.query.orderBy || 'createdAt-desc', req.query.limit);

        res.json(espRouterList);
    }

    static async find(req, res) {
        const espRouterService = espRouterServiceProvider();

        const espRouter = await espRouterService.findById(req.params.id);

        res.json(espRouter);
    }

    static async findByVar(req, res) {
        const espRouterService = espRouterServiceProvider();

        const filter = {};
        filter[req.params.name] = req.params.value;
        const espRouter = await espRouterService.find(filter, req.query.orderBy || 'createdAt-desc');

        res.json(espRouter);
    }

    static async create(req, res) {
        Controller.validationResult(req);
        const { sector, mac, name } = Controller.matchData(req);

        const espRouterService = espRouterServiceProvider();

        const { _id } = await espRouterService.create(sector, mac, name);
        const espRouter = await espRouterService.findById(_id);

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
