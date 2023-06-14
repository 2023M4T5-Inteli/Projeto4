const { default: axios } = require('axios');

module.exports = class IaConnection {
    constructor(baseurl) {
        this.baseUrl = baseurl;
        this.axios = axios.create({
            baseURL: this.baseUrl,
        });
    }

    async postTrain(data) {
        const result = await this.axios.request({
            url: '/train',
            method: 'post',
            data,
        });

        return result.data;
    }

    async postPredict(data) {
        const result = await this.axios.request({
            url: '/predict',
            method: 'post',
            data,
        });

        return result.data;
    }
};
