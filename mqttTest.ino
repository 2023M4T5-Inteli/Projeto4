#include <WiFi.h>
#include <PubSubClient.h>
#include <ArduinoJson.h>

// Replace with your network credentials
const char* ssid = "Inteli-COLLEGE";
const char* password = "QazWsx@123";

// MQTT broker details
const char* mqttServer = "test.mosquitto.org";
const int mqttPort = 1883;

// MQTT topic to subscribe to
const char* mqttTopic = "devices/esp32/fabio/test";

// Create an instance of the WiFiClient class
WiFiClient espClient;

// Create an instance of the PubSubClient class
PubSubClient client(espClient);

unsigned long timer;
unsigned long delay_time = 5000;

String BSSID;

void changing_BSSID() {
  if (WiFi.BSSIDstr() != BSSID) {
    BSSID = WiFi.BSSIDstr();
    Serial.println("New Router BSSID:" + BSSID);
  }
}

void setup() {
  // Start serial communication
  Serial.begin(115200);

  WiFi.mode(WIFI_STA);

  // Connect to Wi-Fi network
  WiFi.begin(ssid, password);
  while (WiFi.status() != WL_CONNECTED) {
    delay(1000);
    Serial.println("Connecting to WiFi...");
  }
  Serial.println("Connected to WiFi");

  // Set MQTT broker details
  client.setServer(mqttServer, mqttPort);

  // Connect to MQTT broker and subscribe to the topic
  while (!client.connected()) {
    Serial.println("Connecting to MQTT broker...");
    if (client.connect("ESP32-fabio-1234")) {
      Serial.println("Connected to MQTT broker");
    } else {
      Serial.print("Failed with state ");
      Serial.print(client.state());
      delay(2000);
    }
  }

  timer = millis();
}

void loop() {
  changing_BSSID();
  if (millis() - timer > delay_time) {
    StaticJsonDocument<200> payload;
    payload["BSSID"] = BSSID;

    String json_payload;
    serializeJson(payload, json_payload);

    client.publish(mqttTopic, json_payload.c_str());
    timer = millis();
  }

}


