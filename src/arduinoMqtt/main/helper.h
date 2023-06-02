#ifndef HELPER_H
#define HELPER_H

/*
This code includes necessary libraries for the project.

WiFi.h: Library for WiFi communication.
SPI.h: Library for SPI bus communication.
MFRC522.h: Library for communication with MFRC522 RFID module.
PubSubClient.h: Library for MQTT communication.
ArduinoJson.h: Library for handling JSON data.
These libraries provide the required functionality for various aspects of the project such as WiFi connectivity, RFID communication, MQTT communication, and handling JSON data. They enable the program to interact with the hardware components and exchange data with a server using MQTT protocol.

The "#ifndef" and "#define" directives ensure that the header file is included only once, preventing multiple definitions if the header file is included in multiple source files.
*/

#include <WiFi.h>
#include <SPI.h> 
#include <MFRC522.h>
#include <PubSubClient.h>
#include <ArduinoJson.h>

//Define constants, variables and objetcts used in the project
#define SS_PIN    21
#define RST_PIN   22
#define SIZE_BUFFER     18
#define MAX_SIZE_BLOCK  16

#define NOTE_G4  392
#define NOTE_G5  784
#define NOTE_C4  262
#define NOTE_C5  523

const int speakerPin = 16; 
int onSong[] = {NOTE_C4, NOTE_G4, NOTE_C5, NOTE_G5};
int offSong[] = {NOTE_G5, NOTE_C5, NOTE_G4, NOTE_C4};
int errorSong[] = {NOTE_G5, NOTE_G5, NOTE_G5, NOTE_G5};
int noteDurations[] = {
  8, 8, 8, 8
};

// This code initializes objects and variables related to the MFRC522 RFID module.
MFRC522::MIFARE_Key key;
MFRC522::StatusCode status; 
MFRC522 mfrc522(SS_PIN, RST_PIN); 

String RFID = "";
String BSSID;

//----------------------//-------------------------//
// Function and variable initialization

/*
This code segment initializes necessary functions and variables for 
the project. The initializeGeneral function sets up the serial communication, 
SPI bus, and the MFRC522 RFID module. The WiFiClient and PubSubClient instances 
establish the connection to the MQTT broker for communication. The timer and 
delay_time variables are used for timing-related operations.
*/

void initializeGeneral(int serial, int channel, int frequency, int bitResolution, int speakerPin){
  Serial.begin(serial); // Start serial communication
  SPI.begin(); 
  mfrc522.PCD_Init(); 

  ledcSetup(channel, frequency, bitResolution); // Channel 0, 2kHz frequency, 8-bit resolution
  ledcAttachPin(speakerPin, speakerPin); // Attach the speaker pin to channel 0
}

// MQTT broker details
WiFiClient espClient; // Create an instance of the WiFiClient class
PubSubClient client(espClient); // Create an instance of the PubSubClient class
unsigned long timer;
unsigned long delay_time = 5000;

//----------------------//-------------------------//
//WiFi functions

/*
The routerChange function also sets the WiFi mode to Station mode 
and checks if the current router's BSSID matches the previously stored 
value. If a change is detected, it updates the BSSID and prints a message
 indicating the new BSSID.
*/

void connectToWifi(char* ssid, char* password){
  WiFi.mode(WIFI_STA);
  WiFi.begin(ssid, password);
  while (WiFi.status() != WL_CONNECTED) {
    delay(1000);
    Serial.println("Connecting to WiFi...");
  }
  Serial.println("Connected to WiFi");
}

void routerChange() {
  WiFi.mode(WIFI_STA);
  if (WiFi.BSSIDstr() != BSSID) {
    BSSID = WiFi.BSSIDstr();
    Serial.println("New Router BSSID:" + BSSID);
  }
}
//----------------------//-------------------------//
// Melody Playing Function

/*
This function provides a convenient way to play melodies 
by specifying the notes, durations, and length of the melody. 
It utilizes the LEDC library to control the speaker or buzzer 
and achieve accurate note durations and sound playback.
*/

