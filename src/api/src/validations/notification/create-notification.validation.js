const validator = require('express-validator');

module.exports = [
    validator.body(['content']).notEmpty().isString().escape(),
    validator.body(['maintainer', 'sector', 'esp', 'router']).optional().isMongoId(),
    validator.body(['category']).optional().isString(),
    validator.body(['state']).optional().isString(),
];
