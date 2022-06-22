#include <dht.h>

dht DHT;

#define DHT11_PIN 2
#define DELAY 5000

unsigned long timestamp = 0;

void setup(){
  Serial.begin(9600);
}

void loop(){
  unsigned long currentTimestamp = millis();
  if (currentTimestamp - timestamp < DELAY){
    return;
  }
  timestamp = currentTimestamp;
  
  int chk = DHT.read11(DHT11_PIN);
  switch (chk)
  {
    case DHTLIB_OK:
      printData();
      break;
    case DHTLIB_ERROR_CHECKSUM: 
      printError(1);
      return;
    case DHTLIB_ERROR_TIMEOUT: 
      printError(2);
      return;
    default: 
      printError(3); 
      return;
  }
}

void printData(){
    Serial.print("{ temperature: ");
    Serial.print((int)DHT.temperature);
    Serial.print(", humidity: ");
    Serial.print((int)DHT.humidity);
    Serial.println("}");
}

void printError(int code){
  Serial.print("Error: code ");
  Serial.println(code);
}
