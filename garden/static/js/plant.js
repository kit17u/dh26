import * as THREE from 'three';

/**
 * @param x Coordinates
 * @param y
 * @param scale  State of growth, float between 0 and 1
 * @param model loaded GLTF/GLB object
 */
export class Plant{
    constructor(x, y, scale, model){
        this.x = x;
        this.y = y;
        this.scale = scale;
        this.model = model;

        this.mixer = new THREE.AnimationMixer( this.model.scene );

        const animations = this.model.animations;
        this.action = this.mixer.clipAction( animations[0] );
        this.action.play();
    }

    update(t, dt){
        this.animate(dt);
    }

    animate(dt){
        this.mixer.update(dt);
    }
}