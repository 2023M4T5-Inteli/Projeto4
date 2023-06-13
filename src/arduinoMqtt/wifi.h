#ifndef WIFI_H
#define WIFI_H

#include <WiFi.h>
#include <vector>
#include <string.h>

const char* ssid = "Inteli-COLLEGE";
const char* password = "QazWsx@123";

//uint8_t BSSID;
String BSSID;  // Define BSSID as an array of uint8_t with a length of 6

void initWifi() {
  WiFi.mode(WIFI_STA);

  // Connect to Wi-Fi network
  WiFi.begin(ssid, password);
  while (WiFi.status() != WL_CONNECTED) {
    delay(1000);
    Serial.println("Connecting to WiFi...");
  }
  Serial.println("Connected to WiFi");
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

void changing_BSSID() {
  if (WiFi.BSSIDstr() != BSSID) {
    BSSID = WiFi.BSSIDstr();
    Serial.println("New Router BSSID:" + BSSID);
  }
}

struct RouterInfo {
  String BSSID;
  int RSSI;
};

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
#endif