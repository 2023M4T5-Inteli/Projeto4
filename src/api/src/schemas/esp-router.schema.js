const mongoose = require('mongoose');

const EspRouterSchema = new mongoose.Schema({
    sectorId: String,
    mac: String,
});

module.exports = EspRouterSchema;
