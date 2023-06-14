module.exports = class MqttMessageHelper {
    static stringBufferToBuffer(string) {
        return Buffer.from(string);
    }

    static bufferToString(buffer) {
        return buffer.toString();
    }

    static decodeMessage(string) {
        const buffer = this.stringBufferToBuffer(string);
        const jsonStringfied = this.bufferToString(buffer);

        const result = JSON.parse(jsonStringfied);

        result.connections = (result.connections || []).filter((connection) => connection.BSSID);

        return result;
    }
};
