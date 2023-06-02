#include "helper.h"

void setup() {
  // Initialize general settings
  initializeGeneral(9600, 0, 2000, 8, 0); // (baudRate, channel, frequency, bitResolution, speakerPin)

  // Connect to WiFi
  connectToWifi("", ""); // (ssid, password)

  // Connect and subscribe to MQTT broker
  connectSubscribeMQTT("test.mosquitto.org", 1883); // (mqttServer, mqttPort)
}

void loop() {
  // Check for router change
  routerChange();

  // Read RFID tag
  readRFID();

  // Publish MQTT message
  mqttPublisher("devices/esp32/qhkxtipnorab/" + String(WiFi.macAddress()));
}

