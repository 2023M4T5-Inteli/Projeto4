#include "wifi.h"
#include "rfid.h"
#include "mqtt.h"

void setup() {
  // Start serial communication
  Serial.begin(9600);


  initRfid();
  initWifi();
  initMqtt();
}

void loop() {
  reconnectWifi();
  reconnectMqtt();

  changing_BSSID();
  read_rfid();
  sendMqtt(BSSID, RFID);
}


