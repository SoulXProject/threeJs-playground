import { useFBX } from "@react-three/drei";
import { useEffect, useState } from "react";

/**
 * model은 참조(reference) 객체여서 3개의 나무를 심으려
 * object3D를 3개 넣어도 마지막 [6,0,0]로만 나온다.
 *
 * 이 문제를 해결하기 위해 clone을 사용해서 복사.
 *
 * - <group>
 * 으로 묶어서 함께 transform함ㄹ 수 있습니다.
 */

type treeType = {
  position: { x: number; z: number };
  box: number;
};

type Props = {
  boundary: number; // boundary를 넓게 잡으면 넓게 퍼지고 적게 잡으면 좁게 포진함
  count: number;
};

const Trees: React.FC<Props> = ({ boundary, count }) => {
  const model = useFBX("./tree.fbx");
  console.log("model 정보!", model);
  const [trees, setTrees] = useState<treeType[]>([]); // tree를 여러 개 맵에 설치

  // 랜덤으로 생성된 나무의 position이 완전 같을 수 있으면 겹치는 걸 방지
  const newPosition = (box: number, boundary: number) => {
    return (
      boundary / 2 -
      box / 2 -
      (boundary - box) * (Math.round(Math.random() * 100) / 100)
    );
  };

  const boxIntersect = (
    minAx: number,
    minAz: number,
    maxAx: number,
    maxAz: number,
    minBx: number,
    minBz: number,
    maxBx: number,
    maxBz: number
  ) => {
    let aLeftOfB = maxAx < minBx;
    let aRightOfB = minAx > maxBx;
    let aAboveB = minAz > maxBz;
    let aBelowB = maxAz < minBz;
    return !(aLeftOfB || aRightOfB || aAboveB || aBelowB);
  };

  // 나무들이 겹치는 지 계산식
  const isOverLapping = (index: number, tree: any, trees: any[]) => {
    console.log("tree position", tree.position);
    const minTargetX = (tree.position.x - tree.box) / 2;
    const maxTargetX = (tree.position.x + tree.box) / 2;
    const minTargetZ = (tree.position.z - tree.box) / 2;
    const maxTargetZ = (tree.position.z + tree.box) / 2;

    for (let i = 0; i < index; i++) {
      let minChildX = trees[i].position.x - trees[i].box / 2;
      let maxChildX = trees[i].position.x + trees[i].box / 2;
      let minChildZ = trees[i].position.z - trees[i].box / 2;
      let maxChildZ = trees[i].position.z + trees[i].box / 2;

      if (
        boxIntersect(
          minTargetX,
          minTargetZ,
          maxTargetX,
          maxTargetZ,
          minChildX,
          minChildZ,
          maxChildX,
          maxChildZ
        )
      ) {
        console.log("contents box 겹침!", tree.position);
        return true;
      }
    }
    return false;
  };

  const updatePosition = (treeArray: treeType[], boundary: number) => {
    treeArray.forEach((tree, idx) => {
      do {
        // 포지션을 랜덤으로 주도록
        tree.position.x = newPosition(tree.box, boundary);
        tree.position.z = newPosition(tree.box, boundary);
      } while (isOverLapping(idx, tree, treeArray));
    });
    setTrees(treeArray);
  };

  useEffect(() => {
    const tempTrees: treeType[] = [];
    for (let i = 0; i < count; i++) {
      tempTrees.push({ position: { x: 0, z: 0 }, box: 1 });
    }
    console.log(tempTrees);
    updatePosition(tempTrees, boundary);
  }, [boundary, count]);

  return (
    <group rotation={[0, 4, 0]}>
      {trees.map((tree, index) => (
        <object3D key={index} position={[tree.position.x, 0, tree.position.z]}>
          <primitive object={model.clone()} scale={0.005} />
          <mesh scale={[tree.box, tree.box, tree.box]}>
            <boxGeometry />
            <meshBasicMaterial color={"blue"} wireframe />
          </mesh>
        </object3D>
      ))}
    </group>
  );
};

export default Trees;
