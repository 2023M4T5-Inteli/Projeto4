const { Router } = require('express');
const MaintainerController = require('../controllers/maintainer.controller');
const createMaintainerValidation = require('../validations/maintainer/create-maintainer.validation');
const updateMaintainerValidation = require('../validations/maintainer/update-maintainer.validation');

const router = Router();

router.get('/', MaintainerController.list);
router.get('/:id', MaintainerController.find);
router.get('/:name/:value', MaintainerController.findByVar);
router.post('/', ...createMaintainerValidation, MaintainerController.create);
router.put('/:id', ...updateMaintainerValidation, MaintainerController.update);
router.delete('/:id', MaintainerController.delete);

module.exports = router;
