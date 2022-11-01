import "./style.css";
import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls.js";
import * as dat from "lil-gui";

/**
 * Base
 */
// Debug
const gui = new dat.GUI();

// Canvas
const canvas = document.querySelector("canvas.webgl");

// Scene
const scene = new THREE.Scene();

/**
 * Lights
 */
const ambientLight = new THREE.AmbientLight();
ambientLight.color = new THREE.Color(0xe3bfd4);
ambientLight.intensity = 0.5;
const firstLight = gui.addFolder("First Light");
firstLight.add(ambientLight, "intensity").min(0).max(1).step(0.001);
firstLight.addColor(ambientLight, "color");
// scene.add(ambientLight);

const directionalLight = new THREE.DirectionalLight(0xffffff, 0.3);
const secondLight = gui.addFolder("Second Light");
secondLight.add(directionalLight, "intensity").min(0).max(1).step(0.001);
secondLight.addColor(directionalLight, "color");
directionalLight.position.set(1, 0.25, 0);
// scene.add(directionalLight);


const hemisphereLight = new THREE.HemisphereLight(0xe3bfd4, 0x0000ff, 0.3);
const thirdLight = gui.addFolder("Third Light");
thirdLight.add(hemisphereLight, "intensity").min(0).max(1).step(0.001);
thirdLight.addColor(hemisphereLight, "color");
thirdLight.addColor(hemisphereLight, "groundColor");
// scene.add(hemisphereLight);

const pointLight = new THREE.PointLight(0xff9000, 0.5 , 10, 2);
const fourthLight = gui.addFolder("Fourth Light");
fourthLight.add(pointLight, "intensity").min(0).max(1).step(0.001);
fourthLight.addColor(pointLight, "color");
pointLight.position.set(1, -0.5, 1);
// scene.add(pointLight);

const rectAreaLight = new THREE.RectAreaLight(0x4e00ff, 5, 1, 1);
const fifthLight = gui.addFolder("Fifth Light");
fifthLight.add(rectAreaLight, "intensity").min(0).max(10).step(0.001);
fifthLight.addColor(rectAreaLight, "color");
rectAreaLight.position.set(-1.5, 1, 1.5);
rectAreaLight.lookAt(new THREE.Vector3());
// scene.add(rectAreaLight);

const spotLight = new THREE.SpotLight(0xffffff, 1, 10, Math.PI * 0.1, 0.25, 1);
spotLight.position.set(0, 2, 3);
const sixthLight = gui.addFolder("Sixth Light");
sixthLight.add(spotLight, "intensity").min(0).max(1).step(0.001);
sixthLight.addColor(spotLight, "color");
scene.add(spotLight.target);
spotLight.target.position.x = 0;
spotLight.target.position.y = 0;
sixthLight.add(spotLight.target.position, "x").min(-5).max(5).step(0.001);
sixthLight.add(spotLight.target.position, "y").min(-5).max(5).step(0.001);
const lightHelper = new THREE.PointLightHelper(pointLight, 0.2);
scene.add(lightHelper);
scene.add(spotLight);
/**
 * Objects
 */
// Material
const material = new THREE.MeshStandardMaterial();
material.roughness = 0.4;

// Objects
const sphere = new THREE.Mesh(new THREE.SphereGeometry(0.5, 32, 32), material);
sphere.position.x = -1.5;

const cube = new THREE.Mesh(new THREE.BoxGeometry(0.75, 0.75, 0.75), material);

const torus = new THREE.Mesh(
  new THREE.TorusGeometry(0.3, 0.2, 32, 64),
  material
);
torus.position.x = 1.5;

const plane = new THREE.Mesh(new THREE.PlaneGeometry(5, 5), material);
plane.rotation.x = -Math.PI * 0.5;
plane.position.y = -0.65;

scene.add(sphere, cube, torus, plane);

/**
 * Sizes
 */
const sizes = {
  width: window.innerWidth,
  height: window.innerHeight,
};

window.addEventListener("resize", () => {
  // Update sizes
  sizes.width = window.innerWidth;
  sizes.height = window.innerHeight;

  // Update camera
  camera.aspect = sizes.width / sizes.height;
  camera.updateProjectionMatrix();

  // Update renderer
  renderer.setSize(sizes.width, sizes.height);
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
});

/**
 * Camera
 */
// Base camera
const camera = new THREE.PerspectiveCamera(
  75,
  sizes.width / sizes.height,
  0.1,
  100
);
camera.position.x = 1;
camera.position.y = 1;
camera.position.z = 2;
scene.add(camera);

// Controls
const controls = new OrbitControls(camera, canvas);
controls.enableDamping = true;

/**
 * Renderer
 */
const renderer = new THREE.WebGLRenderer({
  canvas: canvas,
});
renderer.setSize(sizes.width, sizes.height);
renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));

/**
 * Animate
 */
const clock = new THREE.Clock();

const tick = () => {
  const elapsedTime = clock.getElapsedTime();

  // Update objects
  sphere.rotation.y = 0.1 * elapsedTime;
  cube.rotation.y = 0.1 * elapsedTime;
  torus.rotation.y = 0.1 * elapsedTime;

  sphere.rotation.x = 0.15 * elapsedTime;
  cube.rotation.x = 0.15 * elapsedTime;
  torus.rotation.x = 0.15 * elapsedTime;

  // Update controls
  controls.update();

  // Render
  renderer.render(scene, camera);

  // Call tick again on the next frame
  window.requestAnimationFrame(tick);
};

tick();


