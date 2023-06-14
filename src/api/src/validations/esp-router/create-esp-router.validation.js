const validator = require('express-validator');

module.exports = [validator.body('mac').notEmpty().isString().escape(), validator.body('sector').optional().isMongoId(), validator.body('name').optional().isString()];
