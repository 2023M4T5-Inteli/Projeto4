const IaConnection = require('../connections/ia.connection');
const MongoConnection = require('../connections/mongo.connection');
const MqttConnection = require('../connections/mqtt.connection');
const listener = require('../listeners/mqtt/listener');
const environmentVars = require('./environment.config');
const globalConnections = require('./global-connections.config');

module.exports = async function startGlobalConnections() {
    if (environmentVars.MONGO_DB_USER && environmentVars.MONGO_DB_PASS && environmentVars.MONGO_DB_ADDRESS && environmentVars.MONGO_DB_DATABASE) {
        const mongoConnection = new MongoConnection(environmentVars.MONGO_DB_USER, environmentVars.MONGO_DB_PASS, environmentVars.MONGO_DB_ADDRESS, environmentVars.MONGO_DB_DATABASE);
        await mongoConnection.connect();

        globalConnections.mongoConnection = mongoConnection;
    }

    if (environmentVars.IA_API_BASE_URL) {
        const iaConnection = new IaConnection(environmentVars.IA_API_BASE_URL);

        globalConnections.iaConnection = iaConnection;
    }

    if (environmentVars.MQTT_BROKER_URL) {
        const mongoConnection = new MqttConnection(environmentVars.MQTT_BROKER_URL, environmentVars.MQTT_BROKER_IP, environmentVars.MQTT_BROKER_BASE_TOPIC);
        mongoConnection.connect();

        if (mongoConnection.connected) {
            listener(mongoConnection);
        }

        globalConnections.mongoConnection = mongoConnection;
    }
};
