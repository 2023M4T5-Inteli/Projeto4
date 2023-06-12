#ifndef MQTT_H
#define MQTT_H

#include <WiFi.h>
#include <PubSubClient.h>
#include <ArduinoJson.h>

// MQTT broker details
const char* mqttServer = "test.mosquitto.org";
const int mqttPort = 1883;

// MQTT topic to subscribe to
const String stringTopic = "devices/esp32/qhkxtipnorab/" + WiFi.macAddress();//"devices/esp32/yimeolimolcbr/" + WiFi.macAddress();  devices/esp32/yimeolimolcb/+
const char* mqttTopic = stringTopic.c_str();

const String StringLastWillTopic = stringTopic + "/lastwill";
const char* LastWillTopic = StringLastWillTopic.c_str();

const String idDevice = "ESP32-πrelli-" + WiFi.macAddress();

const char* mqttLWTMessage = "I'm offline";
const int mqttLWTRetain = 0;

// Create an instance of the WiFiClient class
WiFiClient espClient;

// Create an instance of the PubSubClient class
PubSubClient client(espClient);

unsigned long timer;
unsigned long delay_time = 5000;

void initMqtt() {
  // Set MQTT broker details
  client.setServer(mqttServer, mqttPort);

  // Connect to MQTT broker and subscribe to the topic
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

void sendMqtt(String BSSID, String RFID) {
  if (millis() - timer > delay_time) {
    StaticJsonDocument<200> payload;
    payload["BSSID"] = BSSID;
    payload["RFID"] = RFID;
    payload["RSSI"] = WiFi.RSSI();

    String json_payload;
    serializeJson(payload, json_payload);

    client.publish(mqttTopic, json_payload.c_str());
    timer = millis();
    Serial.println("Enviei");
  }
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




#endif