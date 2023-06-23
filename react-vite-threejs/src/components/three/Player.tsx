import { OrbitControls, useAnimations, useFBX } from "@react-three/drei";
import { useEffect, useRef } from "react";
import { useInput } from "../../hooks/useInput";
import { useFrame, useThree } from "@react-three/fiber";

const Player = () => {
  const { forward, backward, left, right, jump, shift } = useInput();
  const fbx = useFBX("/mark3_player.fbx");
  const { actions } = useAnimations(fbx.animations, fbx);

  const currentAction = useRef("");
  const controlsRef = useRef<typeof OrbitControls>();
  // useThree훅으로 camera객체 생성
  const camera = useThree((state) => state.camera);

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

    // action 처리
    if (currentAction.current != action) {
      const nextActionToPlay = actions[action];
      const current = actions[currentAction.current];

      current?.fadeOut(0.1); // animation action 속성
      nextActionToPlay?.reset().play();
      currentAction.current = action;
    }

    // actions["Armature|idle"]?.play();
  }, [forward, backward, left, right, jump, shift]);

  useFrame((state, delta) => {
    if (
      currentAction.current == "Armature|run" ||
      currentAction.current == "Armature|walk"
    ) {
      console.log("move!");
      fbx.position.x += 0.1;

      // camera 객체 방향 따라 계산
      //   let angleYCameraDirection = Math.atan2(
      //     (camera.position.x = fbx.position.x),
      //     (camera.position.z = fbx.position.z)
      //   );
    }
  });

  return (
    <>
      <OrbitControls ref={controlsRef} />
      <primitive object={fbx} scale={0.013} />
    </>
  );
};

export default Player;
