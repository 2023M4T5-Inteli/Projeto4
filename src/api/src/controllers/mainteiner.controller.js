const Controller = require('./controller');
const mainteinerServiceProvider = require('../providers/mainteiner.provider');

module.exports = class MainteinerController extends Controller {
    static async list(req, res) {
        const mainteinerService = mainteinerServiceProvider();

        const mainteinerList = await mainteinerService.list();

        res.json(mainteinerList);
    }

    static async find(req, res) {
        const mainteinerService = mainteinerServiceProvider();

        const mainteiner = await mainteinerService.findById(req.params.id);

        res.json(mainteiner);
    }

    static async create(req, res) {
        Controller.validationResult(req);
        const { name, rfid, sector } = Controller.matchData(req);

        const maintainerService = mainteinerServiceProvider();

        const maintainer = await maintainerService.create(name, rfid, sector);

        res.json(maintainer);
    }

    static async update(req, res) {
        const body = Controller.matchData(req);

        const mainteinerService = mainteinerServiceProvider();
        await mainteinerService.update({
            ...body,
            _id: req.params.id,
        });

        const mainteiner = await mainteinerService.findById(req.params.id);

        res.json(mainteiner);
    }

    static async delete(req, res) {
        const mainteinerService = mainteinerServiceProvider();

        const mainteiner = await mainteinerService.delete(req.params.id);

        res.json(mainteiner);
    }
};
