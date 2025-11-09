/*
P5.JS SERIAL READ STRING

An example p5.js sketch that uses the p5.serialport library to read comma-separated string values from the serial port.
The size and fill color of a circle changes according to the received values, which are also displayed on the canvas.

This code is designed to work with the "Arduino_Serial_Multi_String" example sketch.

NOTES:
- You must run and establish a serial connection with p5.serialcontrol app to use this code:
  https://github.com/p5-serial/p5.serialcontrol/releases/tag/0.1.2

- Remember to add the p5.serialport library to your index.html file. Add this line below <script src="libraries/p5.min.js"></script>:

    <script language="javascript" type="text/javascript" src="https://cdn.jsdelivr.net/npm/p5.serialserver@0.0.28/lib/p5.serialport.js"></script>

- Make sure the baud rate in options matches the baud rate in your Arduino code.
- Remember to change the portName variable to match your own serial port.
*/

let serial;
let portName = '/dev/tty.usbserial-10';
let options = { baudRate: 9600 };
let sensors = [0, 0, 0, 0]; // [button1, button2, pot1, pot2]


function setup() {
  serial = new p5.SerialPort();
  serial.on('list', printList);
  serial.on('connected', serverConnected);
  serial.on('open', portOpen);
  serial.on('data', serialEvent);
  serial.on('error', serialError);
  serial.on('close', portClose);

  serial.list();
  serial.open(portName, options);

  createCanvas(800, 800);
  textSize(64);
  textAlign(CENTER, CENTER);
  strokeWeight(5);
  stroke(100);
}

function draw() {
  let x = map(sensors[2], 0, 1023, 0, width);
  let y = map(sensors[3], 0, 1023, 0, height);

  background(30);

  // Default color
  let r = 200;
  let g = 100;
  let b = 255;

  text(`B1: ${sensors[0]}`, width / 2, height - 120);
text(`B2: ${sensors[1]}`, width / 2, height - 60);

  // Change color based on button presses
  if (sensors[0] === 1) {
  // Button 1 pressed
} else if (sensors[1] === 1) {
  // Button 2 pressed
}
  
  ellipse(80, y, 80, 80);
  ellipse(x, 80, 80, 80);
  rect(x, y, 200, 40);
  line(500, 105, 500, 500);

  fill(r, g, b);
  ellipse(x, y, 80, 80);

console.log("Received:", sensors);}

function serialEvent() {
  let inString = serial.readStringUntil('\n');
  if (inString.length > 0) {
    sensors = split(inString, ',');
    if (sensors.length === 4) {
      for (let i = 0; i < sensors.length; i++) {
        sensors[i] = Number(sensors[i]);
      }
    }
  }
}

function printList(portList) {
  print("List of Available Serial Ports:");
  for (let i = 0; i < portList.length; i++) {
    print(i + portList[i]);
  }
}

function serverConnected() {
  print("CONNECTED TO SERVER");
}

function portOpen() {
  print("SERIAL PORT OPEN");
}

function serialError(err) {
  print('ERROR: ' + err);
}

function portClose() {
  print("*____SERIAL PORT CLOSED");
}