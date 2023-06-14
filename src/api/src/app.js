const express = require('express');
const cors = require('cors');

const environmentVars = require('./config/environment.config');
const router = require('./routers/router');
const startGlobalConnections = require('./config/start-global-connections.config');

const app = express();

app.use(cors());

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use('/', router);

app.listen(environmentVars.PORT, () => {
    console.log(`API started on ${environmentVars.PORT} port`);
    startGlobalConnections();
});
