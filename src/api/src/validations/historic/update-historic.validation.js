const validator = require('express-validator');

module.exports = [
    validator.body(['router', 'maintainer', 'esp', 'espSector', 'maintainerSector', 'iaEspSector']).optional().isMongoId(),
    validator.body(['atStation', 'online', 'verified']).optional().isBoolean(),
    validator.body(['wifiPotency']).optional().isNumeric(),
    validator.body(['connections']).optional().isArray(),
    validator.body(['connections.*.router']).notEmpty().isMongoId(),
    validator.body(['connections.*.wifiPotency']).notEmpty().isNumeric(),
];
