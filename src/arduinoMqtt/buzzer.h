#ifndef BUZZER_H
#define BUZZER_H

//notas usadas para o buzzer
#define NOTE_G4  392
#define NOTE_G5  784
#define NOTE_C4  262
#define NOTE_C5  523

//gpio buzzer
const int speakerPin = 16; 

//array com músicas
int onSong[] = {NOTE_C4, NOTE_G4, NOTE_C5, NOTE_G5};
int offSong[] = {NOTE_G5, NOTE_C5, NOTE_G4, NOTE_C4};
int errorSong[] = {NOTE_G5, NOTE_G5, NOTE_G5, NOTE_G5};

int noteDurations[] = {
  8, 8, 8, 8
};

const int onSongSize = sizeof(onSong) / sizeof(onSong[0]);
const int offSongSize = sizeof(offSong) / sizeof(offSong[0]);
const int errorSongSize = sizeof(errorSong) / sizeof(errorSong[0]);


void initBuzzer() {
  ledcSetup(0, 2000, 8); // Channel 0, 2kHz frequency, 8-bit resolution -- 0, 2000, 8
  ledcAttachPin(speakerPin, 0); // Attach the speaker pin to channel 0
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

#endif
