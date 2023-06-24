const validator = require('express-validator');

module.exports = [validator.body(['name', 'rfid']).optional().isString(), validator.body(['sector', 'lastHistoric']).optional().isMongoId()];
