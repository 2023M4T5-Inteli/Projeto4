const validator = require('express-validator');

module.exports = [validator.body('mac').notEmpty().isString().escape(), validator.body('tabletName').optional().isString()];
