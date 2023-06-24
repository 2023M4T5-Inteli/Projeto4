#ifndef MQTT_H
#define MQTT_H

#include <WiFi.h>
#include <PubSubClient.h>
#include <ArduinoJson.h>

// MQTT broker details
const char* mqttServer = "test.mosquitto.org";
const int mqttPort = 1883;

// MQTT topic to subscribe to
const String stringTopic = "devices/esp32/yimeolimolcb/" + WiFi.macAddress();//"devices/esp32/yimeolimolcbr/" + WiFi.macAddress();  devices/esp32/yimeolimolcb/+
const char* mqttTopic = stringTopic.c_str();

//MQTT last will topic config
const String StringLastWillTopic = stringTopic + "/lastwill";
const char* LastWillTopic = StringLastWillTopic.c_str();

//id esp on broker
const String idDevice = "ESP32-πrelli-" + WiFi.macAddress();

//last will message
const char* mqttLWTMessage = "I'm offline";
const int mqttLWTRetain = 0;

// Create an instance of the WiFiClient class
WiFiClient espClient;

// Create an instance of the PubSubClient class
PubSubClient client(espClient);

unsigned long timer;
unsigned long delay_time = 5000;

//inicia a conexao do esp ao broker via mqtt
void initMqtt() {
  // Set MQTT broker details
  client.setServer(mqttServer, mqttPort);

  while (!client.connected()) {
    Serial.println("Connecting to MQTT broker...");
    if (client.connect(idDevice.c_str(), LastWillTopic, 0, mqttLWTRetain, mqttLWTMessage)) {
      Serial.println("Connected to MQTT broker");
    } else {
      Serial.print("Failed with state ");
      Serial.print(client.state());
      delay(2000);
    }
  }

  timer = millis();
}

void connectMqtt() {
  client.setServer(mqttServer, mqttPort);

  // Connect to MQTT broker and subscribe to the topic
  while (!client.connected()) {
    Serial.println("Connecting to MQTT broker...");
    if (client.connect(idDevice.c_str())) {
      Serial.println("Connected to MQTT broker");
    } else {
      Serial.print("Failed with state ");
      Serial.print(client.state());
      delay(2000);
    }
  }
}

void reconnectMqtt() {
  if (!client.connected()) {
    connectMqtt();
  }
  client.loop();
}

void sendMqtt(String BSSID, String RFID, std::vector<RouterInfo> routers) {
  if (millis() - timer > delay_time) {

    //armazena as informações do wifi num vetor
    const size_t capacity = JSON_OBJECT_SIZE(3) + JSON_ARRAY_SIZE(70) + 70 * JSON_OBJECT_SIZE(2) + 120;//tamanjo do staticjson
    StaticJsonDocument<capacity> payload;
    payload["BSSID"] = BSSID;
    payload["RFID"] = RFID;
    payload["RSSI"] = WiFi.RSSI();

   

    JsonArray connections = payload.createNestedArray("connections");

    //coloca as informações do scan no formato json
    for (const auto& router : routers) {
      JsonObject connectionObj = connections.createNestedObject();
      connectionObj["BSSID"] = router.BSSID;
      connectionObj["RSSI"] = router.RSSI;
    }

    String json_payload;
    serializeJson(payload, json_payload);

    int emptyObjIndex = json_payload.lastIndexOf(",{}");
    if (emptyObjIndex != -1) {
      json_payload.remove(emptyObjIndex, 2);
    }

    Serial.println(json_payload);

    client.setBufferSize(capacity + 1000);
    if (client.getBufferSize()) {
      //envia para o broker um arquivo json com o roteador conectado, UID e todas as informações das rede em sua volta
      client.publish(mqttTopic, json_payload.c_str());
    } else {
      Serial.println("DEU RUIM");
    }
    
    timer = millis();
    Serial.println("Enviei");
  }
}



#endif