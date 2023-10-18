import { OrbitControls, useGLTF } from "@react-three/drei";
import { Perf } from "r3f-perf";
import {
  BallCollider,
  CuboidCollider,
  CylinderCollider,
  InstancedRigidBodies,
  Physics,
  RigidBody,
} from "@react-three/rapier";
import { useRef, useState, useMemo, useEffect } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";
import { useControls } from "leva";

export default function Experience() {
  const [hitSound] = useState(() => {
    return new Audio("./hit.mp3");
  });
  const cube = useRef();
  const twister = useRef();

  const model = useGLTF("./hamburger.glb");
  const cubesCount = 1000;
  const instances = useMemo(() => {
    const instances = [];
    for (let i = 0; i < cubesCount; i++) {
      const x = (Math.random() - 0.5) * 8;
      const y = 6 + i * 0.2;
      const z = (Math.random() - 0.5) * 8;
      if (isNaN(x) || isNaN(y) || isNaN(z)) {
        instances.push({
          key: "instance_" + i,
          position: [0, 0, 0],
          rotation: [0, 0, 0],
        });
      } else {
        instances.push({
          key: "instance_" + i,
          position: [x, y, z],
          rotation: [Math.random(), Math.random(), Math.random()],
        });
      }
    }
    return instances;
  }, []);

  //   useEffect(() => {
  //     for (let i = 0; i < cubesCount; i++) {
  //       const matrix = new THREE.Matrix4();
  //       matrix.compose(
  //         new THREE.Vector3(i * 2, 0, 0),
  //         new THREE.Quaternion(),
  //         new THREE.Vector3(1, 1, 1)
  //       );
  //       cubes.current.setMatrixAt(i, matrix);
  //     }
  //   }, []);

  const cubeJump = () => {
    const mass = cube.current.mass();

    cube.current.applyImpulse({ x: 0, y: mass * 5, z: 0 });
    cube.current.applyTorqueImpulse({
      x: Math.random() - 0.5,
      y: Math.random() - 0.5,
      z: Math.random() - 0.5,
    });
    console.log(twister.current);
  };
  useFrame((state) => {
    const time = state.clock.getElapsedTime();

    const eulerRotation = new THREE.Euler(0, time * 3, 0);
    const quaternionRotation = new THREE.Quaternion();
    quaternionRotation.setFromEuler(eulerRotation);

    if (twister.current) {
      twister.current.setNextKinematicRotation(quaternionRotation);
    }

    const angle = time * 0.5;
    const x = Math.cos(angle) * 2;
    const z = Math.sin(angle) * 2;
    if (twister.current) {
      twister.current.setNextKinematicTranslation({ x: x, y: -0.8, z: z });
    }
  });

  return (
    <>
      <Perf position="top-left" />

      <OrbitControls makeDefault />

      <directionalLight castShadow position={[1, 2, 3]} intensity={1.5} />
      <ambientLight intensity={0.5} />
      <Physics gravity={[0, -9.81, 0]}>
        <RigidBody colliders="ball" position={[-2, 3, 0]}>
          <mesh castShadow>
            <sphereGeometry />
            <meshStandardMaterial color="orange" />
          </mesh>
        </RigidBody>

        <RigidBody
          ref={cube}
          gravityScale={1}
          restitution={0.5}
          friction={0.7}
          position={[2, 2, 0]}
          colliders={false}
          //   onCollisionExit={() => {
          //     console.log("exit");
          //   }}
          // onSleep={() => {
          //     console.log("sleep");
          //   }
          // }
          // onWake={() => {
          //     console.log("wake");
          //   }
          // }
        >
          <CuboidCollider args={[0.5, 0.5, 0.5]} mass={100} />
          <mesh castShadow onClick={cubeJump}>
            <boxGeometry />
            <meshStandardMaterial color="mediumpurple" />
          </mesh>
        </RigidBody>

        <RigidBody
          position={[0, -0.8, 0]}
          friction={0}
          type="kinematicPosition"
          ref={twister}
        >
          <mesh castShadow scale={[0.4, 0.4, 3]}>
            <boxGeometry />
            <meshStandardMaterial color="red" />
          </mesh>
        </RigidBody>

        <RigidBody colliders={false} position={[0, 4, 0]}>
          <CylinderCollider args={[0.5, 1.25]} />
          <primitive object={model.scene} scale={0.25} />
        </RigidBody>

        <RigidBody type="fixed">
          <CuboidCollider args={[5, 2, 0.5]} position={[0, 1, 5.25]} />\
          <CuboidCollider args={[5, 2, 0.5]} position={[0, 1, -5.25]} />\
          <CuboidCollider args={[0.5, 2, 5]} position={[5.25, 1, 0]} />
          <CuboidCollider args={[0.5, 2, 5]} position={[-5.25, 1, 0]} />
        </RigidBody>

        <RigidBody type="fixed" friction={0.7}>
          <mesh receiveShadow position-y={-1.25}>
            <boxGeometry args={[10, 0.5, 10]} />
            <meshStandardMaterial color="greenyellow" />
          </mesh>
        </RigidBody>
        <InstancedRigidBodies instances={instances}>
          <instancedMesh castShadow args={[null, null, cubesCount]}>
            <boxGeometry />
            <meshStandardMaterial color="tomato" />
          </instancedMesh>
        </InstancedRigidBodies>
      </Physics>
    </>
  );
}
