'use client'
import { OrbitControls, useFBX } from '@react-three/drei'
import { Canvas } from '@react-three/fiber'
import { useControls } from 'leva'
import * as THREE from 'three'

// import { useFrame, useThree } from '@react-three/fiber'
import { useRef } from 'react'

function ThreeElement() {
  // const { size, gl, scene, camera } = useThree() // This will just crash
  const boxRef = useRef<THREE.Mesh>(null)
  const fbx = useFBX('/3d/coin3.fbx')

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

  return (
    <>
      {/* <directionalLight position={[5,50,5]} 
          color='red'
          scale={0.1}
        /> */}

      <group position={[0, 0, 0]}>
        <mesh
          ref={boxRef}
          position={[0.5, 0.5, 2]}
          scale={0.01}
          rotation={[THREE.MathUtils.degToRad(45), 0, 0]}
        >
          <primitive object={fbx} />
        </mesh>
        {/* <ambientLight intensity={0.1} /> */}
      </group>

      {/* <mesh ref={boxRef}
          position={[0.5,0.5,2]}
          scale={[1,1,0.5]}
          rotation={[THREE.MathUtils.degToRad(45),0,0]}
        >

          <boxGeometry />
          <meshStandardMaterial color='blue'  />
        </mesh> */}
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

export default function Three() {
  // const red = new THREE.MeshLambertMaterial({ color: 'red' })
  // const sphere = new THREE.SphereGeometry(1, 28, 28)

  const color = useControls({
    value: 'white',
  })

  const grid = useControls({
    segment: { value: 10, min: 2, max: 100, step: 1 },
  })

  return (
    <div id="canvas-container" className="w-full h-screen">
      <Canvas
        camera={{
          fov: 75,
          near: 1,
          far: 100,
          position: [5, 5, 5],
        }}
      >
        <color attach={'background'} args={[color.value]} />
        <OrbitControls />
        <axesHelper args={[6]} />
        <gridHelper args={[10, grid.segment]} />
        <ThreeElement />
      </Canvas>
    </div>
  )
}
