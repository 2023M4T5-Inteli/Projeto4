const mongoose = require('mongoose');

const maintainerSchema = new mongoose.Schema(
    {
        name: {
            type: String,
            default: null,
        },
        rfid: {
            type: String,
            unique: true,
            required: true,
        },
        sector: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Sector',
            default: null,
        },
        lastHistoric: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Historic',
            default: null,
        },
    },
    { timestamps: true, versionKey: false }
);

module.exports = maintainerSchema;
