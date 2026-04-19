#include <array>
#include "HX711.h"
HX711 loadcell;

float prev = 0;

const int LOADCELL_DOUT_PIN = 6;
const int LOADCELL_SCK_PIN = 7;

const long LOADCELL_OFFSET = 0;
const long LOADCELL_DIVIDER = 435;
const float DETECTION_THRESHOLD = 2;
const int ARR_SIZE = 6;
float previousWeights[ARR_SIZE] = {-100, -100, -100, -100, -100, -100}; 
float waterMass = 0;
bool first = true;
bool emptyPlater = false;
bool emptyPlaterSkip = false;

void setup() {
Serial.begin(9600);
loadcell.begin(LOADCELL_DOUT_PIN, LOADCELL_SCK_PIN);
loadcell.tare();
loadcell.set_scale(LOADCELL_DIVIDER);
}

int findSubstraction(float num){
  	for(int i = 1; i < ARR_SIZE; i++){
        if (previousWeights[i] >= num - 2 && previousWeights[i] <= num + 2){
            return i;
        }
    }
    return -1;
}

float findBiggest(int max){
    float prev = 0;
    float biggest = -1;
  	for(int i = 0; i <= max; i++){
        if((biggest < previousWeights[i]) && (abs(previousWeights[i+1]) < 2)){
            biggest = previousWeights[i];
        }
        prev = previousWeights[i];
    }
    return biggest;
}

float findFirst(){
    float prev = 0;
    float biggest = -1;
  	for(int i = 0; i < ARR_SIZE - 1; i++){
        if((biggest < previousWeights[i])){
            biggest = previousWeights[i];
        }
        if((-100 == previousWeights[i+1])||(previousWeights[i+1])){
          break;
        }
        prev = previousWeights[i];
    }
    return biggest;
}

void cycleArray(){
	for(int i = 0; i < ARR_SIZE; i++){
        Serial.print(previousWeights[i]); 
        Serial.print(" : ");
    }
    Serial.println();
}

void shiftArray(float newElement){
	for(int i = (ARR_SIZE - 1); i >= 1; i--){
        previousWeights[i] = previousWeights[i-1];   
    }
    previousWeights[0] = newElement;
}

void loop(){
  float weight = loadcell.get_units(10);

  if(abs(weight - prev) > DETECTION_THRESHOLD){
    if(emptyPlaterSkip){
      delay(5000);
      emptyPlaterSkip = false;
      return;
    }

    shiftArray(weight);
    if(emptyPlater){
        int prevZero = (findSubstraction(0));
        if(first){
          float diff = waterMass - findFirst();	
          waterMass = waterMass - diff;
          Serial.println(diff);
          first = false;
        } else if (prevZero >= 0){
          float diff = waterMass - findBiggest(prevZero);
          waterMass = waterMass - diff;
          Serial.println(diff);
        }

        emptyPlater = false;
        return;
    } else {
      delay(1000);
    }

    if(abs(weight) < 2){
      emptyPlater = true;
      emptyPlaterSkip = true;
    }
    
    prev = weight;
  } else {
    delay(1000);
  }

  if ((weight > (waterMass + 2) ) && !emptyPlater) {
    waterMass = weight;
  }

}

