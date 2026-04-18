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
        this.speed = 1 + Math.random();
        this.model.scene.scale.set(0.5, 0.5, 0.5); 
        //TODO: define each model and attach custom material
        /*
        this.flower = model.scene.getObjectByName(!);
        this.*/
        const material = new THREE.Material()

        this.model.scene.position.x = this.x * 10 - 5;
        this.model.scene.position.z = this.y * 10 - 5;
        /*for(let mesh of this.model.scene){
            mesh.scale *= 0.5;
        }*/

        this.mixer = new THREE.AnimationMixer( this.model.scene );

        const animations = this.model.animations;
        this.action1 = this.mixer.clipAction( animations[0] );
        this.action1.play();
        this.action2 = this.mixer.clipAction( animations[1] );
        this.action2.play();
    }

    update(t, dt){
        this.animate(dt);
    }

    animate(dt){
        this.mixer.update(dt*this.speed);
    }
}