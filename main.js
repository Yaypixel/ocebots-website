import * as THREE from 'three';
import { FirstPersonControls, GLTFLoader } from 'three/examples/jsm/Addons.js';
import { degToRad } from 'three/src/math/MathUtils.js';
import { oscTriangle, time } from 'three/webgpu';


const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera( 75, window.innerWidth / window.innerHeight, 0.1, 500 );

const turnAround =  Math.PI / 2 + Math.PI / 2
const turn90 = Math.PI/2

const colide = 0.8

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

document.getElementById("enter").onclick = function () {
  document.getElementById("select-box").style.display = 'none'
}

document.getElementById("nah").onclick = function () {
  window.location.replace("Welcome/Welcome.html")
}

const pointLight = new THREE.PointLight(0xffffff)

scene.fog = new THREE.FogExp2( 0xeeeeff, 0.01 );

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


const borderN = new THREE.Mesh(
  new THREE.BoxGeometry(500, 500, 1),
  new THREE.MeshStandardMaterial({visible: false})
)

let borderNBB = new THREE.Box3(new THREE.Vector3(), new THREE.Vector3())
borderNBB.setFromObject(borderN)

const borderE = new THREE.Mesh(
  new THREE.BoxGeometry(500, 500, 1),
  new THREE.MeshStandardMaterial({visible: false})
)

let borderEBB = new THREE.Box3(new THREE.Vector3(), new THREE.Vector3())
borderEBB.setFromObject(borderE)

const borderS = new THREE.Mesh(
  new THREE.BoxGeometry(500, 500, 1),
  new THREE.MeshStandardMaterial({visible: false})
)

let borderSBB = new THREE.Box3(new THREE.Vector3(), new THREE.Vector3())
borderSBB.setFromObject(borderS)

const borderW = new THREE.Mesh(
  new THREE.BoxGeometry(500, 500, 1),
  new THREE.MeshStandardMaterial({visible: false})
)

let borderWBB = new THREE.Box3(new THREE.Vector3(), new THREE.Vector3())
borderWBB.setFromObject(borderW)

scene.add(borderN, borderE, borderS, borderW)

const aboutUs = new THREE.Mesh(
  new THREE.BoxGeometry(30, 15, 2),
  new THREE.MeshStandardMaterial({color: 0xffffff})
)

let aboutBB = new THREE.Box3(new THREE.Vector3(), new THREE.Vector3())
aboutBB.setFromObject(aboutUs)

console.log(aboutBB)

const test = new THREE.Mesh(
  new THREE.BoxGeometry(30,15,2),
  new THREE.MeshStandardMaterial( {color: 0xffffff} )
)

let testBB = new THREE.Box3(new THREE.Vector3(), new THREE.Vector3())
testBB.setFromObject(test)
console.log(testBB)

const cad = new THREE.Mesh(
  new THREE.BoxGeometry(30, 15, 2),
  new THREE.MeshStandardMaterial({color: 0xffffff})
)

let cadBB = new THREE.Box3(new THREE.Vector3(), new THREE.Vector3())
cadBB.setFromObject(cad)

const donate = new THREE.Mesh(
  new THREE.BoxGeometry(30, 15, 2),
  new THREE.MeshStandardMaterial({color: 0xffffff})
)

let donateBB = new THREE.Box3(new THREE.Vector3(), new THREE.Vector3())
donateBB.setFromObject(donate)

const code = new THREE.Mesh(
  new THREE.BoxGeometry(30,15,2),
  new THREE.MeshStandardMaterial({color: 0xffffff})
)

const outreach = new THREE.Mesh(
  new THREE.BoxGeometry(30, 15, 2),
  new THREE.MeshStandardMaterial({color: 0xffffff})
)

let outreachBB = new THREE.Box3(new THREE.Vector3(), new THREE.Vector3())
outreachBB.setFromObject(outreach)

let codeBB = new THREE.Box3(new THREE.Vector3, new THREE.Vector3())
codeBB.setFromObject(code)

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
  }
  else if (playerBB.intersectsBox(aboutBB) && hasIntersectedBefore) {
    window.location.href = "AboutUs/AboutUs.html"
  }
  else if (playerBB.intersectsBox(cadBB) && hasIntersectedBefore) {
    window.location.replace("https://cad.onshape.com/documents/c01859492615b629566d2c45/w/a91257017dbf755ccfec722a")
  }
  else if (playerBB.intersectsBox(codeBB) && hasIntersectedBefore) {
    window.location.replace('https://github.com/Ocebots')
  }
  else if (playerBB.intersectsBox(borderNBB) && hasIntersectedBefore) {
    camera.position.z = -250 + colide
  }
  else if (playerBB.intersectsBox(borderEBB) && hasIntersectedBefore) {
    camera.position.x = 250 - colide
  }
  else if (playerBB.intersectsBox(borderSBB) && hasIntersectedBefore) {
    camera.position.z = 250 - colide
  }
  else if (playerBB.intersectsBox(borderWBB) && hasIntersectedBefore) {
    camera.position.x = -250 + colide
  }
  else if (playerBB.intersectsBox(donateBB) && hasIntersectedBefore) {
    window.location.href = 'Donate/Donate.html'
  }
  else if (playerBB.intersectsBox(outreachBB) && hasIntersectedBefore) {
    window.location.href = "Outreach/Outreach.html"
  }
  else {
    hasIntersectedBefore = true
  }
}


