module.exports = class Connection {
    connected = false;
    error;

    constructor(user, pass, ip, port) {
        this.user = user;
        this.pass = pass;
        this.ip = ip;
        this.port = port;
    }

    async connect() {}
};
