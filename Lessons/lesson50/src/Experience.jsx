import { useFrame } from "@react-three/fiber";
import {
  OrbitControls,
  meshBounds,
  useCursor,
  useGLTF,
} from "@react-three/drei";
import { useRef, useState } from "react";
import Hamburger from "./hamburger.jsx";

export default function Experience() {
  const cube = useRef();

  useFrame((state, delta) => {
    cube.current.rotation.y += delta * 0.2;
  });

  const eventHandler = (event) => {
    console.log(event);
    cube.current.material.color.set(Math.random() * 0xffffff);
  };
  const [hovered, set] = useState();
  useCursor(hovered /*'pointer', 'auto', document.body*/);

  return (
    <>
      <OrbitControls makeDefault />

      <directionalLight position={[1, 2, 3]} intensity={1.5} />
      <ambientLight intensity={0.5} />

      <mesh
        position-x={-2}
        onClick={(e) => {
          e.stopPropagation();
        }}
      >
        <sphereGeometry />
        <meshStandardMaterial color="orange" />
      </mesh>

      <mesh
        ref={cube}
        position-x={2}
        scale={1.5}
        raycast={meshBounds}
        onClick={eventHandler}
        onPointerOver={() => set(true)}
        onPointerOut={() => set(false)}
      >
        <boxGeometry />
        <meshStandardMaterial color="mediumpurple" />
      </mesh>

      <Hamburger
        onClick={(e) => {
          e.stopPropagation();
          console.log("Clicked hamburger");
        }}
      />

      <mesh position-y={-1} rotation-x={-Math.PI * 0.5} scale={10}>
        <planeGeometry />
        <meshStandardMaterial color="greenyellow" />
      </mesh>
    </>
  );
}
