const Controller = require('./controller');
const historicServiceProvider = require('../providers/historic.provider');

module.exports = class HistoricController extends Controller {
    static async list(req, res) {
        const historicService = historicServiceProvider();

        const historicList = await historicService.list(req.query, req.query.orderBy || 'createdAt-desc', req.query.limit);

        res.json(historicList);
    }

    static async find(req, res) {
        const historicService = historicServiceProvider();

        const historic = await historicService.findById(req.params.id);

        res.json(historic);
    }

    static async findByVar(req, res) {
        const historicService = historicServiceProvider();

        const filter = {};
        filter[req.params.name] = req.params.value;
        const historic = await historicService.find(filter, req.query.orderBy || 'createdAt-desc');

        res.json(historic);
    }

    static async create(req, res) {
        Controller.validationResult(req);
        const { esp, maintainer, router, wifiPotency, atStation, online, verified, connections, iaEspSector } = Controller.matchData(req);

        const historicService = historicServiceProvider();

        const { _id } = await historicService.create(esp, maintainer, router, wifiPotency, connections, online, atStation, verified, iaEspSector);
        const historic = await historicService.findById(_id);

        res.json(historic);
    }

    static async update(req, res) {
        const body = Controller.matchData(req);

        const historicService = historicServiceProvider();
        await historicService.update({
            ...body,
            _id: req.params.id,
        });

        const historic = await historicService.findById(req.params.id);

        res.json(historic);
    }

    static async delete(req, res) {
        const historicService = historicServiceProvider();

        const historic = await historicService.delete(req.params.id);

        res.json(historic);
    }
};
