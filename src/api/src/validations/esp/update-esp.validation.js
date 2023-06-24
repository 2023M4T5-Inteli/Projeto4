const validator = require('express-validator');

module.exports = [validator.body('mac').optional().isString(), validator.body('tabletName').optional().isString(), validator.body('lastHistoric').optional().isMongoId()];
