/**
 * 카메라 궤도 컨드롤러
 * OrbitControls를 이용해 Camera제어
 */

import { useThree } from "@react-three/fiber";
import { useEffect } from "react";
import { OrbitControls } from "three/addons/controls/OrbitControls.js";


const CameraOrbitController = () => {
  /**
   * useThree로 렌더러(gl), 카메라, 씬등 THREE 객체에서 제공하는 모든 걸 제공.
   * 보통 OrbitControls로 카메라 컨트롤함.
   */
  const { gl, camera } = useThree();
  useEffect(() => {
    const controls = new OrbitControls(camera, gl.domElement);
    // camera, gl변경시 re-render
    return () => {
      controls.dispose();
    };
  }, [camera, gl]);
  return null;
};

export default CameraOrbitController;
