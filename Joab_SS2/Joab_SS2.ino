// pin definitions
const int ledPinA     = 4;
const int ledPinB     = 5;
const int ledPinC     = 17;
const int ledPinD     = 18;
const int buttonPin   = 8;     

int  currentLED      = 0;      
int  lastButtonState = HIGH;   
int  currentButtonState;

void setup() {
  Serial.begin(115200);

  // configure LEDs as outputs, start them all OFF
  pinMode(ledPinA, OUTPUT);
  pinMode(ledPinB, OUTPUT);
  pinMode(ledPinC, OUTPUT);
  pinMode(ledPinD, OUTPUT);
  digitalWrite(ledPinA, LOW);
  digitalWrite(ledPinB, LOW);
  digitalWrite(ledPinC, LOW);
  digitalWrite(ledPinD, LOW);

  // configure button with internal pull-up
  pinMode(buttonPin, INPUT_PULLUP);
}

void loop() {
  
  currentButtonState = digitalRead(buttonPin);


  if (lastButtonState == HIGH && currentButtonState == LOW) {
    delay(50);
    if (digitalRead(buttonPin) == LOW) {
    
      currentLED = currentLED + 1;

    
      if (currentLED > 4) {
        currentLED = 0;
      }

    
      Serial.print("State: ");
      if (currentLED < 4) Serial.println(currentLED);
      else                Serial.println("All Off");
    }
  }
  lastButtonState = currentButtonState;

  
  digitalWrite(ledPinA, LOW);
  digitalWrite(ledPinB, LOW);
  digitalWrite(ledPinC, LOW);
  digitalWrite(ledPinD, LOW);

  
  if      (currentLED == 0) digitalWrite(ledPinA, HIGH);
  else if (currentLED == 1) digitalWrite(ledPinB, HIGH);
  else if (currentLED == 2) digitalWrite(ledPinC, HIGH);
  else if (currentLED == 3) digitalWrite(ledPinD, HIGH);
}