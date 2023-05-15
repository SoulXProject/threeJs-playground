import { Canvas } from "@react-three/fiber";
// import AnimatedBox from "./components/three/AnimatedBox";
// import CameraOrbitController from "./components/three/CameraOrbitController";
import "./App.css";
import { OrbitControls, Stats, Torus, useTexture } from "@react-three/drei";
import TexturedSpheres from "./components/three/TexturedSpheres";

const TexturedSphere = () => {
  const metalMap = useTexture("./textures/metal.webp");
  const metalNormal = useTexture("./textures/metal_normal.jpg");
  const metalRoughness = useTexture("./textures/metal_roughness.jpg");
  return (
    <>
      <mesh scale={[0.5, 0.5, 0.5]} position={[0, 1, 0]}>
        {/* 원뿔의 geometry */}
        <sphereGeometry />
        {/* roughness로 좀더 현실세계같은 질감처리를 할 수 있다. */}
        <meshStandardMaterial
          map={metalMap}
          normalMap={metalNormal}
          roughnessMap={metalRoughness}
        />
      </mesh>
    </>
  );
};

function App() {
  // test모드면 axe축과, fps모니터링 띄워주도록
  const testing = true;
  return (
    <div className="container">
      <p className="header">
        <h2>react to vite (feat.threejs)</h2>
      </p>

      {/*
       Canvas에 camera프로퍼티로 fov , near, aspect, far 설정 가능. (카메라 시야)
       orthographic : 직교(카메라)
       */}
      <Canvas style={{ height: 600 }} camera={{ fov: 40 }}>
        {/* threejs의 OrbitController를 drei라이브러리의 추상화된 컴포넌트로 대채가능*/}
        {/* <CameraOrbitController /> */}

        {/* 왼쪽 상단에 frame상태를 나타냄 120fps면 준수. 무거운 컨텐츠를 띄워서 rate가 낮아지는 걸 체크할 수 있다. */}
        {testing ? <Stats /> : null}
        {/* threejs.org에 있는 axesHelper x,y,z좌표계  drei를 이용해서 hooks로 사용가능*/}
        {testing ? <axesHelper visible={true} args={[2]} /> : null}
        {testing ? <gridHelper args={[10]} /> : null}

        <OrbitControls />

        {/* Light주기 */}
        {/* <ambientLight intensity={0.3} /> */}
        {/* light 색상 */}
        {/* <directionalLight color={"#333333"} position={[0, 5, 5]} /> */}
        {/* <AnimatedBox isTesting={testing} /> */}

        <ambientLight />
        <mesh rotation-x={Math.PI * -0.5}>
          <planeBufferGeometry args={[5, 5]} />
          <meshStandardMaterial color={"#458745"} />
        </mesh>

        <TexturedSphere />
        {/* <Torus /> */}
      </Canvas>
    </div>
  );
}

export default App;
