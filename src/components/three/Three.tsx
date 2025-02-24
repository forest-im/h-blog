'use client'
import { useFBX, useGLTF } from '@react-three/drei'
import { Canvas, useFrame, useThree } from '@react-three/fiber'
import { useControls } from 'leva'
import * as THREE from 'three'

// import { useFrame, useThree } from '@react-three/fiber'
import { useEffect, useRef, useState } from 'react'

const modes = ['translate', 'rotate', 'scale']

const Receipt = () => {
  const { nodes } = useGLTF('/glb/receipt.glb')
  // const fbx = useFBX('/fbx/receipt.fbx')
  const receiptRef = useRef<THREE.Mesh>(null)
  const rotationRef = useRef([0, 0, 0]) // 현재 회전 상태
  const receipt = nodes?.receipt as THREE.Mesh
  const scene = useThree((state) => state.scene)
  const [isClicked, setIsClicked] = useState(false)
  const originalScale = useRef(new THREE.Vector3(1, 1, 1)) // 초기 크기 저장
  const isScaled = useRef(false) // 한 번만 커지도록 방지

  console.log(nodes)

  useFrame(() => {
    if (isClicked && receiptRef.current && !isScaled.current) {
      // 원래 크기의 10% 증가
      receiptRef.current.scale.set(
        originalScale.current.x * 1.1,
        originalScale.current.y * 1.1,
        originalScale.current.z * 1.1
      )
      isScaled.current = true // 다시 커지는 것을 방지
      setIsClicked(false)
    }
  })

  console.log(scene.getObjectByName('receipt'))

  return (
    <group
      ref={receiptRef}
      // onPointerDown={onPointerDown}
      // onPointerMove={onPointerMove}
      // onPointerUp={onPointerUp}
      onClick={(e) => (e.stopPropagation(), setIsClicked(true))}
      rotation={[
        THREE.MathUtils.degToRad(0),
        THREE.MathUtils.degToRad(0),
        THREE.MathUtils.degToRad(90),
      ]}
    >
      <mesh
        name={'receipt'}
        // onPointerOver={(e) => (e.stopPropagation(), setHovered(true))}
        geometry={receipt.geometry}
        material={receipt.material}
        // material-color={isClicked ? '#ff6080' : 'white'}
        dispose={null}
      />
    </group>
  )
}

const Money = () => {
  const { nodes } = useGLTF('glb/0225-money2.glb')
  const planesRef = useRef<{ [key: string]: THREE.Mesh | undefined }>({})
  const cameraRef = useRef<THREE.PerspectiveCamera | null>(null)

  const [scrollY, setScrollY] = useState(0)
  const [maxScroll, setMaxScroll] = useState(0)

  const hiddenY = 13 // 초기 위치 (높은 곳에서 시작)
  const baseSpacing = 0.7 // 초기 간격 (처음에는 넓게)
  const minSpacing = 0 // 최소 간격 (너무 좁아지지 않도록)
  // const spacing = 0.5 // 각 오브젝트 간격 (더 크게 설정)
  const dropSpeed = 0.009 // 떨어지는 속도 (스크롤 감지 비율)

  useEffect(() => {
    const updateScroll = () => {
      const scrollTop = window.scrollY
      const maxScrollHeight = document.documentElement.scrollHeight - window.innerHeight

      setScrollY(Math.min(scrollTop, maxScrollHeight)) // 스크롤이 최댓값을 넘지 않도록 제한
      setMaxScroll(maxScrollHeight)
    }

    window.addEventListener('scroll', updateScroll)
    updateScroll() // 초기 설정
    return () => window.removeEventListener('scroll', updateScroll)
  }, [])

  useFrame((state, delta) => {
    Object.keys(nodes).forEach((key, index) => {
      const mesh = planesRef.current[key]
      if (mesh) {
        // 스크롤이 최하단에 도달하면 마지막 위치 유지
        // if (scrollY >= maxScroll) return

        const spacing = Math.max(baseSpacing, minSpacing)
        // 오브젝트가 위에서 떨어지듯 보이도록 설정
        const baseY = hiddenY - index * (spacing * (scrollY * 0.01)) // 초기 위치 설정
        const targetY = Math.max(baseY - scrollY * dropSpeed, -5) // 자연스럽게 떨어지는 효과
        const scaleFactor = Math.min(1 + scrollY * 0.1, 1.5) // 최대 2배까지 커짐
        // 회전 조정 (오른쪽으로 기울어지도록 x축 회전)
        const rotationX = Math.min(scrollY * 0.5, Math.PI / -8) // 최대 45도 회전

        // 부드럽게 변화 적용
        mesh.position.y = THREE.MathUtils.lerp(
          mesh.position.y,
          targetY - 5 * (scrollY * 0.001),
          0.05
        )
        mesh.scale.setScalar(THREE.MathUtils.lerp(mesh.scale.x, scaleFactor, 0.1))
        // mesh.rotation.z = THREE.MathUtils.lerp(mesh.rotation.x, rotationX, 0.1)
        mesh.rotation.y = THREE.MathUtils.lerp(mesh.rotation.x, rotationX, -0.2)
      }
    })
  })

  useFrame((state, delta) => {
    if (cameraRef.current) {
      // 카메라가 천천히 회전하도록 설정 (y축 중심 회전)
      // cameraRef.current.rotation.x += delta * 0.1
    }
  })

  return (
    <>
      <group>
        {Object.keys(nodes).map((key, index) => (
          <mesh
            key={key}
            ref={(el) => (planesRef.current[key] = el as THREE.Mesh)}
            geometry={(nodes[key] as THREE.Mesh).geometry}
            material={(nodes[key] as THREE.Mesh).material}
            position={[0, hiddenY - index * baseSpacing, 0]} // 초기 위치 조정
          >
            <meshStandardMaterial
              color={'#c4e9c5'} // 초록색 머테리얼 적용 (원하는 색상 변경 가능)
              roughness={0.8} // 거칠기 (낮을수록 반사 증가)
              metalness={0.2} // 금속 느낌 (1에 가까울수록 금속처럼 보임)
              flatShading={false} // 플랫 쉐이딩 적용 (각진 느낌)
            />
          </mesh>
        ))}
      </group>
      <perspectiveCamera ref={cameraRef} />
    </>
  )
}

