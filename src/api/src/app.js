const express = require('express');
const cors = require('cors');

const environmentVars = require('./config/environment.config');
const MongoConnection = require('./connections/mongo.connection');
const router = require('./routers/router');

const app = express();

app.use(cors());

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use('/', router);

app.listen(environmentVars.PORT, () => {
    console.log(`API started on ${environmentVars.PORT} port`);

    const mongoConnection = new MongoConnection();
    mongoConnection.connect();
});
