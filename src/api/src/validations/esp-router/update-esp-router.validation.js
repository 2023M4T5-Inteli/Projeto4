const validator = require('express-validator');

module.exports = [validator.body('mac'), validator.body('sectorId')];
