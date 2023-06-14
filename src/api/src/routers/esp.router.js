const { Router } = require('express');
const EspController = require('../controllers/esp.controller');
const createEspValidation = require('../validations/esp/create-esp.validation');
const updateEspValidation = require('../validations/esp/update-esp.validation');

const router = Router();

router.get('/', EspController.list);
router.get('/:id', EspController.find);
router.get('/:name/:value', EspController.findByVar);
router.post('/', ...createEspValidation, EspController.create);
router.put('/:id', ...updateEspValidation, EspController.update);
router.delete('/:id', EspController.delete);

module.exports = router;