void playMelody(int melody[], int noteDurations[], int melodyLength) {
  for (int thisNote = 0; thisNote < melodyLength; thisNote++) {
    int noteDuration = 1000 / noteDurations[thisNote];

    ledcWriteTone(0, melody[thisNote]);
    delay(noteDuration);

    ledcWriteTone(0, 0); // Stop the tone
    delay(50); // Pause between tones
  }
}
//----------------------//-------------------------//
//RFID functions

/*
The provided code presents a set of functions related to RFID 
(Radio-Frequency Identification) functionality. RFID is a technology 
that enables wireless communication between tags and readers, commonly 
used for identification and tracking purposes. The code consists of two 
functions: getRFID() and readRFID(), which collectively facilitate 
reading and processing RFID tag information.

The getRFID() function retrieves the RFID tag value as a string. It accomplishes 
this by iterating over the bytes of the UID (Unique Identifier) of the RFID tag. 
Each byte is converted to its hexadecimal representation and appended to the uid 
string variable. The resulting string is then returned.

The readRFID() function is responsible for reading the RFID tag and initiating 
corresponding actions based on the tag value. It first checks if a new card is 
present and verifies whether the card's serial number has been successfully read 
using the mfrc522 object. Upon successfully reading the tag, it calls the getRFID()
 function to obtain the RFID tag value as a string.
*/

// Function to retrieve the RFID tag value as a string
String getRFID() {
  String uid = "";
  for (byte i = 0; i < mfrc522.uid.size; i++) {
    uid += String(mfrc522.uid.uidByte[i] < 0x10 ? "0" : "");
    uid += String(mfrc522.uid.uidByte[i], HEX);
  }
  return uid;
}

// Function to read the RFID tag and perform actions based on the tag value
void readRFID() {
  if (mfrc522.PICC_IsNewCardPresent() && mfrc522.PICC_ReadCardSerial()) {
    String newRFID = getRFID();
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
//----------------------//-------------------------//
// MQTT functions

/*
The mqttPublisher function is responsible for publishing MQTT messages. 
It checks if a certain amount of time has passed since the last message 
was sent (based on the timer and delay_time variables). If the condition 
is met, it creates a JSON payload using the StaticJsonDocument class from
the ArduinoJSON library. The payload contains two fields: "BSSID" and "RFID,"
which are assigned values from the corresponding variables. The payload is then 
serialized to a JSON string using the serializeJson function. Finally, the message 
is published to the MQTT broker using the client.publish method with the specified 
MQTT topic.

The connectSubscribeMQTT function is responsible for connecting to the MQTT broker 
and subscribing to a topic. It sets the MQTT broker details using the client.setServer 
method. The code enters a loop until the client successfully connects to the MQTT broker
(client.connected() returns true). Inside the loop, it attempts to connect to the broker
using the client.connect method with a specified client ID ("ESP32-fabio-1234"). If the
connection is successful, it prints a message indicating the successful connection. 
If the connection fails, it prints an error message along with the client's state and
waits for 2 seconds before retrying the connection.
*/

void mqttPublisher(String mqttTopic){
  if (millis() - timer > delay_time) {
    StaticJsonDocument<200> payload;
    payload["BSSID"] = BSSID;
    payload["RFID"] = RFID;
    payload["RSSI"] = WiFi.RSSI();
    Serial.println("Sending json to " + String(mqttTopic) + " with " + String(BSSID) + " BSSID, " + String(RFID) + " RFID and " + String(WiFi.RSSI()) + " RSSI.");

    String json_payload;
    serializeJson(payload, json_payload);

    client.publish(mqttTopic.c_str(), json_payload.c_str());
    timer = millis();
  }
}

void connectSubscribeMQTT(char* mqttServer, int mqttPort){
  client.setServer(mqttServer, mqttPort); // Set MQTT broker details

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

#endif
