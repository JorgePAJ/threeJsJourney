import { useFrame, extend, useThree } from "@react-three/fiber";
import { useRef } from "react";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";
import CustomObject from "./CustomObject";

export default function Experience() {
  const cubeRef = useRef();
  const groupRef = useRef();

  const { camera, gl } = useThree();
  extend({ OrbitControls });

  useFrame((state, delta) => {
    cubeRef.current.rotation.y += delta;
  });

  return (
    <>
      <orbitControls args={[camera, gl.domElement]} />
      <directionalLight position={[1, 2, 3]} intensity={1.5} />
      <ambientLight intensity={0.5} />
      <group ref={groupRef}>
        <mesh
          position-x={2}
          scale={1.5}
          rotation-y={Math.PI * 0.25}
          ref={cubeRef}
        >
          <boxGeometry scale={1.5} />
          <meshStandardMaterial color={"mediumpurple"} />
        </mesh>
        <mesh position-x={-2}>
          <sphereGeometry />
          <meshStandardMaterial color={"orange"} />
        </mesh>
      </group>

      <mesh position-y={-1} rotation-x={-Math.PI * 0.5} scale={10}>
        <planeGeometry />
        <meshStandardMaterial color={"greenyellow"} />
      </mesh>

      <CustomObject />
    </>
  );
}
