#ifndef WIFI_H
#define WIFI_H

#include <WiFi.h>
#include <vector>
#include <string.h>

struct RouterInfo {
  String SSID;
  String BSSID;
  int RSSI;
};

const char* ssid = "";
const char* password = "";

String BSSID;

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

void changing_BSSID() {
  if (WiFi.BSSIDstr() != BSSID) {
    BSSID = WiFi.BSSIDstr();
    Serial.println("New Router BSSID:" + BSSID);
  }
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

//lembrar de filtrar os wifi
void scanWifi() {
  int n = WiFi.scanNetworks();
    if (n == 0) {
        Serial.println("no networks found");
    } else {
        Serial.print(n);
        Serial.println(" networks found");
        for (int i = 0; i < n; ++i) {
            // Print SSID and RSSI for each network found
            Serial.print(i + 1);
            Serial.print(": ");
            Serial.print(WiFi.SSID(i));
            Serial.print(" (");
            Serial.print(WiFi.RSSI(i));
            Serial.println(")");
        }
    }
}
#endif