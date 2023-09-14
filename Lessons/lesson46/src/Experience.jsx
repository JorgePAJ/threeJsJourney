import { useFrame } from "@react-three/fiber";
import {
  OrbitControls,
  useHelper,
  BakeShadows,
  SoftShadows,
  AccumulativeShadows,
  RandomizedLight,
  ContactShadows,
  Sky,
  Environment,
  Lightformer,
  Stage,
} from "@react-three/drei";
import { useControls } from "leva";
import { useRef } from "react";
import { Perf } from "r3f-perf";
import * as THREE from "three";

export default function Experience() {
  const cube = useRef();
  const directionalLight = useRef();

  useFrame((state, delta) => {
    // const time = state.clock.elapsedTime;
    // cube.current.position.x = 2 + Math.sin(time);

    cube.current.rotation.y += delta * 0.2;
  });

  const { color, opacity, blur } = useControls("Contact Shadows", {
    color: "#000",
    opacity: { value: 0.5, min: 0, max: 1 },
    blur: { value: 1, min: 0, max: 10 },
  });

  const { sunPosition } = useControls("Sky", {
    sunPosition: { value: [1, 2, 3] },
  });

  const { envMapIntensity, envMapHeight, envMapRadius, envMapScale } =
    useControls("Environment Map", {
      envMapIntensity: { value: 3.5, min: 0, max: 12 },
      envMapHeight: { value: 7, min: 0, max: 100 },
      envMapRadius: { value: 28, min: 10, max: 1000 },
      envMapScale: { value: 100, min: 10, max: 1000 },
    });
  return (
    <>
      {/* <Environment
        ground={{
          height: envMapHeight,
          radius: envMapRadius,
          scale: envMapScale,
        }}
        intensity={envMapIntensity}
        preset="sunset"
      > */}
      {/* <Lightformer
          position-z={-5}
          scale={10}
          color={"red"}
          intensity={100}
          form={"ring"}
        />
        <color args={["midnightblue"]} attach="background" /> */}
      {/* </Environment> */}

      <Perf position="top-left" />
      {/* <color args={["midnightblue"]} attach="background" /> */}

      <OrbitControls makeDefault />
      {/* 
      <AccumulativeShadows
        position={[0, -0.99, 0]}
        scale={10}
        color="#ffffff"
        opacity={0.8}
        frames={Infinity}
        temporal
        blend={100}
      >
        <RandomizedLight
          amount={8}
          radius={1}
          ambient={0.5}
          intensity={1}
          position={[1, 2, 3]}
          bias={0.001}
        />
      </AccumulativeShadows>
 */}
      {/* <ContactShadows
        position={[0, 0, 0]}
        scale={10}
        resolution={512}
        // frames={1} <- to bake shadows
        far={5}
        opacity={opacity}
        blur={blur}
        color={color}
      /> */}
      {/* <directionalLight
        position={sunPosition}
        intensity={1.5}
        ref={directionalLight}
        castShadow
        shadow-mapSize={[1024 * 2, 1024 * 2]}
        shadow-camera-far={10}
        shadow-camera-left={-5}
        shadow-camera-right={5}
        shadow-camera-top={5}
        shadow-camera-bottom={-5}
        shadow-camera-near={1}
      />
      <ambientLight intensity={0.5} /> */}

      {/* <mesh position-x={-2} castShadow position-y={1}>
        <sphereGeometry />
        <meshStandardMaterial
          color="hotpink"
          envMapIntensity={envMapIntensity}
        />
      </mesh>

      <mesh ref={cube} position-x={2} scale={1.5} castShadow position-y={1}>
        <boxGeometry />
        <meshStandardMaterial
          color="mediumpurple"
          envMapIntensity={envMapIntensity}
        />
      </mesh> */}

      {/* <mesh position-y={0} rotation-x={-Math.PI * 0.5} scale={10}>
        <planeGeometry />
        <meshStandardMaterial color="ivory" envMapIntensity={envMapIntensity} />
      </mesh> */}
      <Stage
        shadows={{
          type: "contact",
          opacity: 0.2,
          blur: 3,
        }}
        environment="apartment"
        preset="portrait"
        intensity={0.5}
      >
        <mesh position-x={-2} castShadow position-y={1}>
          <sphereGeometry />
          <meshStandardMaterial
            color="hotpink"
            envMapIntensity={envMapIntensity}
          />
        </mesh>

        <mesh ref={cube} position-x={2} scale={1.5} castShadow position-y={1}>
          <boxGeometry />
          <meshStandardMaterial
            color="mediumpurple"
            envMapIntensity={envMapIntensity}
          />
        </mesh>
      </Stage>
    </>
  );
}
