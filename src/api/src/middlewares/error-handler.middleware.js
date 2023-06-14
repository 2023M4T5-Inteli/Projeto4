const ApiError = require('../errors/api.error');
const InternalServerError = require('../errors/internal-server-error');
const BadRequestError = require('../errors/bad-request.error');

module.exports = function errorHandler(err, req, res, next) {
    let apiError = new InternalServerError(err.message || err);

    if (!(err instanceof ApiError) || err instanceof InternalServerError) {
        console.log(`Error at ${new Date().toISOString()}: `, err);
        if (err instanceof InternalServerError) {
            apiError = err;
        } else {
            if (err.name === 'MongoServerError') {
                if (err.code === 11000) {
                    apiError = new BadRequestError(`Duplicated keys: [${Object.keys(err.keyValue).join(',')}]`);
                }
            }
        }
    } else {
        apiError = err;
    }

    apiError.sendAsResponse(res);
};
