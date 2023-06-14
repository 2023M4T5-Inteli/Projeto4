const { Router } = require('express');
const EspRouterController = require('../controllers/esp-router.controller');
const createEspRouterValidation = require('../validations/esp-router/create-esp-router.validation');
const updateEspRouterValidation = require('../validations/esp-router/update-esp-router.validation');

const router = Router();

router.get('/', EspRouterController.list);
router.get('/:id', EspRouterController.find);
router.get('/:name/:value', EspRouterController.findByVar);
router.post('/', ...createEspRouterValidation, EspRouterController.create);
router.put('/:id', ...updateEspRouterValidation, EspRouterController.update);
router.delete('/:id', EspRouterController.delete);

module.exports = router;
