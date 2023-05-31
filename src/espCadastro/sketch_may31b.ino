// entradas conexão ESP32 com RFID
// SDA -> 21
// SCK -> 18
// MOSI -> 23
// MISO -> 19
// RST -> 22
// GND -> GND
// 3.3V -> 3.3V

// INCLUSÃO DE BIBLIOTECAS
#include <Wire.h>
#include <LiquidCrystal_I2C.h>
#include <SPI.h>  //biblioteca para comunicação do barramento SPI
#include <MFRC522.h>

// DEFINIÇÕES
#define endereco 0x27  // Endereços comuns: 0x27, 0x3F
#define colunas 16
#define linhas 2
#define SS_PIN 21
#define RST_PIN 22
#define SDA_PIN 17
#define SCL_PIN 16

// INSTANCIANDO OBJETOS
LiquidCrystal_I2C lcd(endereco, colunas, linhas);
// esse objeto 'chave' é utilizado para autenticação
MFRC522::MIFARE_Key key;
//código de status de retorno da autenticação
MFRC522::StatusCode status;
// Definicoes pino modulo RC522
MFRC522 mfrc522(SS_PIN, RST_PIN);
String RFID = "";


void setup() {
  Serial.begin(115200);
  while (!Serial)
    ;           // Aguarda a abertura da porta serial
  SPI.begin();  // Init SPI bus
  // Inicia MFRC522
  mfrc522.PCD_Init();
  Serial.println("Monitor serial conectado.");
  mfrc522.PCD_DumpVersionToSerial();  // Imprime a versão do firmware do módulo RFID
  Serial.println("MFRC522 Initialized");

  mensageminicial();  // Funcao mensagem inicial
}

void loop() {

  if (mfrc522.PICC_IsNewCardPresent() && mfrc522.PICC_ReadCardSerial()) {
    RFID = getRFIDValue();
    Serial.print("UID: ");
    Serial.println(RFID);
    mfrc522.PICC_HaltA();
    mfrc522.PCD_StopCrypto1();
    RFID.toUpperCase();

    lcd.clear();
    lcd.setCursor(0, 0);
    lcd.print(" RFID DETECTADO ");
    lcd.setCursor(0, 1);
    lcd.print("  UID:");
    lcd.print(RFID);

    delay(1000);

    lcd.clear();
    lcd.setCursor(0, 1);
    lcd.print("  UID:");
    lcd.print(RFID);

    delay(1000);

    static int progress = 0;

    for (int i = 0; i < 100; i++) {
      progress++;
      lcd.setCursor(progress / (100 / colunas), 0);
      lcd.print("#");

      Serial.println(progress);
      delay(200);
    }

    if (progress >= 100) {
      progress = 0;
      lcd.clear();
      mensageminicial();
    }
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

// Funcao mensagem inicial
void mensageminicial() {
  Wire.begin(SDA_PIN, SCL_PIN);  // Inicia a comunicação I2C nos pinos SDA e SCL desejados
  // lcd.begin(LCD_COLUMNS, LCD_ROWS);  // Inicia o display LCD
  lcd.init();       // INICIA A COMUNICAÇÃO COM O DISPLAY
  lcd.backlight();  // LIGA A ILUMINAÇÃO DO DISPLAY
  lcd.clear();      // LIMPA O DISPLAY
  lcd.print("  Leitor RFID  ");
  lcd.setCursor(0, 1);
  lcd.print(" *** pronto *** ");
}