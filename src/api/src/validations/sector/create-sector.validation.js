const validator = require('express-validator');

module.exports = [validator.body('name').notEmpty().isString().escape(), validator.body(['mapX', 'mapY']).optional().isNumeric()];
