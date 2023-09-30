import { useTexture, useGLTF, Center, shaderMaterial } from "@react-three/drei";
import * as THREE from "three";
import portalVertexShader from "./shaders/portal/vertex.glsl";
import portalFragmentShader from "./shaders/portal/fragment.glsl";
import { extend, useFrame } from "@react-three/fiber";
import { useRef } from "react";

const PortalMaterial = shaderMaterial(
  {
    uTime: 0,
    uColorStart: new THREE.Color("#ffffff"),
    uColorEnd: new THREE.Color("#46B4FF"),
  },
  portalVertexShader,
  portalFragmentShader
);
extend({ PortalMaterial });

export default function Portal() {
  const { nodes } = useGLTF("./model/portal.glb");
  const bakedTexture = useTexture("./model/Baked.jpg");
  bakedTexture.flipY = false;

  const portalMaterialRef = useRef();

  useFrame((state, delta) => {
    portalMaterialRef.current.uTime += delta;
  });

  return (
    <Center>
      <mesh geometry={nodes.baked.geometry} position={nodes.baked.position}>
        <meshBasicMaterial map={bakedTexture} />
      </mesh>
      <mesh
        geometry={nodes.poleLightA.geometry}
        position={nodes.poleLightA.position}
      >
        <meshBasicMaterial color="#ffffe5" />
      </mesh>

      <mesh
        geometry={nodes.poleLightB.geometry}
        position={nodes.poleLightB.position}
      >
        <meshBasicMaterial color="#ffffe5" />
      </mesh>

      <mesh
        geometry={nodes.portalLight.geometry}
        position={nodes.portalLight.position}
        rotation={nodes.portalLight.rotation}
        scale={nodes.portalLight.scale}
      >
        <portalMaterial ref={portalMaterialRef} />
      </mesh>
    </Center>
  );
}
