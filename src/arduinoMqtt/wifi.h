#ifndef WIFI_H
#define WIFI_H

#include <WiFi.h>
#include <vector>
#include <string.h>

//informações para conecatr na rede wifi
const char* ssid = "Inteli-COLLEGE";
const char* password = "QazWsx@123";

//uint8_t BSSID;
String BSSID;  // Define BSSID as an array of uint8_t with a length of 6


unsigned long timer_scan;
unsigned long delay_scanWifi = 10000;

//configura o esp para se conectar ao wifi
void initWifi() {
  WiFi.mode(WIFI_STA);

  // Connect to Wi-Fi network
  WiFi.begin(ssid, password);
  while (WiFi.status() != WL_CONNECTED) {
    delay(1000);
    Serial.println("Connecting to WiFi...");
  }
  Serial.println("Connected to WiFi");

  timer_scan = millis();
}

void connectToWiFi() {
  Serial.println("Connecting to WiFi...");
  WiFi.begin(ssid, password);

  while (WiFi.status() != WL_CONNECTED) {
    delay(1000);
    Serial.print(".");
  }

  Serial.println();
  Serial.println("Connected to WiFi");
}

void reconnectWifi() {
  if (WiFi.status() != WL_CONNECTED) {
    Serial.println("WiFi connection lost. Reconnecting...");
    connectToWiFi();
  }
}

//verifica se houve mudança de roteador 
void changing_BSSID() {
  if (WiFi.BSSIDstr() != BSSID) {
    BSSID = WiFi.BSSIDstr();
    Serial.println("New Router BSSID:" + BSSID);
  }
}

//struct para armazenar dados do wifi
struct RouterInfo {
  String BSSID;
  int RSSI;
};

//salva todos os roteadores
std::vector<RouterInfo> routers;

//scan de wifi que retorna todos os wifis na região em um vetor
std::vector<RouterInfo> scanWifi() {
  std::vector<RouterInfo> routers;
  int n = WiFi.scanNetworks();
  if (n == 0) {
    Serial.println("no networks found");
  } else {
    Serial.print(n);
    Serial.println(" networks found");
    for (int i = 0; i < n; ++i) {
      if (WiFi.BSSIDstr(i) == BSSID) {
        continue;
      } else {
        RouterInfo router;
        router.BSSID = WiFi.BSSIDstr(i);
        router.RSSI = WiFi.RSSI(i);

        routers.push_back(router);
      }
    }  
  }
  return routers;
}
void setRouterInfo() {
  if (millis() - timer_scan > delay_scanWifi) {
    routers = scanWifi();

    timer_scan = millis();
  }
}

#endif