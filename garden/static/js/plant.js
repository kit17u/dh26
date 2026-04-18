import * as THREE from 'three';

/**
 * @param x Coordinates
 * @param y
 * @param scale  State of growth, float between 0 and 1
 * @param model loaded GLTF/GLB object
 */
export class Plant{
    constructor(id, x, y, scale, model){
        this.id    = id;
        this.x     = x;
        this.y     = y;
        this.scale = scale;
        this.model = model;
        this.speed = 1 + Math.random();
         
        //TODO: define each model and attach custom material
        /*
        this.flower = model.scene.getObjectByName(!);
        this.*/
        const material = new THREE.Material()
        const scaleFactor = 0.2;
        this.model.scene.position.x = this.x * 5 - 2.5;
        this.model.scene.position.z = this.y * 5 - 2.5;
        this.model.scene.scale.set(scaleFactor, scaleFactor, scaleFactor);
        /*for(let mesh of this.model.scene){
            mesh.scale *= 0.5;
        }*/

        this.mixer = new THREE.AnimationMixer( this.model.scene );

        const animations = this.model.animations;
        this.action1 = this.mixer.clipAction( animations[0] );
        this.action1.clampWhenFinished = true;
        this.action1.loop = THREE.LoopOnce;
        this.action1.time = 0;
        this.action1.play();

        this.action2 = this.mixer.clipAction( animations[1] );
        this.action2.clampWhenFinished = true;
        this.action2.loop = THREE.LoopOnce;
        this.action2.time = 0;
        this.action2.play();

        this.mixer.addEventListener('finished', (e) => {
            this.action1.paused = true;
            this.action2.paused = true;
        });
    }

    update(t, dt){
        //  Check if scale changed
        const currentAnimState = (1/this.action1.getClip().duration)*this.action1.time;
        if(this.scale > currentAnimState){
            this.grow()
        }
        this.animate(dt);
    }

    animate(dt){
        this.mixer.update(dt*this.speed);

        // Only allow to grow until it reaches scale
        const currentAnimState = (1/this.action1.getClip().duration)*this.action1.time;
        if (currentAnimState >= this.scale) {
            this.action1.paused = true;
            this.action2.paused = true;
        }
    }

    // Resume animation
    grow() {
        this.action1.paused = false;
        this.action2.paused = false;
    }
}