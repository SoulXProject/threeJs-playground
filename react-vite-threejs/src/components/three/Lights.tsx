import { useHelper } from "@react-three/drei";
import React, { useRef } from "react";
import { DirectionalLight, DirectionalLightHelper } from "three";

const Lights: React.FC = () => {
  const lightRef = useRef<THREE.DirectionalLight>(null);
  useHelper(lightRef, DirectionalLightHelper, 5, "red");
  return (
    <>
      <ambientLight intensity={0.3} />
      <directionalLight ref={lightRef} position={[10, 10, 0]} castShadow 
         shadow-mapSize-height={1000}
         shadow-mapSize-weight={1000}
         shadow-camera-left={-20} 
         shadow-camera-right={20} 
         shadow-camera-top={20} 
         shadow-camera-bottom={20} 
      />
       <hemisphereLight args={[ "#7cdbe6", "#5e9c49" , 0.7]} />
    </>
  );
};

export default Lights; 
