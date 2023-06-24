# API
Esta é a API-backend do sistema. Ela é resposável por unir todas as tecnologias que envolvem o funcionamento da solução e pode ser utilizada através dos seguintes passos:

1- Criação do arquivo **.env** na raíz da API, contendo os seguintes campos que devem ser preenchidos:
```
#Mongo
MONGO_DB_USER=""
MONGO_DB_PASS=""
MONGO_DB_ADDRESS=""
MONGO_DB_DATABASE=""

# MQTT
MQTT_BROKER_URL=""
MQTT_BROKER_PORT=""
MQTT_BROKER_BASE_TOPIC=""

# IA
IA_API_BASE_URL=""
IA_TRAIN_DELAY_SECONDS=""

#API
PORT=""
```

2- Instalação do Node.js versão 14 ou superior.

3- Comando npm i

4- Comando node src/app.js
