// ESP32-S3 sketch: continuously send 4 sensor values
const int adcPin_1 = 1;    // potentiometer 1 (ADC1_CH0)
const int adcPin_2 = 2;    // potentiometer 2 (ADC1_CH1)
const int buttonPin_1 = 41; // button bigger
const int buttonPin_2 = 42; // button smaller
const int ledPin = 4;       // optional LED actuator

void setup() {
  Serial.begin(9600);
  pinMode(buttonPin_1, INPUT_PULLUP);
  pinMode(buttonPin_2, INPUT_PULLUP);
  pinMode(ledPin, OUTPUT);
}

void loop() {
  int pot1 = analogRead(adcPin_1);
  int pot2 = analogRead(adcPin_2);
  int b1 = (digitalRead(buttonPin_1) == LOW) ? 1 : 0;
  int b2 = (digitalRead(buttonPin_2) == LOW) ? 1 : 0;

  Serial.print("DATA,");
  Serial.print(pot1);
  Serial.print(",");
  Serial.print(pot2);
  Serial.print(",");
  Serial.print(b1);
  Serial.print(",");
  Serial.println(b2);

  delay(50); // send ~20 times per second
}