function getOut() {
  window.location.replace('Welcome/Welcome.html')
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


function addBubbles() {
  const geometry = new THREE.SphereGeometry(0.05, 24, 24);
  const material = new THREE.MeshStandardMaterial({ color: 0xffffff });
  const star = new THREE.Mesh(geometry, material);

  const [x, y, z] = Array(3).fill().map(() => THREE.MathUtils.randFloatSpread(100));

  star.position.set(x, y, z);
  scene.add(star);
}

Array(200).fill().forEach(addBubbles);

function addFish() {
  loader.load( '/fish.glb', function ( gltf ) {
    const model = gltf.scene
    model.scale.set(0.5,0.5,0.5)
    model.position.set(0, 0, 0)

    let movingForword = true

    scene.add( model )
    const [x, z] = Array(2).fill().map(() => THREE.MathUtils.randFloatSpread(500));
    const y = Math.floor(Math.random() * 100)
    model.position.set(x, y, z)

    let seconds = 0
    let lastTurned = 0
    let turnedForword = Math.random() < 0.5
    

    function timer() {
      seconds += 1
    }

    if (!turnedForword) {
      model.rotation.y += turnAround
    }

    function animateFish() {
      requestAnimationFrame(animateFish)

      if (seconds - lastTurned === 15) {
        model.rotation.y += turnAround
        lastTurned = seconds
        turnedForword = !turnedForword
      }

      if (turnedForword){
        model.position.z += 0.05
      } else {
        model.position.z -= 0.05
      }
    }

    animateFish()
    let stop = setInterval(timer, 1000)

  }, undefined, function ( error ) {

    console.error( error )

  })
}
Array(50).fill().forEach(addFish);

function addRock() {
  loader.load( '/rock.glb', function ( gltf ) {
    const model = gltf.scene
    model.scale.set(5,5,5)
    const [x, z] = Array(2).fill().map(() => THREE.MathUtils.randFloatSpread(500));
    model.position.set(x, -2, z)
    scene.add( model )
    

  }, undefined, function ( error ) {

    console.error( error )

  })
}

Array(200).fill().forEach(addSeaweed)
Array(200).fill().forEach(addRock)

loader.load('/pirateship.glb', function(gltf) {
  const ship = gltf.scene
  ship.scale.set(4,4,4)
  ship.position.x = 100
  ship.position.z = -100
  ship.rotation.x = 1.7

  scene.add(ship)
}, undefined, function (error) {
  console.error(error)
})

loader.load('/chest.glb', function(gltf) {
  const chest = gltf.scene
  chest.position.set(20, -2, -95)
  chest.rotation.y = THREE.MathUtils.degToRad(180)
  chest.rotation.z = THREE.MathUtils.degToRad(60)
  chest.scale.set(2.5, 2.5, 2.5)

  scene.add(chest)
}, undefined, function (error) {
  console.error(error)
})

loader.load('/coral.glb', function(gltf) {
  const coral = gltf.scene
  coral.position.set(-30, -2, -80)
  coral.scale.set(3, 3, 3)
  scene.add(coral)
}, undefined, function (error) {
  console.error(error)
})

loader.load('/submarine.glb', function(gltf){
  const submarine = gltf.scene
  submarine.position.set(-50, -2, -120)
  submarine.rotation.y = THREE.MathUtils.degToRad(210)
  submarine.scale.set(3, 3, 3)
  scene.add(submarine)
  
}, undefined, function (error) {
  console.error(error)
})
loader.load('/low_poly_shark.glb', function(gltf){
  const model = gltf.scene
  model.scale.set(3,3,3)

  scene.add( model )
  const [x, z] = Array(2).fill().map(() => THREE.MathUtils.randFloatSpread(500));
  const y = Array(1).fill().map(() => THREE.MathUtils.randFloatSpread(100))
  model.position.set(x, y, z)

  let seconds = 0
  let lastTurned = 0
  let turnedForword = Math.random() < 0.5
  

  function timer() {
    seconds += 1
  }

  if (!turnedForword) {
    model.rotation.y += turnAround
  }

  console.log(model.position.y)

  function animateFish() {
    requestAnimationFrame(animateFish)
    console.log(model.position.z)
  

    if (seconds - lastTurned === 15) {
      model.rotation.y += turnAround
      lastTurned = seconds
      turnedForword = !turnedForword
    }

    if (turnedForword){
      model.position.z += 0.05
    } else {
      model.position.z -= 0.05
    }
  }
  animateFish()
  let stop = setInterval(timer, 1000)
}, undefined, function (error) {
  console.error(error)
})


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

const aboutUsTexture = new THREE.TextureLoader().load('/AboutUs.png')

const aboutUsText = new THREE.Mesh(
  new THREE.PlaneGeometry(30, 15),
  new THREE.MeshStandardMaterial({map: aboutUsTexture, side: THREE.DoubleSide, transparent: true})
)

const CadTexture = new THREE.TextureLoader().load('/cad.png')

const cadText = new THREE.Mesh(
  new THREE.PlaneGeometry(30, 15),
  new THREE.MeshStandardMaterial({map: CadTexture, side: THREE.DoubleSide, transparent: true})
)

const CodeTexture = new THREE.TextureLoader().load('/code.png')

const codeText = new THREE.Mesh(
  new THREE.PlaneGeometry(30, 15),
  new THREE.MeshStandardMaterial({map: CodeTexture, side: THREE.DoubleSide, transparent: true})
)

const donateTexture = new THREE.TextureLoader().load('/donate3d.png')

const donateText = new THREE.Mesh(
  new THREE.PlaneGeometry(30, 15),
  new THREE.MeshStandardMaterial({map: donateTexture, side: THREE.DoubleSide, transparent: true})
)


scene.add(test, sand, ocebots, instructions, aboutUsText, aboutUs, cad, cadText, code, codeText, donate, donateText, outreach)


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
aboutUs.position.x = 50
aboutUs.rotation.y = -4.6

donate.position.set(40, 5, -90)
donate.rotation.y = degToRad(-50)
donateText.position.set(38.5, 5, -90)
donateText.rotation.y = degToRad(-50)

outreach.position.set(-40, 5, -90)
outreach.rotation.y = degToRad(50)

aboutUsText.position.z = -50
aboutUsText.position.y = 5
aboutUsText.position.x = 48.9
aboutUsText.rotation.y = 4.82

cad.position.set(0, 5, -101.1)
cadText.position.set(0, 5, -100)

code.position.set(-50, 5, -50)
code.rotation.y = 4.6
codeText.position.set(-48.9, 5, -50)
codeText.rotation.y = -4.82

borderN.position.set(0, 0, -250)
borderE.rotation.y = THREE.MathUtils.degToRad(90)
borderE.position.set(250, 0, 0)
borderS.position.set(0, 0, 250)
borderW.position.set(-250, 0, 0 )
borderW.rotation.y = degToRad(90)

camera.position.y = 3


function animate() {
  requestAnimationFrame(animate);

  player.position.x = camera.position.x
  player.position.y = camera.position.y
  player.position.z = camera.position.z
      
  playerBB.copy(player.geometry.boundingBox).applyMatrix4(player.matrixWorld)
  aboutBB.copy(aboutUs.geometry.boundingBox).applyMatrix4(aboutUs.matrixWorld)
  cadBB.copy(cad.geometry.boundingBox).applyMatrix4(cad.matrixWorld)
  codeBB.copy(code.geometry.boundingBox).applyMatrix4(code.matrixWorld)
  borderNBB.copy(borderN.geometry.boundingBox).applyMatrix4(borderN.matrixWorld)
  borderEBB.copy(borderE.geometry.boundingBox).applyMatrix4(borderE.matrixWorld)
  borderSBB.copy(borderS.geometry.boundingBox).applyMatrix4(borderS.matrixWorld)
  borderWBB.copy(borderW.geometry.boundingBox).applyMatrix4(borderW.matrixWorld)
  donateBB.copy(donate.geometry.boundingBox).applyMatrix4(donate.matrixWorld)
  outreachBB.copy(outreach.geometry.boundingBox).applyMatrix4(outreach.matrixWorld)

  checkCollision()

  controls.update(0.1);  

      
  renderer.render(scene, camera);
}

let gridHelperOn = true

window.onkeydown = function(e) {
  if (e.keyCode === 32 && gridHelperOn) {
    scene.remove(gridHelper)
    gridHelperOn = false
  } else if (e.keyCode === 32) {
    scene.add(gridHelper)
    gridHelperOn = true
  }
}



animate();