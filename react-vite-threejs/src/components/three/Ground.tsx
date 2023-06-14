import React, { useRef } from "react";

const Ground: React.FC = () => {
   return (
    <>
      <mesh rotation-x={Math.PI * -0.5}>
          {/*  맵 사이즈 100 * 100 , 맵 color 주기 */}
          <planeBufferGeometry args={[1000,1000]} />
          <meshStandardMaterial color={"#458745"} />
        </mesh>
    </>
  );
};

export default Ground; 
