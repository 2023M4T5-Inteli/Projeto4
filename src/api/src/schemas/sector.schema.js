const mongoose = require('mongoose');

const SectorSchema = new mongoose.Schema({
    id: String,
    name: String
});

module.exports = SectorSchema;
