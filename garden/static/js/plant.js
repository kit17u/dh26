import * as THREE from 'three';

const models = [""];

/**
 * @param x Coordinates
 * @param y
 * @param scale  State of growth, float between 0 and 1
 * @param plant_model Index of the model
 */
export class Plant{
    constructor(x, y, scale, plant_model){
        this.x = x;
        this.y = y;
        this.scale = scale;
        this.plant_model = plant_model;
    }

    update(t, dt){
        this.animate()
    }

    animate(){

    }
}