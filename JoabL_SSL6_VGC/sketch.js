let serial; // variable for instance of the serialport library
let portName = '/dev/tty.usbserial-110'; // fill in your serial port name
let options = { baudRate: 9600 }; // change the baud rate to match your Arduino code

let sensorData = { up: 0, down: 0, big: 0, small: 0 };
let shapeY = 300;
let shapeSize = 50;

function setup() {
  createCanvas(800, 600);

  // P5 SerialPort Setup
  serial = new p5.SerialPort();             // make a new instance of the serialport library
  serial.on('list', printList);             // set a callback function for the serialport list event
  serial.on('connected', serverConnected);  // set callback for connecting to the server
  serial.on('open', portOpen);              // set callback for the port opening
  serial.on('data', gotData);               // set callback for when new data received
  serial.on('error', serialError);          // set callback for errors
  serial.on('close', portClose);            // set callback for closing the port
  serial.list();                            // list the serial ports
  serial.open(portName, options);           // open a serial port
}

function draw() {
  background(30);

  // Move shape up/down based on pots
  let upForce = map(sensorData.up, 0, 1023, 0, 5);
  let downForce = map(sensorData.down, 0, 1023, 0, 5);
  shapeY -= upForce;
  shapeY += downForce;
  shapeY = constrain(shapeY, 50, height - 50);

  // Resize shape with buttons
  if (sensorData.big === 1) shapeSize += 10;
  if (sensorData.small === 1) shapeSize -= 10;
  shapeSize = constrain(shapeSize, 2, 2000);

fill(255);
text("Up:" + sensorData.up + " Down:" + sensorData.down, 20, 20);
text("Big:" + sensorData.big + " Small:" + sensorData.small, 20, 40);

  // Draw primitives
  fill(200, 50, 50);
  ellipse(width / 2, shapeY, shapeSize, shapeSize); // circle
  fill(50, 200, 50);
  //rect(width / 2 - 40, shapeY + 60, 80, 20); // rectangle
  stroke(255);
  //line(width / 2, shapeY, width / 2, height); // line

  // Request sensor data each frame
  serial.write("REQUEST\n");
}

// --- Serial Event Handlers ---

function gotData() {
  let incoming = serial.readLine();
  if (incoming.length > 0) {
    let parts = split(trim(incoming), ',');
    if (parts[0] === "DATA") {
      sensorData.up = int(parts[1]);     // pot1 → X
      sensorData.down = int(parts[2]);   // pot2 → Y
      sensorData.big = int(parts[3]);    // button1
      sensorData.small = int(parts[4]);  // button2
    }
  }
}

function printList(portList) {
  print("List of Available Serial Ports:");
  for (let i = 0; i < portList.length; i++) {
    print(i + ": " + portList[i]);
  }
}

function serverConnected() {
  print("CONNECTED TO SERIAL SERVER");
}

function portOpen() {
  print("SERIAL PORT OPEN");
}

function portClose() {
  print("SERIAL PORT CLOSED");
}

function serialError(err) {
  print("SERIAL ERROR: " + err);
}