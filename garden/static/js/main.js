import * as THREE from 'three';
import { GLTFLoader } from 'three/addons/loaders/GLTFLoader.js';
import { Plant }  from './plant.js';

let scene, camera, renderer, timer, loader;
let plants = {};
let plantDescriptors = [];
let mouseX = 0;
let mouseY = 0;
let windowHalfX = window.innerWidth / 2;
let windowHalfY = window.innerHeight / 2;

const canvas = document.getElementById('gardenCanvas');

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
    scene.background = new THREE.Color(0xa1ee6d); 

    // Add plane
    const geometry = new THREE.PlaneGeometry(5, 5);
    const material = new THREE.MeshBasicMaterial({ color: 0xa1ee6d, side: THREE.DoubleSide });
    const plane = new THREE.Mesh(geometry, material);

    plane.rotation.x = Math.PI / 2;
    scene.add(plane);


    /**
     * Set perspective camera
     */
    camera = new THREE.PerspectiveCamera(60, canvas.clientWidth / canvas.clientHeight, 0.001, 1000);
    //camera = new THREE.PerspectiveCamera(60, 1, 0.001, 1000);
    camera.position.z = 5;

    const ambientLight = new THREE.AmbientLight(0xffffff);
    ambientLight.intensity = 5;
    scene.add( ambientLight );

    timer = new THREE.Timer();
    timer.connect( document ); 

    /**
     * Set renderer
     */
    renderer = new THREE.WebGLRenderer({canvas});
    renderer.setSize( window.innerWidth, window.innerHeight );

    console.log(plantDescriptors);
    for (let plantDescriptor of plantDescriptors) {
        generatePlant(plantDescriptor);
    }

    renderer.setAnimationLoop( animate );
    document.body.appendChild( renderer.domElement );

}


function generatePlant(plantDescriptor) {
    const plantData = plantDescriptor.fields;
    const url = `/static/models/Flowers.glb`; //test
    try {
        loader.load(url, (gltf) => {
            const plant = new Plant(
                plantDescriptor.pk,
                plantData.x, 
                plantData.y, 
                plantData.scale,
                gltf,
            );
            plants[plantDescriptor.pk] = plant;
            scene.add(plant.model.scene);
        })
    }catch(error){
        console.log(error);
    }
}

function updatePlants(){
    for(let plantDescriptor of plantDescriptors){
        if(plantDescriptor.pk in plants){
            plants[plantDescriptor.pk].scale = plantDescriptor.fields.scale;
        }else{
            generatePlant(plantDescriptor);
        }
    }
}

function animate() {
    
    timer.update();
    const t  = timer.getElapsed();
    const dt = timer.getDelta();

    for (const id in plants) {
        plants[id].update(t, dt);
    }

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
    updatePlants();
    console.log(plantDescriptors);
}