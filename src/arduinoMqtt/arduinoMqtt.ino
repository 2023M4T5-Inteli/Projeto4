#include "wifi.h"
#include "rfid.h"
#include "mqtt.h"

void setup() {
  // Start serial communication
  Serial.begin(115200);

  //configura o esp
  initRfid();
  initWifi();
  initMqtt();
}

void loop() {
  //reconecta o esp ao wifi ou mqtt caso caia
  reconnectWifi();
  reconnectMqtt();

  //funções básicas: troca de wifi, leitura de cartão e envio de informação
  changing_BSSID();
  read_rfid();
  setRouterInfo();
  sendMqtt(BSSID, RFID, routers);
}


