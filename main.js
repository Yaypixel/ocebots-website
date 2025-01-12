import * as THREE from 'three';
import { FirstPersonControls } from 'three/examples/jsm/Addons.js';


const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera( 75, window.innerWidth / window.innerHeight, 0.1, 1000 );

const renderer = new THREE.WebGLRenderer();
renderer.setSize( window.innerWidth, window.innerHeight );
document.body.appendChild( renderer.domElement );
camera.position.setZ(30)

renderer.render(scene, camera)


const vector = new THREE.Vector3()

const tourus = new THREE.Mesh(new THREE.TorusGeometry(5,2,16,100), new THREE.MeshStandardMaterial({color: 0xFF6347}))

const pointLight = new THREE.PointLight(0xffffff)

scene.fog = new THREE.FogExp2( 0xeeeeff, 0.02 );

const light = new THREE.HemisphereLight( 0xeeeeff, 0x777788, 2.5 );
light.position.set( 0.5, 1, 0.75 );
scene.add( light );

const lightHelper = new THREE.PointLightHelper(pointLight)
const gridHelper = new THREE.GridHelper(200, 50)

scene.add(pointLight, lightHelper, gridHelper)

const controls = new FirstPersonControls(camera, renderer.domElement);
controls.lookSpeed = 0.02
controls.movementSpeed = 5

const bg = new THREE.Color().setHex(0x7fcdff)
scene.background = bg

const test = new THREE.Mesh(
  new THREE.BoxGeometry(30,15,2),
  new THREE.MeshStandardMaterial( {color: 0xffffff} )
)

const SandTexture = new THREE.TextureLoader().load('Assets/sand.jpeg')

SandTexture.wrapS = THREE.RepeatWrapping
SandTexture.wrapT = THREE.RepeatWrapping
SandTexture.repeat.set(10,10)

const sand = new THREE.Mesh(
  new THREE.BoxGeometry(500,1,500),
  new THREE.MeshStandardMaterial({map: SandTexture})
)

const OcebotsTexture = new THREE.TextureLoader().load('Assets/ocebot.png')

const ocebots = new THREE.Mesh(
  new THREE.PlaneGeometry(10, 10),
  new THREE.MeshStandardMaterial({map: OcebotsTexture, side: THREE.DoubleSide, transparent: true})
)

const InstructionsTexture = new THREE.TextureLoader().load('Assets/instructions.png')

const instructions = new THREE.Mesh(
  new THREE.PlaneGeometry(20, 15),
  new THREE.MeshStandardMaterial({map: InstructionsTexture, side: THREE.DoubleSide, transparent: true})
)

 
scene.add(test, sand, ocebots, instructions)

test.rotation.z = 0.05
test.position.y = 5

sand.position.y = -3
ocebots.position.z = 1.1
ocebots.rotation.z = 0.05
ocebots.position.y = 5
ocebots.position.x = -10

instructions.position.z = 1.1
instructions.rotation.z = 0.05
instructions.position.x = 5
instructions.position.y = 4
ocebots.position.y = 5


camera.position.y = 3




function animate() {
    // Animation loop
      requestAnimationFrame(animate);

      
      controls.update(0.1);  

      
      renderer.render(scene, camera);
}

animate();