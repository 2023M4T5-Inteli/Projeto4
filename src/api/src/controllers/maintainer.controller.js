const Controller = require('./controller');
const maintainerServiceProvider = require('../providers/maintainer.provider');

module.exports = class maintainerController extends Controller {
    static async list(req, res) {
        const maintainerService = maintainerServiceProvider();

        const maintainerList = await maintainerService.list(req.query, req.query.orderBy || 'createdAt-desc', req.query.limit);

        res.json(maintainerList);
    }

    static async find(req, res) {
        const maintainerService = maintainerServiceProvider();

        const maintainer = await maintainerService.findById(req.params.id);

        res.json(maintainer);
    }

    static async findByVar(req, res) {
        const maintainerService = maintainerServiceProvider();

        const filter = {};
        filter[req.params.name] = req.params.value;
        const maintainer = await maintainerService.find(filter, req.query.orderBy || 'createdAt-desc');

        res.json(maintainer);
    }

    static async create(req, res) {
        Controller.validationResult(req);
        const { name, rfid, sector } = Controller.matchData(req);

        const maintainerService = maintainerServiceProvider();

        const { _id } = await maintainerService.create(name, rfid, sector);
        const maintainer = await maintainerService.findById(_id);

        res.json(maintainer);
    }

    static async update(req, res) {
        const body = Controller.matchData(req);

        const maintainerService = maintainerServiceProvider();
        await maintainerService.update({
            ...body,
            _id: req.params.id,
        });

        const maintainer = await maintainerService.findById(req.params.id);

        res.json(maintainer);
    }

    static async delete(req, res) {
        const maintainerService = maintainerServiceProvider();

        const maintainer = await maintainerService.delete(req.params.id);

        res.json(maintainer);
    }
};
