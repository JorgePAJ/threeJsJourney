import {
  Html,
  ContactShadows,
  PresentationControls,
  Float,
  Environment,
  useGLTF,
} from "@react-three/drei";

function Macbook(props) {
  const { scene } = useGLTF(
    "https://vazxmixjsiawhamofees.supabase.co/storage/v1/object/public/models/macbook/model.gltf"
  );
  return (
    <primitive object={scene} {...props} position-y={-1.2} rotation-y={-0.67}>
      <Html
        transform
        wrapperClass="htmlScreen"
        distanceFactor={1.17}
        position={[0, 1.56, -1.4]}
        rotation-x={-0.256}
      >
        <iframe src="https://horuhe.dev" />
      </Html>
    </primitive>
  );
}

export default function Experience() {
  return (
    <>
      <Environment preset="city" />
      <color attach="background" args={["#e3bfd4"]} />
      <PresentationControls
        global
        rotation={[0.13, 0.1, 0]}
        polar={[-0.4, 0.2]}
        azimuth={[-1, 0.75]}
        config={{ mass: 2, tension: 400 }}
        snap={{
          mass: 4,
          tension: 400,
        }}
      >
        <Float rotationIntensity={0.4}>
          <Macbook />
        </Float>
      </PresentationControls>
      <ContactShadows position-y={-1.4} opacity={0.4} scale={5} blur={2.4} />
    </>
  );
}
