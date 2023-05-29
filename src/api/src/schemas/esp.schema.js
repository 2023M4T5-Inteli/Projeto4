const mongoose = require('mongoose');

const EspSchema = new mongoose.Schema({
    id: String,
    mac: String
});

module.exports = EspSchema;
