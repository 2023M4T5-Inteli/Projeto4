const validator = require('express-validator');

module.exports = [
    validator.body(['esp', 'router']).notEmpty().isMongoId(),
    validator.body(['maintainer', 'iaEspSector']).optional().isMongoId(),
    validator.body(['atStation', 'online', 'verified']).optional().isBoolean(),
    validator.body(['wifiPotency']).optional().isNumeric(),
    validator.body(['connections']).optional().isArray(),
    validator.body(['connections.*.router']).notEmpty().isMongoId(),
    validator.body(['connections.*.wifiPotency']).notEmpty().isNumeric(),
];
