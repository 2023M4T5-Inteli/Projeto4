const NotFoundError = require('../errors/not-found.error');

module.exports = function notFoundMiddleware(req, res) {
    const error = new NotFoundError('Route not found');
    error.sendAsResponse(res);
};
