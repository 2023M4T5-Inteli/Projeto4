const validator = require('express-validator');

module.exports = [validator.body(['name']).optional().isString(), validator.body(['rfid']).notEmpty().isString(), validator.body(['sector']).optional().isMongoId()];
