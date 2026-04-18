import * as THREE from 'three';

const models = [""];

/**
 * @param x Coordinates
 * @param y
 * @param scale  State of growth, float between 0 and 1
 * @param model GLTF/GLB object
 */
export class Plant{
    constructor(x, y, scale, model){
        this.x = x;
        this.y = y;
        this.scale = scale;
        this.model = model;
    }

    update(t, dt){
        this.animate()
    }

    animate(){

    }
}