function ThreeElement() {
  // const { size, gl, scene, camera } = useThree() // This will just crash
  const boxRef = useRef<THREE.Mesh>(null)
  const boxCopyRef = useRef<THREE.Mesh>(null)
  const fbx = useFBX('/fbx/receipt.fbx')

  const boxControls = useControls({
    width: { value: 2, min: 1, max: 10, step: 0.1 },
    height: { value: 2, min: 1, max: 10, step: 0.1 },
    depth: { value: 1, min: 1, max: 10, step: 0.1 },
    widthSegments: { value: 1, min: 1, max: 10, step: 1 },
    heightSegments: { value: 1, min: 1, max: 10, step: 1 },
    depthSegments: { value: 1, min: 1, max: 10, step: 1 },
  })

  const circleControls = useControls({
    radius: { value: 5, min: 1, max: 10, step: 0.1 },
    seg: { value: 32, min: 1, max: 100, step: 1 },
    thetaStart: { value: 0, min: 0, max: 360, step: 0.1 },
    thetaLength: { value: 360, min: 0, max: 360, step: 0.1 },
  })

  // const box = useControls({
  //   roation: { value: 0, min: -360, max: 360, step: 1 },
  // })

  // const light1 = new THREE.PointLight(0xf0ecdb, 1, 100)

  // const helper1 = new THREE.PointLightHelper(light1, 1)

  // useHelper

  // useFrame((state, delta) => {
  //   // boxRef.current.rotation.x += delta;
  //   // boxRef.current.position.y -= 0.01;
  //   // scene.rotation.z += delta
  //   // boxRef.current.rotation.x -= 0.01
  //   // scene.add(helper1)
  //   // scene.position.x += 0.01;
  // })

  useEffect(() => {
    if (boxCopyRef.current && boxRef.current) {
      boxCopyRef.current.geometry = boxRef.current.geometry
    }
  }, [boxControls])

  return (
    <>
      <hemisphereLight
        color="#ffffff"
        groundColor="#b9b9b9"
        position={[-7, 25, 13]}
        intensity={0.85}
      />
      <directionalLight position={[5, 50, 5]} color="white" scale={0.5} intensity={1} />
      <ambientLight intensity={1} />

      {/* <group>
        <Box position={[-2, 0, 0]}>
          <meshStandardMaterial color="green" wireframe />
        </Box>

        <Sphere position={[0, 0, 0]}>
          <meshStandardMaterial color="green" />
        </Sphere>

        <Cone position={[2, 0, 0]}>
          <meshStandardMaterial color="green" />
        </Cone>
      </group> */}

      <Receipt />
      {/* <mesh geometry={new THREE.BoxGeometry(1, 1, 1)}>
        <meshStandardMaterial color="red" />
      </mesh> */}

      <group>
        {/* 같은 geometry 공유하기 */}
        {/* <mesh ref={boxRef} position={[0, 0, 0]}>
          <boxGeometry
            args={[
              boxControls.width,
              boxControls.height,
              boxControls.depth,
              boxControls.widthSegments,
              boxControls.heightSegments,
              boxControls.depthSegments,
            ]}
          />
          <meshStandardMaterial wireframe />
        </mesh> */}
        {/* <mesh ref={boxRef} position={[0, 0, 0]}>
          <circleGeometry
            args={[
              circleControls.radius,
              circleControls.seg,
              THREE.MathUtils.degToRad(circleControls.thetaStart),
              THREE.MathUtils.degToRad(circleControls.thetaLength),
            ]}
          />
          <meshStandardMaterial color="red" wireframe />
        </mesh>

        <mesh ref={boxCopyRef}>
          <meshStandardMaterial color="yellow" />
        </mesh> */}
      </group>

      {/* <directionalLight position={[5,5,5]} />
            <mesh 
                ref={boxRef}
                rotation={
                    [
                        THREE.MathUtils.degToRad(45),
                        THREE.MathUtils.degToRad(box.roation),
                        0
                    ]
                }
            >
                <boxGeometry />
                <meshStandardMaterial color="red" />
            </mesh> */}
    </>
  )
}

