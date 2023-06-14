const espListener = require('./esp.listener');

module.exports = function mqttListerner(mqttConnection) {
    espListener(mqttConnection);
};
