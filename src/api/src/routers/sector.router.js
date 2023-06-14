const { Router } = require('express');
const SectorController = require('../controllers/sector.controller');
const createSectorValidation = require('../validations/sector/create-sector.validation');
const updateSectorValidation = require('../validations/sector/update-sector.validation');

const router = Router();

router.get('/', SectorController.list);
router.get('/:id', SectorController.find);
router.get('/:name/:value', SectorController.findByVar);
router.post('/', ...createSectorValidation, SectorController.create);
router.put('/:id', ...updateSectorValidation, SectorController.update);
router.delete('/:id', SectorController.delete);

module.exports = router;
