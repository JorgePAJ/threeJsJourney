import {
  OrbitControls,
  Sparkles,
  useGLTF,
  useTexture,
} from "@react-three/drei";
import Portal from "./portal";
import * as THREE from "three";

export default function Experience() {
  const { nodes } = useGLTF("./model/portal.glb");
  console.log(nodes);
  const bakedTexture = useTexture("./model/Baked.jpg");
  bakedTexture.flipY = false;
  return (
    <>
      <color args={["#030202"]} attach="background" />
      <OrbitControls makeDefault />
      <Portal />
      <Sparkles size={6} scale={[4, 2, 4]} position-y={0.3} speed={0.2} />
    </>
  );
}
