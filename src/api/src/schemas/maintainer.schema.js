const mongoose = require('mongoose');

const MaintenerSchema = new mongoose.Schema({
    name: String,
    rfid: String,
    sector: String,
});

module.exports = MaintenerSchema;
