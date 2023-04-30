class Colaborador {
   private:
    String nome;
    String cargo;
    String setor;

   public:
    // Constructor to initialize private variables
    Colaborador(String nome, String cargo, String setor) {
        this->nome = nome;
        this->cargo = cargo;
        this->setor = setor;
    }

    // Function to print object details
    void print() {
        Serial.print("Nome: ");
        Serial.println(nome);
        Serial.print("Cargo: ");
        Serial.println(cargo);
        Serial.print("Setor: ");
        Serial.println(setor);
    }

    String getName() {
        return nome;
    }

    String getCargo() {
        return cargo;
    }

    String getSetor() {
        return setor;
    }
};


Colaborador* colaboradores[10];
int num_colaboradores = 0;


void criando_colaborador(){
    Serial.println("Qual o seu nome?");
    while (Serial.available() == 0) {
    }
    String nome = Serial.readString();

    Serial.println("Qual o seu cargo?");
    while (Serial.available() == 0) {
    }
    String cargo = Serial.readString();

    Serial.println("Qual o seu setor?");
    while (Serial.available() == 0) {
    }
    String setor = Serial.readString();

    Colaborador* novo_colaborador = new Colaborador(nome, cargo, setor);
    if (num_colaboradores < 10) {
        colaboradores[num_colaboradores] = novo_colaborador;
        num_colaboradores++;
        Serial.println("Adicionado");
        novo_colaborador->print();
    } else {
        Serial.println("Lista de colaboradores cheia");
        delete novo_colaborador;
    }
}

void encontrando_colaborador(){
    Serial.println("Qual o nome do colaborador?");
    while (Serial.available() == 0) {
    }
    String nome_buscado = Serial.readString();

    Serial.println("Qual o cargo do colaborador?");
    while (Serial.available() == 0) {
    }
    String cargo_buscado = Serial.readString();

    Serial.println("Qual o setor do colaborador?");
    while (Serial.available() == 0) {
    }
    String setor_buscado = Serial.readString();

    bool encontrado = false;
    for (int i = 0; i < num_colaboradores; i++) {
        Colaborador* c = colaboradores[i];
        if (c->getName() == nome_buscado && c->getCargo() == cargo_buscado && c->getSetor() == setor_buscado) {
            encontrado = true;
            Serial.println("Colaborador encontrado:");
            setColor(0,255,0);
            delay(1000);
            setColor(0,0,0);
            c->print();
            break;
        }
    }
    if (!encontrado) {
        Serial.println("Colaborador nao encontrado");
        setColor(255,0,0);
        delay(1000);
        setColor(0,0,0);
    }
}

const int redPin= 12;
const int greenPin = 14;
const int bluePin = 27;

void setColor(int redValue, int greenValue, int blueValue) {
  analogWrite(redPin, redValue);
  analogWrite(greenPin, greenValue);
  analogWrite(bluePin, blueValue);
}

const int buttonGreen = 18;
const int buttonRed = 19;

void setup() {
    Serial.begin(9600);
    pinMode(redPin, OUTPUT);
    pinMode(greenPin, OUTPUT);
    pinMode(bluePin, OUTPUT);
    pinMode(buttonGreen, INPUT);
    pinMode(buttonRed, INPUT);
    Serial.println("BOTÃO VERDE: CADASTRO DO COLABORADOR");
    Serial.println("BOTÃO VERMELHO: VERIFICAÇÃO DO COLABORADOR");
}

void loop() {


    if (digitalRead(buttonGreen) == HIGH) {
        Serial.end();
        Serial.begin(9600);

        criando_colaborador();
        Serial.println("BOTÃO VERDE: CADASTRO DO COLABORADOR");
        Serial.println("BOTÃO VERMELHO: VERIFICAÇÃO DO COLABORADOR");

    } else if (digitalRead(buttonRed) == HIGH) {
        Serial.end();
        Serial.begin(9600);

        encontrando_colaborador();
        Serial.println("BOTÃO VERDE: CADASTRO DO COLABORADOR");
        Serial.println("BOTÃO VERMELHO: VERIFICAÇÃO DO COLABORADOR");
    }
}