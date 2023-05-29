const { Router } = require('express');
const HistoricController = require('../controllers/historic.controller');
const createHistoricValidation = require('../validations/historic/create-historic.validation');
const updateHistoricValidation = require('../validations/historic/update-historic.validation');

const router = Router();

router.get('/', HistoricController.list);
router.get('/:id', HistoricController.find);
router.post('/', ...createHistoricValidation, HistoricController.create);
router.put('/:id', ...updateHistoricValidation, HistoricController.update);
router.delete('/:id', HistoricController.delete);

module.exports = router;