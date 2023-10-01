import { useGLTF } from "@react-three/drei";

export default function Hamburger(props) {
  const model = useGLTF("./hamburger.glb");

  return (
    <primitive
      object={model.scene}
      scale={0.25}
      position-y={0.5}
      onClick={props.onClick}
    />
  );
}
