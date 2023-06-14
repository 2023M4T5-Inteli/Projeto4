const IaConnection = require('../connections/ia.connection');
const historicProvider = require('../providers/historic.provider');
const { AxiosError } = require('axios');

module.exports = class IaService {
    constructor(connection = new IaConnection()) {
        this.connection = connection;
    }

    async trainIa() {
        const historics = await historicProvider().list({ verified: true });
        const normalizedHistorics = historics.map((historic) => {
            const connections = historic.connections.map((connection) => {
                return {
                    router: connection.router.mac,
                    wifiPotency: connection.wifiPotency,
                };
            });

            connections.push({
                router: historic.router.mac,
                wifiPotency: historic.wifiPotency,
            });

            return {
                sector: historic.espSector.id,
                connections,
            };
        });

        try {
            return await this.connection.postTrain(normalizedHistorics);
        } catch (error) {
            if (error instanceof AxiosError) {
                console.log(error.response.data);
            }
        }
    }

    async predict(historics = []) {
        const normalizedHistorics = historics.map((historic) => {
            const connections = historic.connections.map((connection) => {
                return {
                    router: connection.router.mac,
                    wifiPotency: connection.wifiPotency,
                };
            });

            connections.push({
                router: historic.router.mac,
                wifiPotency: historic.wifiPotency,
            });

            return connections;
        });

        try {
            return await this.connection.postPredict(normalizedHistorics);
        } catch (error) {
            if (error instanceof AxiosError) {
                console.log(error.response.data);
            }
        }
    }
};
