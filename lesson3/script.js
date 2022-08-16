//Scene
const scene = new THREE.Scene();

// Cubo rojo
const geometry = new THREE.BoxGeometry(1, 1, 1);
const material = new THREE.MeshBasicMaterial({ color: "#e3bfd4" });
const mesh = new THREE.Mesh(geometry, material);

// Agregar cubo al scene
scene.add(mesh);

// Tamaños para la camara
const sizes = {
  widht: 800,
  height: 600,
};

// Camara
const camera = new THREE.PerspectiveCamera(75, sizes.widht / sizes.height);
scene.add(camera);

// Mover la camara 
camera.position.z = 3;

// Canvas con querySelector
const canvas = document.querySelector("canvas.webgl");

// Renderer
const renderer = new THREE.WebGLRenderer({
  canvas: canvas,
});
renderer.setSize(sizes.widht, sizes.height);

// Render
renderer.render(scene, camera);
