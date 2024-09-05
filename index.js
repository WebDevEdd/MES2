import * as THREE from 'three';
import { OBJLoader } from 'three/addons/loaders/OBJLoader.js';
import { MTLLoader } from 'three/addons/loaders/MTLLoader.js';
import { OrbitControls } from 'three/addons/controls/OrbitControls.js';




const viewer = document.querySelector('.viewer-container');
const scene = new THREE.Scene();
scene.background = new THREE.Color(0xFFF5E1);
const camera = new THREE.PerspectiveCamera( 75, viewer.offsetWidth/viewer.offsetHeight, 0.1, 1000 );


const light = new THREE.AmbientLight( 0x404040, 25 ); // soft white light
const dl = new THREE.DirectionalLight( 0x404040, 80 );
scene.add( dl );
scene.add( light );

const renderer = new THREE.WebGLRenderer();
renderer.setSize( viewer.offsetWidth, viewer.offsetHeight );
renderer.setAnimationLoop( animate );
viewer.appendChild( renderer.domElement );

const controls = new OrbitControls( camera, renderer.domElement );


const loader = new OBJLoader();
const mtlLoader = new MTLLoader();
mtlLoader.load('/OBJfiles/structure v1.mtl', (materials) => {
      materials.preload();
      loader.setMaterials(materials);
      loader.load( '/OBJfiles/structure v1.obj', (object) => {

            scene.add( object );
      },
      function (xhr) {
            // This optional function monitors the progress of the loading process
            console.log((xhr.loaded / xhr.total * 100) + '% loaded');
      },
          function (error) {
            // This optional function runs if there is an error
            console.error('An error occurred while loading the OBJ file:', error);
      })
})

camera.position.z = 25;
controls.update();


function animate() {
	renderer.render( scene, camera );
}