const mongoose = require('mongoose');

const SectorSchema = new mongoose.Schema(
    {
        name: {
            type: String,
            required: true,
        },
        mapX: {
            type: Number,
            default: null,
        },
        mapY: {
            type: Number,
            default: null,
        },
    },
    { timestamps: true, versionKey: false }
);

module.exports = SectorSchema;
