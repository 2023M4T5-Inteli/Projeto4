const mongoose = require('mongoose');

const HistoricSchema = new mongoose.Schema(
    {
        esp: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Esp',
            required: true,
        },
        espSector: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Sector',
            default: null,
        },
        iaEspSector: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Sector',
            default: null,
        },
        maintainer: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Maintainer',
            default: null,
        },
        maintainerSector: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Sector',
            default: null,
        },
        router: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'EspRouter',
            default: null,
        },
        connections: [
            {
                _id: false,
                router: {
                    type: mongoose.Schema.Types.ObjectId,
                    ref: 'EspRouter',
                    default: null,
                },
                wifiPotency: {
                    type: Number,
                    default: null,
                },
            },
        ],
        wifiPotency: {
            type: Number,
            default: null,
        },
        online: {
            type: Boolean,
            default: true,
        },
        atStation: {
            type: Boolean,
            default: false,
        },
        verified: {
            type: Boolean,
            default: false,
        },
    },
    { timestamps: true, versionKey: false }
);

module.exports = HistoricSchema;
