import * as THREE from 'three';
import { GLTFLoader } from 'three/addons/loaders/GLTFLoader.js';
import { Plant }  from './plant.js';

let scene, camera, renderer, timer, loader;
let plantDescriptors = [];
let mouseX = 0;
let mouseY = 0;
let windowHalfX = window.innerWidth / 2;
let windowHalfY = window.innerHeight / 2;

/**
 * Add eventlisteners
 */
document.addEventListener( 'mousemove', onDocumentMouseMove );
const sendButton = document.getElementById("testData");
sendButton.addEventListener('click', () => sendData(40));

await fetchGarden();

init();


/**
 * scene init
 */
async function init(){
    
    loader = new GLTFLoader();

    scene = new THREE.Scene();
    scene.add(new THREE.GridHelper(2));
    scene.add(new THREE.AxesHelper(2));

    /**
     * Set perspective camera
     */
    camera = new THREE.PerspectiveCamera(60, 1, 0.001, 1000);
    camera.position.z = 5;

    const ambientLight = new THREE.AmbientLight(0x0058ff);
    ambientLight.intensity = 4;
    scene.add( ambientLight );

    timer = new THREE.Timer();
    timer.connect( document ); 

    /**
     * Set renderer
     */
    renderer = new THREE.WebGLRenderer({alpha: true});
    renderer.setSize( window.innerWidth, window.innerHeight );

    console.log(plantDescriptors);
    generatePlants(plantDescriptors);

    renderer.setAnimationLoop( animate );
    document.body.appendChild( renderer.domElement );

}

function generatePlants(plantDescriptors) {
    console.log(plantDescriptors);
    
    for (let plantDescriptor of plantDescriptors) {
        const plantData = plantDescriptor.fields;
        const url = `/static/models/Flowers.glb`; //test
        
        console.log(plantData.x);
        try {
            loader.load(url, (gltf) => {
                const plant = new Plant(
                    plantData.x, 
                    plantData.y, 
                    plantData.scale,
                    gltf,
                );
                scene.add(plant.model.scene);
            })
        }catch(error){
            console.log(error);
        }
    }
}

function animate() {
    
    timer.update();
    const t  = timer.getElapsed()*1000;
    const dt = timer.getDelta()*1000;

    camera.position.x += ( mouseX - camera.position.x ) * .05;
    camera.position.y += ( - (mouseY -  windowHalfY/100) - camera.position.y ) * .05;
    
    camera.lookAt( scene.position );

    renderer.render( scene, camera );
}

function onDocumentMouseMove( event ) {

    mouseX = ( event.clientX - windowHalfX ) / 100;
    mouseY = ( event.clientY - windowHalfY ) / 100;

}

async function sendData(data){
    console.log('sending data');
    await fetch('/data/?value=40')
    .then(
        fetchGarden()
    )
}

async function fetchGarden(){
    const res = await fetch('/garden/');
    plantDescriptors = await res.json();
    console.log(plantDescriptors);
}