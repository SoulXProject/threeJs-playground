# R3F(React Three Fiber)를 이용한 인터렉티브 3D 가상환경 웹 개발

'R3F(React Three Fiber)를 이용한 인터렉티브 3D 가상환경 웹 개발' 과정을 듣고 정리한 교안
4일간 과정에 대한 정리와 three.js의 react 패키지인 react-three-fiber와 추가인 패키지들을 이용해 three.js개발을 쉽게 이용해
빠르게 웹3D 애플리케이션을 리액트 개발자들이 만들 수 있게 해줍니다

> three.js를 직접 사용해야 하는 부분들이 얘제 코드에 많이 나오므로 직접 THREE를 쓰는 부분은 three.js의 문서를 찾아가면서 개발에 필요한 부분은 만들어서 사용해야 할 것 같습니다
>
> > three.js는 WebGL을 기반으로 동작하는 그래픽 라이브러리로 threejs로 컴퓨터의 gpu를 사용하고 있는데 openGL의 영향을 받아 90년대에 만들어져왔습니다.
> > WebGPU가 새로운 표준으로 2023에 나오면서 좀 더 WebGL보다 저수준 API로 더 직접적인 GPU 제어와 하드웨어 기능을 잘 활용할 수 있습니다.
> > three.js는 webGPU를 직접 지원하진 않지만 Three.js 래퍼나 확장 라이브러리가 나오는 상황이라 코드를 유지하고 WebGLRenderer -> WebGPURenderer 같이 renderer만 갈아끼워 사용할 수 있게 pr이 올라오고 있다.

## three.js

- threejs.org에서 문서가 정말 친절하게 제공되고 있습니다.
- 기본적인 3차원 그래픽스에서 Mesh라는 개념이 있다. Mesh는 그냥 명제처럼 메시란게 있구나라고 알면 좋습니다!

```
mesh = geometry + texture + animation
```

## 구성

### day1

r3f(react-three-fiber)에서 hook으로 제공해주기 때문에 기본적인 리액트에 대한 강의를 진행했습니다.
리액트에 대한 코드로 jsx / props, state / hook에 대한 기본적인 내용이라 리액트를 처음 접하는 게 아니라면 넘어가도 무방할 것 같습니다.

### day2

r3f에 대한 소개 및 api(Drei)에 대한 코드입니다. react-three-fiber와 react-three-drei라는 r3f helper API를 같이 사용해야 합니다.
그림자 배경, 환경등을 생성후 3d모델을 띄워보고 여러 후처리(PostProcessing)을 실습합니다

> 사용 기술

- react 3d 패키기
  - react-three/fiber
  - react-three/drei
    > 참고로 3d object의 파일은 .fbx .gltf 등등 있는데 해당 파일을 drei에서 load해주는 hook을 제공합니다. ex) useFBX, useGLTF
- 디버깅

  - leva (속성 값 Controls를 제공해줌)
  - r3f-pref (FPS, CPU, GPU사용량을 모니터링해주는 GUI제공)

- 후처리 (noise , blur, glitch 같은 effect)
  - react-three/postprocessing

### day3

day2에서 물체와 인간3d obj를 띄웠다면 물리법칙을 물리엔진 라이브러리(rapier라는)를 이용해서 충돌과 마찰력 중력등을
적용해줄 수 있습니다.

- 충돌체(Collider)
- 물리 힘 작용 <Physhic>
- 강체의 물리적 속성 적용 <RigidBody>
- 충돌 처리

### day4

day2, day3에서 배운 내용들로 가상환경 실습 진행

- 캐릭터와 가상환경 상호작용
- 캐릭터 애니메이션으로 생명 불어넣기
