const mongoose = require("mongoose"); //importando a biblioteca do mongoDB

const NotificationSchema = new mongoose.Schema({ // cria uma nova instância de schema(que cria a forma que será armazenado no mongoDB)
     espId: String,
     manteinerId: String,
     state: String,
     urgency: String,
     sector: String, 
     content: String,    
});

module.exports = NotificationSchema;
