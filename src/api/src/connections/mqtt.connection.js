const mqtt = require('mqtt');
const Connection = require('./connection');
const environmentVars = require('../config/environment.config');

module.exports = class MqttConnection extends Connection {
    constructor(url = environmentVars.MQTT_BROKER_URL, ip = environmentVars.MQTT_BROKER_PORT, baseTopic = environmentVars.MQTT_BROKER_BASE_TOPIC) {
        super(null, null, url, ip);
        this.baseTopic = baseTopic;
    }

    connect() {
        try {
            console.log(`Starting connection with broker ${this.ip}...`);
            const connectionUrl = `mqtt://${this.ip}:${this.port}`;
            this.client = mqtt.connect(connectionUrl);

            this.connected = true;
            console.log(`MQTT connected at ${connectionUrl} broker`);
        } catch (error) {
            console.log(`Error trying to connect with MQTT in (${this.ip}) server. Error: `, error);
            this.error = error;
        }
    }

    getCompleteTopic(topic) {
        return `${this.baseTopic}${topic}`;
    }

    subscribe(
        topic,
        callback = () => {
            console.log(`Subscribed at ${new Date().toISOString()} on ${this.getCompleteTopic(topic)} topic`);
        }
    ) {
        this.client.subscribe(this.getCompleteTopic(topic), callback);
    }

    unsubscribe(
        topic,
        callback = () => {
            console.log(`Unsubscribed ata ${new Date().toISOString()} of ${this.getCompleteTopic(topic)} topic`);
        }
    ) {
        this.client.unsubscribe(this.getCompleteTopic(topic), callback);
    }

    publish(
        topic,
        message,
        options,
        callbackError = (error) => {
            console.log(`Error trying to publish at ${new Date().toISOString()} to (${this.getCompleteTopic(topic)}): `, error);
            throw error;
        }
    ) {
        this.client.publish(this.getCompleteTopic(topic), message, options, callbackError);
    }

    listenConnect(
        callback = () => {
            console.log(`Connected at ${new Date().toISOString()}`);
        }
    ) {
        this.client.on('connect', callback);
    }

    listenMessage(
        callback = (topic, payload) => {
            console.log(`Received message at ${new Date().toISOString()} of (${this.getCompleteTopic(topic)}) topic:`, payload);
        }
    ) {
        this.client.on('message', callback);
    }

    listenError(
        callback = (error) => {
            console.log(`Receive an error at ${new Date().toISOString()}.`, error);
        }
    ) {
        this.client.on('error', callback);
    }

    listenDisconnect(
        callback = (packet) => {
            console.log(`Disconnected at ${new Date().toISOString()}`, packet);
        }
    ) {
        this.client.on('disconnect', callback);
    }

    listenEnd(
        callback = () => {
            console.log(`Received end at ${new Date().toISOString()}`);
        }
    ) {
        this.client.on('end', callback);
    }

    listenClose(
        callback = () => {
            console.log(`Received close at ${new Date().toISOString()}`);
        }
    ) {
        this.client.on('close', callback);
    }

    listenOffline(
        callback = () => {
            console.log(`Received offline at ${new Date().toISOString()}`);
        }
    ) {
        this.client.on('offline', callback);
    }

    listenOutgoingEmpty(
        callback = () => {
            console.log(`Received outgoing at ${new Date().toISOString()}`);
        }
    ) {
        this.client.on('outgoingEmpty', callback);
    }

    listenPacketreceive(
        callback = (packet) => {
            console.log(`Received Packet at ${new Date().toISOString()}`, packet);
        }
    ) {
        this.client.on('packetreceive', callback);
    }

    listenPacketsend(
        callback = (packet) => {
            console.log(`Sent Packet at ${new Date().toISOString()}`, packet);
        }
    ) {
        this.client.on('packetsend', callback);
    }

    listenReconnect(
        callback = () => {
            console.log(`Received reconnect at ${new Date().toISOString()}`);
        }
    ) {
        this.client.on('reconnect', callback);
    }
};
