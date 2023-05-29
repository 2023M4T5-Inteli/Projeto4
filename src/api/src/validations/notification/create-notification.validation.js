const validator = require('express-validator')

module.exports = [validator.body(['espId','state','urgency','content']).notEmpty().escape(),validator.body(['manteinerId','sector']).escape()]