# react-vite-threejs
vite를 이용해 만든 spa애플리케이션에 react-three-fiber로 three.js 사용한 프로젝트

## 웹 애플리케이션에서 threejs
- react-three-fiber
    - 추상화된 hooks를 제공해줌. 
- three , @types/three
    - three라이브러리로 threejs.org에서 제공하는 모든걸 사용할 수 있다! 
    ```
    // OrbitContols를 three에서 가져와서 사용 가능
    import { OrbitControls } from "three/addons/controls/OrbitControls.js";
    ```
- fiber과 three 라이브러리를 둘 다 이용해서 Nextjs나 Vite, CRA에 얹어서 사용하면 된다.

- drei 라이브러리는 fiber보다 좀 더 고수준(high-level)에서 컴포넌트를 제공한다. glTF, FBX등 3D 모델을 불러오는 Lodaer, 카메라를 띄울 때 쓰는 OrbitControls, DragControls, Physics등을 포함

- react-three-fiber는 Three.js를 리액트와 함께 사용하기 위한 라이브러리고, drei는 Three.js를 좀 더 쉽게 사용하는 고수준 컴포넌트 라이브러리다. react-three-fiber는 threejs와 완전히 자유롭게 사용가능한데 drei는 추상화된 걸 제공해서 사용한다.


## 용어 정리

### Geometry(형태)
3d모델은 정점(vertex),선(edge),그리고 그 선들이 합쳐져 만든 면(face)들로 이루어진다.
점은 (x,y,z)좌표를 포함하고 Texture데이터를 매핑하는 2차원 UV좌표, 점마다 색상을 나타내는 3차원데이터 (r,g,b), 법선 방향을 나타내는 벡터 등이 포함.
ex) 정육면체, 구, 공룡모형 ...
- 쉽게 3d 모델의 형태를 정의한다.
- [texture free소스](https://www.textures.com/free)


### Material(재질)
Geometry 형태가 생겼다면 그 모델이 어떤 색을 띄고, 빛을 비췄을 때 어떤 특성을 가지고(ex. 메탈)
모델 표면의 성질은 텍스처(texture)가 사용되는데, 일반적으로 2d이미지 형태로 3d모델에 저장된다.

- 쉽게 3d모델의 색, 텍스처 , 광택등 시각적인 속성이다.
- 텍스처 이미지는 JPG, PNG형식 등이 사용.

### mesh
mesh = Geometry(형태) + Material(재질) 

### glTF(GL Transmission Format)
gltf는 3d모델을 저장한느 형식 중 하나. json형식으로 되어있다. 
로드 시키는 건 크게 어렵지 않을듯! 라이브러리에서 제공

--------
 
### hooks

- useThree
이 후크를 통해 렌더러, 씬, 카메라 등 상태 모델에 대한 액세스를 제공. 또한 화면 및 뷰포트 좌표에서 캔버스 현재 크기를 제공. three의 대부분을이 훅에서 제어 가능.

```
// THREE 객체 생성하는 걸 이 훅으로 래핑해서 구현
new THREE.x
```

[reference]
- [웹 3D 모델 최적화 기법 소개](https://d2.naver.com/helloworld/6152907)