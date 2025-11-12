const int ledPin = 5;
String input = "";
bool blinkMode = false;
unsigned long lastBlink = 0;
bool ledOn = false;

void setup() {
  Serial.begin(115200);
  pinMode(ledPin, OUTPUT);
  digitalWrite(ledPin, LOW);
  Serial.println("ARDUINO_LED_READY");
}

void loop() {
  // Read serial input
  while (Serial.available()) {
    char c = Serial.read();
    if (c == '\n') {
      handleCommand(input);
      input = "";
    } else if (c != '\r') {
      input += c;
    }
  }

  // Blink mode logic
  if (blinkMode && millis() - lastBlink > 500) {
    lastBlink = millis();
    ledOn = !ledOn;
    digitalWrite(ledPin, ledOn);
    Serial.print("BLINK:");
    Serial.println(ledOn ? "ON" : "OFF");
  }
}

void handleCommand(String cmd) {
  cmd.trim();
  if (cmd == "MODE:BLINK") {
    blinkMode = true;
    Serial.println("MODE:BLINK:OK");
  } else if (cmd == "MODE:FOLLOW") {
    blinkMode = false;
    digitalWrite(ledPin, LOW);
    Serial.println("MODE:FOLLOW:OK");
  } else if (cmd.startsWith("LED:")) {
    int val = cmd.substring(4).toInt();
    val = constrain(val, 0, 255);
    digitalWrite(ledPin, val > 127 ? HIGH : LOW);
    Serial.print("LED:");
    Serial.println(val > 127 ? "ON" : "OFF");
  } else {
    Serial.print("ERR:");
    Serial.println(cmd);
  }
}