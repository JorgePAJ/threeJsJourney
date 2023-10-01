import { useTexture, useGLTF, Center, shaderMaterial } from "@react-three/drei";
import * as THREE from "three";
import portalVertexShader from "./shaders/portal/vertex.glsl";
import portalFragmentShader from "./shaders/portal/fragment.glsl";
import { extend, useFrame } from "@react-three/fiber";
import { useRef } from "react";

export default function Portal() {
  const { nodes } = useGLTF("./model/portal.glb");
  const bakedTexture = useTexture("./model/Baked.jpg");
  bakedTexture.flipY = false;


  return (
    <Center>
      <mesh geometry={nodes.baked.geometry} position={nodes.baked.position}>
        <meshBasicMaterial map={bakedTexture} />
      </mesh>
    </Center>
  );
}
