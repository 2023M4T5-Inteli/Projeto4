const { Router } = require('express');

const v1Router = require('./v1.router');
const loggerMiddleware = require('../middlewares/logger.middleware');
const errorHandlerMiddleware = require('../middlewares/error-handler.middleware');
const notFoundMiddleware = require('../middlewares/not-found.middleware');

const router = Router();

router.use(loggerMiddleware);

router.use('/v1/', v1Router);

router.all('*', notFoundMiddleware);
router.use(errorHandlerMiddleware);

module.exports = router;
