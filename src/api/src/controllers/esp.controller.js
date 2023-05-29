const Controller = require('./controller');
const espServiceProvider = require('../providers/esp.provider');

module.exports = class EspController extends Controller {
    static async list(req, res) {
        const espService = espServiceProvider();

        const espList = await espService.list();

        res.json(espList);
    }

    static async find(req, res) {
        const espService = espServiceProvider();

        const esp = await espService.findById(req.params.id);

        res.json(esp);
    }

    static async create(req, res) {
        Controller.validationResult(req);
        const { mac } = Controller.matchData(req);

        const espService = await espServiceProvider();
        const esp = await espService.create(mac);

        res.json(esp);
    }

    static async update(req, res) {
        const body = Controller.matchData(req);

        const espService = espServiceProvider();
        await espService.update({
            ...body,
            _id: req.params.id,
        });

        const esp = await espService.findById(req.params.id);

        res.json(esp);
    }

    static async delete(req, res) {
        const espService = espServiceProvider();

        const esp = await espService.delete(req.params.id);

        res.json(esp);
    }
};
