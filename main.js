import * as THREE from 'three';
import { FirstPersonControls, GLTFLoader } from 'three/examples/jsm/Addons.js';


const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera( 75, window.innerWidth / window.innerHeight, 0.1, 1000 );

const renderer = new THREE.WebGLRenderer();
renderer.setSize( window.innerWidth, window.innerHeight );
document.body.appendChild( renderer.domElement );
camera.position.setZ(30)

window.addEventListener( 'resize', onWindowResize, false );

function onWindowResize(){

    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();

    renderer.setSize( window.innerWidth, window.innerHeight );

}

renderer.render(scene, camera)


const vector = new THREE.Vector3()



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

const player = new THREE.Mesh(
  new THREE.BoxGeometry(0.5,0.5,0.5),
  new THREE.MeshStandardMaterial({visible: false})
)

let playerBB = new THREE.Box3(new THREE.Vector3(), new THREE.Vector3())
playerBB.setFromObject(player)

scene.add(player)
console.log(playerBB)


const test = new THREE.Mesh(
  new THREE.BoxGeometry(30,15,2),
  new THREE.MeshStandardMaterial( {color: 0xffffff} )
)

let testBB = new THREE.Box3(new THREE.Vector3(), new THREE.Vector3())
testBB.setFromObject(test)

const aboutUs = new THREE.Mesh(
  new THREE.BoxGeometry(30, 15, 2),
  new THREE.MeshStandardMaterial({color: 0xffffff})
)

scene.add(aboutUs)


const SandTexture = new THREE.TextureLoader().load('/sand.jpeg')

SandTexture.wrapS = THREE.RepeatWrapping
SandTexture.wrapT = THREE.RepeatWrapping
SandTexture.repeat.set(10,10)

const sand = new THREE.Mesh(
  new THREE.BoxGeometry(500,1,500),
  new THREE.MeshStandardMaterial({map: SandTexture})
)

let sandBB = new THREE.Box3(new THREE.Vector3(), new THREE.Vector3())
sandBB.setFromObject(sand)

let hasIntersectedBefore = false

function checkCollision() {
  if (playerBB.intersectsBox(testBB) && hasIntersectedBefore){
    getOut()
  } 
  else if (playerBB.intersectsBox(sandBB) && hasIntersectedBefore) {
    camera.position.y = .8
  } else {
      hasIntersectedBefore = true
  }
}

function getOut() {
  window.location.replace('https://ocebots.com')
}

const loader = new GLTFLoader()

function addSeaweed() {
  loader.load( '/seaweed.glb', function ( gltf ) {
    const model = gltf.scene
    model.scale.set(5,5,5)
    const [x, z] = Array(2).fill().map(() => THREE.MathUtils.randFloatSpread(500));
    model.position.set(x, -2, z)
    scene.add( model )
    

  }, undefined, function ( error ) {

    console.error( error )

  })
}


function addFish() {
  loader.load( '/fish.glb', function ( gltf ) {
    const model = gltf.scene
    model.scale.set(0.5,0.5,0.5)
    const [x, y] = Array(2).fill.map(() => THREE.MathUtils.randFloatSpread(100))
    model.position.set(0, 0, 0)
    scene.add( model )
    

  }, undefined, function ( error ) {

    console.error( error )

  })
}

addFish()


Array(200).fill().forEach(addSeaweed)




const OcebotsTexture = new THREE.TextureLoader().load('/ocebot.png')

const ocebots = new THREE.Mesh(
  new THREE.PlaneGeometry(10, 10),
  new THREE.MeshStandardMaterial({map: OcebotsTexture, side: THREE.DoubleSide, transparent: true})
)

const InstructionsTexture = new THREE.TextureLoader().load('/instructions.png')

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

aboutUs.position.z = -50
aboutUs.position.y = 5




camera.position.y = 3



function animate() {
    // Animation loop
  requestAnimationFrame(animate);

  player.position.x = camera.position.x
  player.position.y = camera.position.y
      player.position.z = camera.position.z
      
  playerBB.copy(player.geometry.boundingBox).applyMatrix4(player.matrixWorld)
 

  checkCollision()

  controls.update(0.1);  

      
  renderer.render(scene, camera);
}



let gridHelperOn = true

window.onkeydown = function(e) {
  if (e.keyCode === 32 && gridHelperOn) {
    scene.remove(gridHelper)
    gridHelperOn = false
  } else if (keyCode === 32) {
    scene.add(gridHelper)
    gridHelperOn = true
  }
}



animate();