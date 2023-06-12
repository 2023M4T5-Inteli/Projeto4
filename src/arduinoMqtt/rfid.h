#ifndef RFID_H
#define RFID_H

#include <MFRC522.h>
#include <SPI.h> //biblioteca para comunicação do barramento SPI

#include "buzzer.h"

#define SS_PIN    21
#define RST_PIN   22
#define SIZE_BUFFER     18
#define MAX_SIZE_BLOCK  16

//esse objeto 'chave' é utilizado para autenticação
MFRC522::MIFARE_Key key;
//código de status de retorno da autenticação
MFRC522::StatusCode status;
// Definicoes pino modulo RC522
MFRC522 mfrc522(SS_PIN, RST_PIN);

String RFID = "";

void initRfid() {
  SPI.begin(); // Init SPI bus
  // Inicia MFRC522
  mfrc522.PCD_Init();
  initBuzzer();
}

String getRFIDValue() {
  String uid = "";
  for (byte i = 0; i < mfrc522.uid.size; i++) {
    uid += String(mfrc522.uid.uidByte[i] < 0x10 ? "0" : "");
    uid += String(mfrc522.uid.uidByte[i], HEX);
  }
  return uid;
}

void read_rfid() {
  if (mfrc522.PICC_IsNewCardPresent() && mfrc522.PICC_ReadCardSerial()) {
    //RFID = getRFIDValue();
    String newRFID = getRFIDValue();
    if (RFID == "") {
      RFID = newRFID;
      playMelody(onSong, noteDurations, onSongSize);
    } else if (RFID == newRFID) {
      RFID = "";
      playMelody(offSong, noteDurations, offSongSize);
    } else {
      playMelody(errorSong, noteDurations, errorSongSize);
    }

    Serial.print("UID: ");
    Serial.println(RFID);

    mfrc522.PICC_HaltA();
    mfrc522.PCD_StopCrypto1();
  }
}

#endif