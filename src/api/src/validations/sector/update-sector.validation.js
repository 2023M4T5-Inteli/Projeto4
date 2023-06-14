const validator = require('express-validator');

module.exports = [validator.body('name').optional().isString(), validator.body(['mapX', 'mapY']).optional().isNumeric()];
