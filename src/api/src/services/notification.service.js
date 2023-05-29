const InternalServerError = require("../errors/internal-server-error");
const Service = require("./service");

module.exports = class notificationService extends Service{
    constructor(repository){
        super(repository);
    }

    async create(espId,manteinerId,state,urgency,sector,content){
        if(!espId) {
            throw new InternalServerError("Notification must have a esp_id")
        }

        if(!manteinerId) {
            throw new InternalServerError("Notification must have a manteinerId")
        }

        if(!state) {
            throw new InternalServerError("Notification must have a type")
        }

        if(!urgency) {
            throw new InternalServerError("Notification must have a urgency")
        }

        if(!sector) {
            throw new InternalServerError("Notification must have a sector")
        }
        
        if(!content) {
            throw new InternalServerError("Notification must have a content")
        }
        return await this.repository.create({
            espId,
            manteinerId,
            state,
            urgency,
            sector,
            content,
        });
    }


}
