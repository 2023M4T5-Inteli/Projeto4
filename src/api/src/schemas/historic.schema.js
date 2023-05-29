const mongoose = require('mongoose');

const HistoricSchema = new mongoose.Schema({
    espId: String,
    mantainerId: String,
    date: Date,
    sector: String,
    atStation: Boolean,
});

module.exports = HistoricSchema;
