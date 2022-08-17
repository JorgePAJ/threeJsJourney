import "../public/css/styles.css";
import * as THREE from "three";

// Scene
const scene = new THREE.Scene();

// Grupo de objetos
const group = new THREE.Group();
scene.add(group);

const cuboRosa = new THREE.Mesh(
  new THREE.BoxGeometry(1, 1, 1),
  new THREE.MeshBasicMaterial({ color: "#e3bfd4" })
);
const cuboCyan = new THREE.Mesh(
  new THREE.BoxGeometry(1, 1, 1),
  new THREE.MeshBasicMaterial({ color: "cyan" })
);
const cuboPurple = new THREE.Mesh(
  new THREE.BoxGeometry(1, 1, 1),
  new THREE.MeshBasicMaterial({ color: "purple" })
);

group.add(cuboRosa);
group.add(cuboCyan);
group.add(cuboPurple);

cuboPurple.position.x = 1;
cuboRosa.position.x = -1;

group.position.y = 2;
group.scale.y = 0.5;
group.rotation.y = 0.2;

// Axes helper
const axesHelper = new THREE.AxesHelper();
scene.add(axesHelper);

// Tamaños para la camara
const sizes = {
  widht: 800,
  height: 600,
};

// Camara
const camera = new THREE.PerspectiveCamera(75, sizes.widht / sizes.height);
// Mover la camara
camera.position.z = 3;
camera.position.y = 1;
// Agregar camara al scene
scene.add(camera);

// camera.lookAt(mesh.position)

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
