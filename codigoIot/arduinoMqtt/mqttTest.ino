#include <WiFi.h>
#include <PubSubClient.h>

#include <MFRC522.h>
#include <SPI.h> //biblioteca para comunicação do barramento SPI

#include <ArduinoJson.h>

#define SS_PIN    21
#define RST_PIN   22
#define SIZE_BUFFER     18
#define MAX_SIZE_BLOCK  16

//song

#define NOTE_G4  392
#define NOTE_G5  784
#define NOTE_C4  262
#define NOTE_C5  523

const int speakerPin = 16; // GPIO pin connected to the speaker or buzzer

int onSong[] = {NOTE_C4, NOTE_G4, NOTE_C5, NOTE_G5};
int offSong[] = {NOTE_G5, NOTE_C5, NOTE_G4, NOTE_C4};
int errorSong[] = {NOTE_G5, NOTE_G5, NOTE_G5, NOTE_G5};

int noteDurations[] = {
  8, 8, 8, 8
};

int tempo = 120; // Adjust the tempo as desired

//esse objeto 'chave' é utilizado para autenticação
MFRC522::MIFARE_Key key;
//código de status de retorno da autenticação
MFRC522::StatusCode status;
// Definicoes pino modulo RC522
MFRC522 mfrc522(SS_PIN, RST_PIN);

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

String RFID = "";

void changing_BSSID() {
  if (WiFi.BSSIDstr() != BSSID) {
    BSSID = WiFi.BSSIDstr();
    Serial.println("New Router BSSID:" + BSSID);
  }
}

void setup() {
  // Start serial communication
  Serial.begin(115200);

  SPI.begin(); // Init SPI bus
  // Inicia MFRC522
  mfrc522.PCD_Init();

  ledcSetup(0, 2000, 8); // Channel 0, 2kHz frequency, 8-bit resolution
  ledcAttachPin(speakerPin, 0); // Attach the speaker pin to channel 0

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
  read_rfid();
  if (millis() - timer > delay_time) {
    StaticJsonDocument<200> payload;
    payload["BSSID"] = BSSID;
    payload["RFID"] = RFID;

    String json_payload;
    serializeJson(payload, json_payload);

    client.publish(mqttTopic, json_payload.c_str());
    timer = millis();
  }
}

void read_rfid() {
  if (mfrc522.PICC_IsNewCardPresent() && mfrc522.PICC_ReadCardSerial()) {
    //RFID = getRFIDValue();
    String newRFID = getRFIDValue();
    if (RFID == "") {
      RFID = newRFID;
      playMelody(onSong, noteDurations, sizeof(onSong) / sizeof(onSong[0]));
    } else if (RFID == newRFID) {
      RFID = "";
      playMelody(offSong, noteDurations, sizeof(offSong) / sizeof(offSong[0]));
    } else {
      playMelody(errorSong, noteDurations, sizeof(errorSong) / sizeof(errorSong[0]));
    }

    Serial.print("UID: ");
    Serial.println(RFID);

    mfrc522.PICC_HaltA();
    mfrc522.PCD_StopCrypto1();
  }
}

String getRFIDValue() {
  String uid = "";
  for (byte i = 0; i < mfrc522.uid.size; i++) {
    uid += String(mfrc522.uid.uidByte[i] < 0x10 ? "0" : "");
    uid += String(mfrc522.uid.uidByte[i], HEX);
  }
  return uid;
}

void playMelody(int melody[], int noteDurations[], int melodyLength) {
  for (int thisNote = 0; thisNote < melodyLength; thisNote++) {
    int noteDuration = 1000 / noteDurations[thisNote];

    ledcWriteTone(0, melody[thisNote]);
    delay(noteDuration);

    ledcWriteTone(0, 0); // Stop the tone
    delay(50); // Pause between tones
  }
}