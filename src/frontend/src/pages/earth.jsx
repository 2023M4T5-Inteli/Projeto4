import * as THREE from 'three'
import { useRef, useState } from 'react'
import { Canvas, useFrame } from '@react-three/fiber'
import { useGLTF, Html, OrbitControls, Environment, ContactShadows } from '@react-three/drei'
import { FaMapMarkerAlt } from 'react-icons/fa'
import { Typography } from '@mui/material'
import { Height } from '@mui/icons-material'

function Model(props) {
  const { nodes, materials } = useGLTF('/earth.gltf')
  const earthRef = useRef()

  useFrame(() => {
    earthRef.current.rotation.y += 0.001
  })

  return (
    <group ref={earthRef} rotation={[-Math.PI / 2, 0, Math.PI]} {...props} dispose={null}>
      <mesh geometry={nodes['URF-Height_Lampd_Ice_0'].geometry} material={materials.Lampd_Ice} />
      <mesh geometry={nodes['URF-Height_watr_0'].geometry} material={materials.watr} material-roughness={0} />
      <mesh geometry={nodes['URF-Height_Lampd_0'].geometry} material={materials.Lampd} material-color="lightgreen">
        <Marker rotation={[0, Math.PI / 2, 0]} position={[0.5, 1.5, -0.6]}>
          <div style={{ position: 'absolute', fontSize: 10, letterSpacing: -0.5, left: 17.5 }}>Pirelli</div>
          <FaMapMarkerAlt style={{ color: 'indianred' }} />
        </Marker>
        <group position={[0, 0, 1.3]} rotation={[0, 0, Math.PI]}></group>
      </mesh>
    </group>
  )
}

function Marker({ children, ...props }) {
  const ref = useRef()
  const [isOccluded, setOccluded] = useState()
  const [isInRange, setInRange] = useState()
  const isVisible = isInRange && !isOccluded
  const vec = new THREE.Vector3()

  useFrame((state) => {
    const range = state.camera.position.distanceTo(ref.current.getWorldPosition(vec)) <= 10
    if (range !== isInRange) setInRange(range)
  })

  return (
    <group ref={ref}>
      <Html
        transform
        occlude
        onOcclude={setOccluded}
        style={{ transition: 'all 0.2s', opacity: isVisible ? 1 : 0, transform: `scale(${isVisible ? 1 : 0.25})` }}
        {...props}>
        {children}
      </Html>
    </group>
  )
}

export default function Viewer() {
  return (
    <div>
      <Typography variant="h4" mt={3} sx={{ textAlign: 'center' }}>
        There is no power without control.
      </Typography>
      <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
        <Canvas camera={{ position: [-5, 0, 5], fov: 50 }} style={{ width: '600px', height: '600px' }}>
          <ambientLight intensity={0.5} />
          <Model position={[0, 0.25, 0]} />
          <Environment preset="city" /> 
          <ContactShadows frames={1} scale={5} position={[0, -1, 0]} far={1} blur={5} opacity={0.5} color="#204080" />
          <OrbitControls />
        </Canvas>
      </div>
    </div>
  )
}
