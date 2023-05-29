const validator = require('express-validator');

module.exports = [validator.body(['espId','state','urgency','content','manteinerId','sector'])]; 