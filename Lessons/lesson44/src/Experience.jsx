import {
  OrbitControls,
  TransformControls,
  PivotControls,
  Html,
  Float,
  Text,
  MeshReflectorMaterial,
} from "@react-three/drei";
import { useRef, useState } from "react";
export default function Experience() {
  const cube = useRef();
  const sphere = useRef();
  const [hover, setHover] = useState(false);

  return (
    <>
      <OrbitControls makeDefault />

      <directionalLight position={[1, 2, 3]} intensity={1.5} />
      <ambientLight intensity={0.5} />

      <PivotControls
        anchor={[0, 0, 0]}
        depthTest={false}
        lineWidth={4}
        axisColors={["#9381ff", "#ff4d6d", "#7ae582"]}
        scale={100}
        fixed
      >
        <group
          onPointerOver={() => setHover(true)}
          onPointerOut={() => setHover(false)}
          className="group"
        >
          <mesh position-x={-2} ref={sphere}>
            <sphereGeometry />
            <meshStandardMaterial color="orange" />
            {/* <Html
              wrapperClass="label"
              center
              position={[1, 1, 0]}
              distanceFactor={8}
            >
              <iframe
                width="400px"
                height="400px"
                src="https://portal.horuhe.dev/"
              />
            </Html> */}
          </mesh>
        </group>
      </PivotControls>

      <mesh ref={cube} position-x={2} scale={1.5}>
        <boxGeometry />
        <meshStandardMaterial color="mediumpurple" />
      </mesh>
      <TransformControls object={cube} mode="translate" />

      <mesh position-y={-1} rotation-x={-Math.PI * 0.5} scale={10}>
        <planeGeometry />
        <MeshReflectorMaterial
          resolution={512}
          blur={[1000, 1000]}
          mixBlur={1}
          mirror={0.5}
          color={"greenyellow"}
        />
      </mesh>
      <Float speed={5} floatIntensity={2}>
        <Text
          font="./bangers-v20-latin-regular.woff"
          color={"salmon"}
          fontSize={1}
          maxWidth={2}
          textAlign="center"
        >
          I LOVE R3F
        </Text>
      </Float>
    </>
  );
}
