const { Router } = require('express');
const MainteinerController = require('../controllers/mainteiner.controller');
const createMainteinerValidation = require('../validations/mainteiner/create-mainteiner.validation');
const updateMainteinerValidation = require('../validations/mainteiner/update-mainteiner.validation');

const router = Router();

router.get('/', MainteinerController.list);
router.get('/:id', MainteinerController.find);
router.post('/', ...createMainteinerValidation, MainteinerController.create);
router.put('/:id', ...updateMainteinerValidation, MainteinerController.update);
router.delete('/:id', MainteinerController.delete);

module.exports = router;
