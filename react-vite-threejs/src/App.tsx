import { Canvas } from "@react-three/fiber";

import "./App.css";
import { OrbitControls, Stats, useAnimations, useFBX } from "@react-three/drei";
import Lights from "./components/three/Lights";
import Ground from "./components/three/Ground";
import Trees from "./components/three/Trees";
import { useEffect, useRef } from "react";
import { useInput } from "./hooks/useInput";

const SwipeCube = () => {
  const model = useFBX("/swipe_cube.fbx");
  const { actions } = useAnimations(model.animations, model);

  useEffect(() => {
    console.log("actions:", actions);
    actions["Cube|swipe"]?.play();
  }, []);

  return <primitive object={model} scale={0.01} />;
};

const IronMan = () => {
  const { forward, backward, left, right, jump, shift } = useInput();
  const fbx = useFBX("/mark3_player.fbx");
  const currentAction = useRef("");
  const { actions } = useAnimations(fbx.animations, fbx);

  useEffect(() => {
    // 'Armature|' 이렇게 key값으로 내려오는건 blender 렌더링 시 이름이 이렇게 붙어서
    let action = "";
    if (forward || backward || left || right) {
      action = "Armature|walk";
    } else if (jump) {
      action = "Armature|jump";
    } else if (shift) {
      action = "Armature|run";
    } else {
      action = "Armature|idle";
    }

    // action이랑 매핑하는 코드
    if (currentAction.current != action) {
      console.log("current action:::", currentAction);
      const nextActionToPlay = actions[action];
      const current = actions[currentAction.current];
      current?.fadeOut(0.1); // animation action 속성
      nextActionToPlay?.reset().fadeIn(0.1).play();
      currentAction.current = action;
    }

    console.log("ironman actions", actions);
    // actions["Armature|idle"]?.play();
  }, [forward, backward, left, right, jump, shift]);

  return <primitive object={fbx} scale={0.013} />;
};

function App() {
  // test모드면 axe축과, fps모니터링 띄워주도록
  const testing = true;
  const mark3 = useFBX("/mark3.fbx");

  return (
    <div className="container">
      <p className="header">
        <h2>react to vite (feat.threejs)</h2>
      </p>

      {/*
       Canvas에 camera프로퍼티로 fov , near, aspect, far 설정 가능. (카메라 시야)
       orthographic : 직교(카메라)
       */}
      <Canvas style={{ height: 800 }} camera={{ fov: 40 }} shadows>
        {/* threejs의 OrbitController를 drei라이브러리의 추상화된 컴포넌트로 대채가능*/}
        {/* <CameraOrbitController /> */}
        {/* 왼쪽 상단에 frame상태를 나타냄 120fps면 준수. 무거운 컨텐츠를 띄워서 rate가 낮아지는 걸 체크할 수 있다. */}
        {testing ? <Stats /> : null}
        {/* threejs.org에 있는 axesHelper x,y,z좌표계  drei를 이용해서 hooks로 사용가능*/}
        {testing ? <axesHelper visible={true} args={[2]} /> : null}
        {testing ? <gridHelper args={[10]} /> : null}
        {/* <SwipeCube /> */}

        <IronMan />
        <OrbitControls />
        {/* light 색상 */}
        <directionalLight color={"#333333"} position={[0, 5, 5]} />
        <Lights />
        <Ground />
        <Trees boundary={100} count={20} />
      </Canvas>
    </div>
  );
}

export default App;
