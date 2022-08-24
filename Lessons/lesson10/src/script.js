import "./style.css";
import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls.js";
import gsap from "gsap";
// Using dat name to follow tutorial
import * as dat from "lil-gui";

/**
 * Debug
 */
const gui = new dat.GUI({ width: 400 });
gui.hide();
// En otras librerias no se puede usar el color en addColor,
// Tendras que usar este hacksillo
// const parameters = { color: 0xe3bfd4}
// gui.addColor(parameters,'color').onChange(()=>{material.color.set(parameters.color)})
// cambiar valor en const material.

const parameters = {
  spin: () => {
    gsap.to(mesh.rotation, { duration: 1, z: mesh.rotation.z - Math.PI * 2 });
  },
};

// lil-gui no soporta "H" para esconder, pero aqui se la soportan 😈
window.addEventListener("keydown", (e) => {
  if (e.key === "h") {
    if (gui._hidden) gui.show();
    else gui.hide();
  }
});

/**
 * Base
 */
// Canvas
const canvas = document.querySelector("canvas.webgl");

// Scene
const scene = new THREE.Scene();

/**
 * Object
 */
const geometry = new THREE.BoxGeometry(1, 1, 1);
const material = new THREE.MeshBasicMaterial({ color: 0xe3bfd4 });
// const material = new THREE.MeshBasicMaterial({ color: parameters.color })
const mesh = new THREE.Mesh(geometry, material);
scene.add(mesh);

// Debug
gui.add(mesh.position, "y", -3, 3, 0.01).name("Y Position");
gui.add(mesh.position, "x", -3, 3, 0.01).name("X Position");
gui.add(mesh.position, "z").min(-3).max(3).step(0.01).name("Z Position");
gui.add(mesh.rotation, "y").min(-3).max(3).step(0.01).name("Y Rotation");
gui.add(mesh.rotation, "x").min(-3).max(3).step(0.01).name("X Rotation");
gui.add(mesh.rotation, "z").min(-3).max(3).step(0.01).name("Z Rotation");

gui.add(mesh, "visible").name("Visible");
gui.add(mesh.material, "wireframe").name("Wireframe");
gui.addColor(material, "color").name("Color");
gui.add(parameters, "spin").name("Do a barrel roll");

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
camera.position.z = 3;
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

  // Update controls
  controls.update();

  // Render
  renderer.render(scene, camera);

  // Call tick again on the next frame
  window.requestAnimationFrame(tick);
};

tick();
