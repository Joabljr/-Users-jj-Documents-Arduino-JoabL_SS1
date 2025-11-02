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

let serial; // declare variable for an instance of the serialport library
let portName = '/dev/tty.usbserial-110';  // fill in your serial port name here
let options = { baudRate: 9600}; // change the baud rate to match your Arduino code



//let inData = 0; // variable for storing incoming serial data//
let sensors = [0, 0, 0, 0]; // array to hold sensor values: [button1, button2, pot1, pot2]

//let r, g, b; // variables for background color//

 
function setup() //setup function runs once at beginning
{
  //P5 SerialPort Setup
  serial = new p5.SerialPort();             // make a new instance of the serialport library

  serial.on('list', printList);             // set a callback function for the serialport list event
  serial.on('connected', serverConnected);  // set callback for connecting to the server
  serial.on('open', portOpen);              // set callback for the port opening
  serial.on('data', serialEvent);           // set callback for when new data received
  serial.on('error', serialError);          // set callback for errors
  serial.on('close', portClose);            // set callback for closing the port

  serial.list();                            // list the serial ports
  serial.open(portName, options);           // open a serial port

  //port = createSerial();//

  //TYPICAL P5.JS SETUP
  createCanvas(800, 800); //set size of canvas
  textSize(64); // set text size
  textAlign(CENTER, CENTER);  // set text alignment
  strokeWeight(5); // set stroke weight
  stroke(1000); // set stroke color
}

function draw() //  draw function loops forever at frame rate
{
 
  let x = map(sensors[2], 0, 1023, 0, width);
let y = map(sensors[3], 0, 1023, 0, height);


  background(30);
  fill(mouseX, mouseY, 255);

    ellipse(80, y, 80, 80);
    ellipse(x, 80, 80, 80);
    rect(x, y, 200, 40);


  line(500, 105, 500, 500);


}

function printList(portList) // gets called when the serial.list() function is called
{
  print("List of Available Serial Ports: ");
  for (var i = 0; i < portList.length; i++) 
  {
    print(i + portList[i]); //print list of available serial ports to console
  }
}

function serverConnected() //gets called when we connect to the serial server
{
  print("CONNECTED TO SERVER");
}
 
function portOpen() //gets called when the serial port opens
{
  print("SERIAL PORT OPEN");
}
 
function serialEvent() //gets called when new data arrives
{
  let inString = serial.readStringUntil('\n'); // read until newline character
  if (inString.length > 0) //if there's data in the string
  {
    sensors = split(inString, ','); // split the string at commas and store in array
    
    for (let i = 0; i < sensors.length; i++) 
    {
      // Number() function converts string to number
      sensors[i] = Number(sensors[i]); // convert every element in array to numbers

      // You can also use parseInt() function, which takes a second argument for the base (radix).
      // A base of 10 is for decimal numbers, base of 16 is for hexadecimal, base of 2 is for binary.
      // sensors[i] = parseInt(sensors[i], 10); // converts every element in array to decimal number
    }
    //print(sensors);
    //print("Received:", sensors);
  } 

  /*let str = port.readLine();
  if (str.length > 0) {
    let values = split(trim(str), ',');
    if (values.length === 2) {
      xVal = int(values[0]);
      yVal = int(values[1]);
    }
  }*/
}
 
function serialError(err) //gets called when there's an error
{
  print('ERROR: ' + err);
}
 
function portClose() //gets called when the serial port closes
{
  print("*____SERIAL PORT CLOSED");
}