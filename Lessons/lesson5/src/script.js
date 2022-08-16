import "../public/css/styles.css";
import * as THREE from "three";

//Scene
const scene = new THREE.Scene();

// Cubo rosa hermoso uwu<3
const geometry = new THREE.BoxGeometry(1, 1, 1);
const material = new THREE.MeshBasicMaterial({ color: "#e3bfd4" });
const mesh = new THREE.Mesh(geometry, material);

// Posicion del cubo
mesh.position.x = 0.7;
mesh.position.y = -0.6;
mesh.position.z = 1;

// Otra manera de hacer set a las posiciones (X, Y, Z)
// mesh.position.set(0.7, -0.6, 1);

// Agregar cubo al scene
scene.add(mesh);

// Tamaños para la camara
const sizes = {
  widht: 800,
  height: 600,
};

// Camara
const camera = new THREE.PerspectiveCamera(75, sizes.widht / sizes.height);
// Mover la camara
camera.position.z = 3;
// Agregar camara al scene
scene.add(camera);

// Canvas con querySelector
const canvas = document.querySelector("canvas.webgl");

// Renderer
const renderer = new THREE.WebGLRenderer({
  canvas: canvas,
});
renderer.setSize(sizes.widht, sizes.height);

// Render
renderer.render(scene, camera);

console.log(mesh.position.normalize());
