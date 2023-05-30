#include "helper.h"

void setup() {
  // Initialize general settings
  initializeGeneral(115200, 0, 2000, 8, 0); // (baudRate, channel, frequency, bitResolution, speakerPin)

  // Connect to WiFi
  connectToWifi("Inteli-COLLEGE", "QazWsx@123"); // (ssid, password)

  // Connect and subscribe to MQTT broker
  connectSubscribeMQTT("test.mosquitto.org", 1883); // (mqttServer, mqttPort)
}

void loop() {
  // Check for router change
  routerChange();

  // Read RFID tag
  readRFID();

  // Publish MQTT message
  mqttPublisher("devices/esp32/fabio/test");
}

