const validator = require('express-validator');

module.exports = [
    validator.body(['content']).optional().isString(),
    validator.body(['maintainer', 'sector', 'esp', 'router']).optional().isMongoId(),
    validator.body(['category']).optional().isString(),
    validator.body(['state']).optional().isString(),
];
