const globalConnections = require('../config/global-connections.config');
const IaService = require('../services/ia.service');

module.exports = function iaServiceProvider() {
    return new IaService(globalConnections.iaConnection);
};
