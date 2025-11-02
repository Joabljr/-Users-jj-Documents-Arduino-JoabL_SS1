//Define Pins
const int adcPin_1 = 1;
const int adcPin_2 = 2;
const int buttonPin_1 = 19;
const int buttonPin_2 = 20;

//Button Variables
bool buttonState_1 = 0;
bool buttonState_2 = 0;

//Pot Variables
int adcRead_1 = 0;
int adcRead_2 = 0;

void setup() 
{
  pinMode(buttonPin_1, INPUT_PULLUP);
  pinMode(buttonPin_2, INPUT_PULLUP);
  analogReadResolution(10);
  Serial.begin(9600);
  pinMode(19, INPUT_PULLUP);
  Serial.begin(9600);
}


void loop() 
{
  adcRead_1 = analogRead(adcPin_1);
  adcRead_2 = analogRead(adcPin_2);
  buttonState_1 = !digitalRead(buttonPin_1);
  buttonState_2 = !digitalRead(buttonPin_2);

  Serial.println(!digitalRead(19)); // prints 1 when pressed
  delay(100);

  Serial.print(buttonState_1);
  Serial.print(',');
  Serial.print(buttonState_2);
  Serial.print(',');
  Serial.print(adcRead_1);
  Serial.print(',');
  Serial.println(adcRead_2);  // newline ends the message

  delay(30);
}