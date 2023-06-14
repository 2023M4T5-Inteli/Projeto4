const mongoose = require('mongoose');

const NotificationSchema = new mongoose.Schema(
    {
        esp: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Esp',
            default: null,
        },
        maintainer: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Maintainer',
            default: null,
        },
        router: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'EspRouter',
            default: null,
        },
        category: {
            type: String,
            enum: ['info', 'esp-connection', 'esp-sector', 'esp-maintainer', 'esp', 'router', 'maintainer'],
            default: 'info',
            required: true,
        },
        state: {
            type: String,
            enum: ['checked', 'unchecked'],
            default: 'unchecked',
            required: true,
        },
        sector: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Sector',
            default: null,
        },
        content: {
            type: String,
            required: true,
        },
    },
    { timestamps: true, versionKey: false }
);

module.exports = NotificationSchema;
