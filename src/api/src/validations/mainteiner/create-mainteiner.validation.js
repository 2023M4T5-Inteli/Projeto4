const validator = require('express-validator');

module.exports = [validator.body('name').notEmpty().escape(), validator.body('rfid').notEmpty().escape(), validator.body('sector').notEmpty().escape()];
