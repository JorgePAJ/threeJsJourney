import "./style.css";
import ReactDOM from "react-dom/client";
import { Canvas } from "@react-three/fiber";
import Experience from "./Experience";
import * as THREE from "three";

const root = ReactDOM.createRoot(document.querySelector("#root"));

const cameraSettings = {
  position: [3, 2, 6],
  fov: 45,
  near: 0.1,
  far: 200,
};

root.render(
  <Canvas
    gl={{
      toneMapping: THREE.CineonToneMapping,
      antialias: true,
      outputColorSpace: THREE.SRGBColorSpace,
    }}
    camera={cameraSettings}
  >
    <Experience />
  </Canvas>
);
