import * as THREE from "./vendors/three.min";
import { OrbitControls } from "./vendors/OrbitControls";
// import { Texture } from "./vendors/OrbitControls";
import css from "../../styles/style.css";
import img from "../../assets/images/plywood-1.png";
// import createCamera from "./modules/camera";

let camera,
  renderer,
  scene,
  plane,
  frame,
  controls,
  largePlane,
  mouse = new THREE.Vector2();
var raycaster = new THREE.Raycaster(),
  startPosition = 0;

function init() {
  scene = new THREE.Scene();
  scene.background = new THREE.Color(0xffffff);

  camera = new THREE.PerspectiveCamera(
    45,
    window.innerWidth / window.innerHeight,
    0.1,
    1000
  );
  camera.position.set(0, 0, 20);
  //   camera.updateProjectionMatrix();
  camera.lookAt(new THREE.Vector3(0, 0, 0));

  renderer = new THREE.WebGLRenderer({ antialias: true });
  renderer.setPixelRatio(window.devicePixelRatio);
  renderer.setSize(window.innerWidth, window.innerHeight);
  document.body.appendChild(renderer.domElement);

  createPlane();

  // controls = new OrbitControls(camera, renderer.domElement);

  let group1 = new THREE.Group();
  let group2 = new THREE.Group();

  for (let index = 0; index < 3; index++) {
    framesCreation(index, group1);
  }

  // group1.position.z = 5;
  // group2.position.z = -5;

  for (let index = 0; index < 3; index++) {
    framesCreation(index, group2);
  }

  group1.position.set(-7.5, -3, 10);
  group2.position.set(-7.5, 3, 10);
  scene.add(group1);
  scene.add(group2);

  render();
}

function render() {
  requestAnimationFrame(render);
  renderer.render(scene, camera);
  //   plane.rotation.x += 0.2;
  // controls.update();
}

window.onload = function () {
  init();
};

function createPlane() {
  let width = (window.innerWidth / window.innerHeight) * 20;
  var geometry = new THREE.PlaneGeometry(width, 200, 32);
  var material = new THREE.MeshBasicMaterial({
    color: 0xfff000,
    side: THREE.DoubleSide,
  });
  plane = new THREE.Mesh(geometry, material);

  plane.position.y = -20;
  console.log("hello");

  // immediately use the texture for material creation
  //   var material = new THREE.MeshBasicMaterial({ map: texture });
  scene.add(plane);
}

function framesCreation(index, group) {
  //   let width = (window.innerWidth / window.innerHeight) * 20;
  var geometry = new THREE.PlaneGeometry(5, 5, 1);
  var texture = new THREE.TextureLoader().load(img);
  var material = new THREE.MeshBasicMaterial({
    map: texture,
    color: new THREE.Color().setHex(Math.random() * 0xffffff),
  });
  frame = new THREE.Mesh(geometry, material);

  frame.position.set(index * 6 + 1, 0, 0);
  console.log("hello");
  group.add(frame);
}

function onDocumentMouseMove(event) {
  mouse.x = (event.clientX / window.innerWidth) * 2 - 1;
  mouse.y = -(event.clientY / window.innerHeight) * 2 + 1;
  testMouse();

  // console.log(mouse.x);
}

function onWindowResize() {
  renderer.setSize(window.innerWidth, window.innerHeight);

  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();
}

function testMouse() {
  raycaster.setFromCamera(mouse, camera);
  var intersects = raycaster.intersectObject(plane);

  if (intersects.length > 0 && mouse.clicked) {
    let intObj = intersects[0].point;

    if (!startPosition) {
      startPosition = intObj;
    }

    let difference = startPosition.clone().sub(intObj);
    camera.position.x += difference.x;
    camera.position.y += difference.z;

    // console.log("intObj", intObj);
    console.log("difference", difference);
  }
}

function onDocumentMouseDown(event) {
  // if (event.which !== 3) objState.mouseD = true;
  mouse.clicked = true;
}

function onDocumentMouseUp(event) {
  startPosition = 0;

  // if (event.which !== 3) objState.mouseD = false;
  mouse.clicked = false;
}

window.addEventListener("mousemove", onDocumentMouseMove, false);
window.addEventListener("mousedown", onDocumentMouseDown, false);
window.addEventListener("mouseup", onDocumentMouseUp, false);
window.addEventListener("resize", onWindowResize, false);
