const validator = require('express-validator');

module.exports = [validator.body('mac').optional().isString(), validator.body(['sector', 'lastHistoric']).optional().isMongoId(), validator.body('name').optional().isString()];
