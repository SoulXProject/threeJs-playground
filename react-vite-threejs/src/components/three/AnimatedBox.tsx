import { MutableRefObject, useRef } from "react";
import { useFrame } from "@react-three/fiber";
import { useHelper } from "@react-three/drei";
import { BoxHelper, Object3D } from "three";

type Props = {
  isTesting: boolean;
};

const AnimatedBox: React.FC<Props> = ({ isTesting }: Props) => {
  const meshRef = useRef<THREE.Mesh>(null);

  useHelper(
    isTesting ? (meshRef as MutableRefObject<Object3D>) : null,
    BoxHelper,
    "blue"
  );

  useFrame(() => {
    console.log("useFrame..");

    if (meshRef.current) {
      meshRef.current.rotation.x += 0.01;
    }
  });

  return (
    <mesh ref={meshRef} scale={[0.5, 0.5, 0.5]}>
      {/* 육면체의 geometry */}
      <boxGeometry />
      <meshStandardMaterial />
    </mesh>
  );
};

export default AnimatedBox;