const Element = () => {
  const meshRef = useRef<THREE.Mesh>(null)
  const groupRef = useRef<THREE.Group>(null)

  // const matcap = useTexture('./imgs/matcap3.jpg')
  // const tone = useTexture('./imgs/fiveTone.jpg')

  // tone.minFilter = THREE.NearestFilter

  const controls = useControls({
    value: 'white',
    thickness: { value: 0.1, min: 0, max: 1, step: 0.1 },
  })

  useFrame((state, delta) => {})

  useEffect(() => {
    for (let i = 0; i < groupRef.current?.children.length; i++) {
      const mesh = groupRef.current?.children[i] as THREE.Mesh

      mesh.geometry = meshRef.current?.geometry
      mesh.position.x = i * 2 - 10
    }
  }, [])

  return (
    <>
      <directionalLight position={[5, 5, 5]} intensity={1} />
      {/* <fog attach="fog" args={['blue', 3, 10]} /> */}
      {/* <Receipt /> */}
      <mesh position={[0, 0, 0]} ref={meshRef}>
        <torusKnotGeometry args={[0.5, 0.2]} />
        <meshBasicMaterial color="green" />
      </mesh>

      <group ref={groupRef}>
        <mesh>
          <meshBasicMaterial wireframe color="green" />
        </mesh>

        <mesh>
          <meshBasicMaterial
            color="red"
            visible={true}
            transparent={true}
            opacity={1}
            side={THREE.FrontSide}
            alphaTest={1}
            depthTest={true}
            depthWrite={true}
            // fog={true}
          />
        </mesh>

        <mesh>
          <meshLambertMaterial
            color="red"
            visible={true}
            transparent={true}
            opacity={1}
            side={THREE.FrontSide}
            alphaTest={1}
            depthTest={true}
            depthWrite={true}
            // fog={true}
            emissive={'yellow'}
          />
        </mesh>

        <mesh>
          <meshPhongMaterial
            color="red"
            visible={true}
            transparent={true}
            opacity={1}
            side={THREE.FrontSide}
            alphaTest={1}
            depthTest={true}
            depthWrite={true}
            // fog={true}
            emissive={'black'}
            specular={'white'}
            shininess={30}
            flatShading={true}
          />
        </mesh>

        <mesh>
          <meshNormalMaterial />
        </mesh>

        <mesh>
          <meshStandardMaterial
            color="red"
            visible={true}
            transparent={true}
            opacity={1}
            side={THREE.FrontSide}
            alphaTest={1}
            depthTest={true}
            depthWrite={true}
            // fog={true}
            emissive={'black'}
            roughness={0.1}
            metalness={0}
          />
        </mesh>

        <mesh>
          <meshPhysicalMaterial
            color="red"
            visible={true}
            transparent={true}
            opacity={1}
            side={THREE.FrontSide}
            alphaTest={1}
            depthTest={true}
            depthWrite={true}
            // fog={true}
            emissive={'black'}
            roughness={0.1}
            metalness={0}
            clearcoat={1}
            clearcoatRoughness={0}
            transmission={10}
            thickness={controls.thickness}
            ior={2}
          />
        </mesh>

        <mesh>{/* <meshToonMaterial gradientMap={tone} color="pink" /> */}</mesh>
      </group>
    </>
  )
}

export default function Three() {
  // const red = new THREE.MeshLambertMaterial({ color: 'red' })
  // const sphere = new THREE.SphereGeometry(1, 28, 28)

  const camera = useControls({
    fov: { value: 75, min: 0, max: 180, step: 1 },
    near: { value: 3, min: 0, max: 100, step: 1 },
    far: { value: 20, min: 0, max: 100, step: 1 },
    position: { value: [5, 5, 5] },
  })

  const color = useControls({
    value: 'white',
  })

  const grid = useControls({
    segment: { value: 10, min: 2, max: 100, step: 1 },
  })

  return (
    <div id="canvas-container" className="w-full min-h-[200vh] h-screen">
      <Canvas
        camera={{
          fov: camera.fov,
          near: camera.near,
          far: camera.far,
          position: camera.position,
        }}
      >
        <directionalLight position={[2, 2, 2]} intensity={5} /> 태양광처럼 강한 빛 추가
        <pointLight position={[0, 5, 5]} intensity={1.5} />
        {/* <color attach={'background'} args={[color.value]} /> */}
        {/* <axesHelper args={[6]} />
        <gridHelper args={[10, grid.segment]} /> */}
        <Money />
        {/* <ThreeElement /> */}
        {/* <Element /> */}
        {/* <ContactShadows
          rotation-x={Math.PI / 2}
          position={[0, -35, 0]}
          opacity={0.25}
          width={200}
          height={200}
          blur={1}
          far={50}
        /> */}
        {/* <OrbitControls /> */}
      </Canvas>
    </div>
  )
}
