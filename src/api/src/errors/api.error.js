module.exports = class ApiError {
    constructor(message, status) {
        this.message = message;
        this.status = status;
    }

    sendAsResponse(res) {
        return res.status(this.status).json({
            status: this.status,
            message: this.message,
        });
    }
};
