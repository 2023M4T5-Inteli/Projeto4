const Controller = require('./controller');
const historicServiceProvider = require('../providers/historic.provider');

module.exports = class HistoricController extends Controller {
    static async list(req, res) {
        const historicService = historicServiceProvider();

        const historicList = await historicService.list();

        res.json(historicList);
    }

    static async find(req, res) {
        const historicService = historicServiceProvider();

        const historic = await historicService.findById(req.params.id);

        res.json(historic);
    }

    static async create(req, res) {
        Controller.validationResult(req);
        const { espId, mantainerId, date, sector, atStation } = Controller.matchData(req);

        const historicService = await historicServiceProvider();
        const historic = await historicService.create(espId, mantainerId, date, sector, atStation);

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
