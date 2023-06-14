require('express-async-errors');
const { Router } = require('express');

const MaintainerRouter = require('./maintainer.router');
const EspRouter = require('./esp.router');
const EspRouterRouter = require('./esp-router.router');
const SectorRouter = require('./sector.router');
const HistoricRouter = require('./historic.router');
const NotificationRouter = require('./notification.router');

const router = Router();

router.use('/maintainers/', MaintainerRouter);
router.use('/esps/', EspRouter);
router.use('/esp-routers/', EspRouterRouter);
router.use('/sectors/', SectorRouter);
router.use('/historics/', HistoricRouter);
router.use('/notifications/', NotificationRouter);

module.exports = router;
