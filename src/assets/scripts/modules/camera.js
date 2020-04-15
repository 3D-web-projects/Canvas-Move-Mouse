function createCamera(scene) {
  console.log("from camera module");
  let camera = new THREE.PerspectiveCamera(
    45,
    window.innerWidth / window.innerHeight,
    0.1,
    1000
  );
  camera.position.set(0, 0, -5);
  camera.lookAt(scene);

  scene.add(camera);
}

export default createCamera;
