const validator = require('express-validator');

module.exports = [validator.body('name'), validator.body('rfid'), validator.body('sector')];
