'use client'
import { Canvas, useFrame } from '@react-three/fiber'
import { Float, MeshDistortMaterial, Torus, Cylinder, Box, Environment, OrbitControls } from '@react-three/drei'
import { useRef } from 'react'

const Gear = (props) => {
  const ref = useRef()
  useFrame((state) => {
    ref.current.rotation.x = state.clock.getElapsedTime() * 0.2
    ref.current.rotation.y = state.clock.getElapsedTime() * 0.3
  })

  return (
    <group ref={ref} {...props}>
       {/* Main Gear Ring */}
      <Torus args={[1, 0.3, 16, 100]} position={[0, 0, 0]}>
        <meshStandardMaterial color="#f97316" roughnes={0.2} metalness={0.8} />
      </Torus>
      {/* Inner Spokes */}
      <Cylinder args={[0.1, 0.1, 2.4]} rotation={[0, 0, Math.PI / 2]}>
        <meshStandardMaterial color="#334155" metalness={1} roughness={0.2} />
      </Cylinder>
      <Cylinder args={[0.1, 0.1, 2.4]} rotation={[0, 0, 0]}>
        <meshStandardMaterial color="#334155" metalness={1} roughness={0.2} />
      </Cylinder>
       {/* Central Hub */}
      <Cylinder args={[0.4, 0.4, 0.5]} rotation={[Math.PI / 2, 0, 0]}>
        <meshStandardMaterial color="#cbd5e1" metalness={0.9} roughness={0.1} />
      </Cylinder>
    </group>
  )
}

const FloatingTools = () => {
    return (
        <>
            <Float speed={2} rotationIntensity={1} floatIntensity={1}>
                <Box args={[0.5, 0.5, 0.5]} position={[2, 1, -1]} rotation={[0.5, 0.5, 0]}>
                    <MeshDistortMaterial color="#f97316" speed={2} distort={0.3} />
                </Box>
            </Float>
            <Float speed={1.5} rotationIntensity={1.5} floatIntensity={1}>
                <Torus args={[0.4, 0.1, 16, 32]} position={[-2, -1, 0]} rotation={[0, 1, 0]}>
                     <meshStandardMaterial color="#94a3b8" metalness={0.8} roughness={0.2} />
                </Torus>
            </Float>
             <Float speed={3} rotationIntensity={2} floatIntensity={0.5}>
                <Cylinder args={[0.1, 0.1, 1]} position={[1, -1.5, 1]} rotation={[1, 0, 1]}>
                     <meshStandardMaterial color="#334155" metalness={0.9} />
                </Cylinder>
            </Float>
        </>
    )
}

const Scene = () => {
  return (
    <div className="absolute inset-0 z-0">
      <Canvas>
        <ambientLight intensity={0.5} />
        <directionalLight position={[10, 10, 5]} intensity={1} />
        <pointLight position={[-10, -10, -10]} intensity={0.5} color="#f97316" />
        <Environment preset="city" />
        
        <Gear scale={1.5} />
        <FloatingTools />
        
        <OrbitControls enableZoom={false} autoRotate autoRotateSpeed={1} />
      </Canvas>
    </div>
  )
}

export default Scene
