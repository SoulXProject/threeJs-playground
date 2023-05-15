import { useTexture } from "@react-three/drei";

const TexturedSpheres = () => {
  const metalMap = useTexture("./textures/metal.webp");
  const metalNormal = useTexture("./textures/metal_normal.jpg");
  const metalRoughness = useTexture("./textures/metal_roughness.jpg");
  return (
    <>
      <mesh scale={[0.5, 0.5, 0.5]} position={[-1, 0, 0]}>
        {/* 원뿔의 geometry */}
        <sphereGeometry />
        <meshStandardMaterial map={metalMap} />
      </mesh>
      <mesh scale={[0.5, 0.5, 0.5]} position={[0, 0, 0]}>
        {/* 원뿔의 geometry */}
        <sphereGeometry />
        <meshStandardMaterial map={metalMap} normalMap={metalNormal} />
      </mesh>
      <mesh scale={[0.5, 0.5, 0.5]} position={[1, 0, 0]}>
        {/* 원뿔의 geometry */}
        <sphereGeometry />
        {/* roughness로 좀더 현실세계같은 질감처리를 할 수 있다. */}
        <meshStandardMaterial map={metalMap} roughnessMap={metalRoughness} />
      </mesh>
    </>
  );
};

export default TexturedSpheres;
