'use client'
import { Canvas, useFrame } from '@react-three/fiber'
import { Environment, OrbitControls, useGLTF } from '@react-three/drei'
import React, { useRef, useMemo, useEffect, useState, Suspense } from 'react'
import { Box3, Vector3 } from 'three'

// Helper function to calculate bounding box size
const getModelSize = (scene) => {
  const box = new Box3().setFromObject(scene)
  const size = new Vector3()
  box.getSize(size)
  return Math.max(size.x, size.y, size.z)
}

// Center hammer (pliers) - rotates on 2 axes AND orbits around center
const CenterHammer = ({ orbitRadius, orbitSpeed, initialAngle, isHovered = false, targetSize, ...props }) => {
  const ref = useRef()
  const orbitRef = useRef()
  const scaleRef = useRef(1)
  const [calculatedScale, setCalculatedScale] = useState(4.5)
  
  // Construct absolute URL for the model to avoid parsing issues
  const modelUrl = useMemo(() => {
    if (typeof window !== 'undefined') {
      return '/3D/hand-pliers-1.snapshot.11.gltf.glb'
    }
    return '/3D/hand-pliers-1.snapshot.11.gltf.glb'
  }, [])
  
  // Hooks must be called unconditionally at the top level
  // useGLTF will throw errors that should be caught by error boundaries
  // We check if the result is valid before using it
  const gltf = useGLTF(modelUrl)
  
  const scene = gltf?.scene
  
  const clonedScene = useMemo(() => {
    if (!scene) return null
    const cloned = scene.clone()
    // Calculate scale based on target size to match other objects
    if (targetSize) {
      const modelSize = getModelSize(cloned)
      const scale = targetSize / modelSize
      setCalculatedScale(scale)
    }
    return cloned
  }, [scene, targetSize])

  useFrame((state, delta) => {
    const t = state.clock.getElapsedTime()
    
    // No hover effects - simple constant scale
    const targetScale = 1
    scaleRef.current = targetScale
    
    // No rotation speed multiplier - constant speed
    const rotationMultiplier = 1
    
    if (orbitRef.current && orbitRadius > 0) {
      // Orbital motion around the center - slower and smoother
      const angle = initialAngle + t * orbitSpeed
      orbitRef.current.position.x = Math.cos(angle) * orbitRadius
      orbitRef.current.position.z = Math.sin(angle) * orbitRadius
    }
    
    if (ref.current) {
      // Rotation on 2 axes - slower and consistent
      ref.current.rotation.y = t * 0.3
      ref.current.rotation.x = t * 0.2
      // Apply constant scale
      ref.current.scale.setScalar(calculatedScale * scaleRef.current)
    }
  })

  if (!clonedScene) return null

  return (
    <group ref={orbitRef}>
      <primitive ref={ref} object={clonedScene} {...props} />
    </group>
  )
}

// Static hammer - matches pattern of other 3D objects
const StaticHammer = ({ targetSize, isHovered = false, onRotationToZero, shouldStop = false, ...props }) => {
  const ref = useRef()
  const groupRef = useRef()
  const scaleRef = useRef(1)
  const lastRotationRef = useRef(0)
  const hasTriggeredRef = useRef(false)
  const [calculatedScale, setCalculatedScale] = useState(1)
  
  // Construct absolute URL for the model to avoid parsing issues
  const modelUrl = useMemo(() => '/3D/Hammer.glb', [])
  
  // Hooks must be called unconditionally at the top level
  // useGLTF will throw errors that should be caught by error boundaries
  // We check if the result is valid before using it
  const gltfData = useGLTF(modelUrl)
  
  const scene = gltfData?.scene
  
  const clonedScene = useMemo(() => {
    if (!scene) return null
    try {
      const cloned = scene.clone()
      // Calculate scale based on target size to match other objects
      if (targetSize) {
        const modelSize = getModelSize(cloned)
        const scale = targetSize / modelSize
        setCalculatedScale(scale)
      }
      return cloned
    } catch (error) {
      console.error('Failed to clone scene:', error)
      return null
    }
  }, [scene, targetSize])

  if (!clonedScene) return null

  useFrame((state, delta) => {
    const t = state.clock.getElapsedTime()
    
    // No hover effects - simple constant scale
    const targetScale = 1
    scaleRef.current = targetScale
    
    // Rotate about Z-axis: 0 to -30 degrees and back to 0, repeat
    // Using negative absolute value of sine wave to go from 0 to -30 degrees only
    // 30 degrees = π/6 radians
    // Rotation speed: slower and smoother
    if (groupRef.current) {
      const sinValue = Math.abs(Math.sin(t * 1.0))
      const rotation = -sinValue * (Math.PI / 6)
      groupRef.current.rotation.z = rotation
      
      // Detect when rotation returns to 0 (sinValue goes from > 0.1 to < 0.1)
      // Trigger callback once per cycle when returning to 0 (only if not stopped)
      if (!shouldStop && lastRotationRef.current < -0.01 && rotation > -0.01 && onRotationToZero && !hasTriggeredRef.current) {
        onRotationToZero()
        hasTriggeredRef.current = true
      } else if (rotation < -0.1) {
        // Reset trigger flag when rotation goes negative again
        hasTriggeredRef.current = false
      }
      
      // Stop rotation animation if hammer should be hidden
      // (This is handled by conditional rendering, but we can also stop animation here)
      lastRotationRef.current = rotation
    }
    
    if (ref.current) {
      // Apply the calculated scale to match other objects (with 0.8 reduction factor)
      ref.current.scale.setScalar(calculatedScale * scaleRef.current * 0.8)
    }
  })

  return (
    <group ref={groupRef}>
      <primitive ref={ref} object={clonedScene} {...props} />
    </group>
  )
}

// Orbiting models - rotate on 2 axes AND orbit around center
const OrbitingModel = ({ modelPath, orbitRadius, orbitSpeed, rotationSpeed, initialAngle, targetSize, isHovered = false, ...props }) => {
  const ref = useRef()
  const orbitRef = useRef()
  const scaleRef = useRef(1)
  const [calculatedScale, setCalculatedScale] = useState(1)
  
  // Construct absolute URL for the model to avoid parsing issues
  const modelUrl = useMemo(() => {
    const path = modelPath || '/3D/Hammer.glb'
    return path
  }, [modelPath])
  
  // Hooks must be called unconditionally at the top level
  // useGLTF will throw errors that should be caught by error boundaries
  // We check if the result is valid before using it
  const gltfData = useGLTF(modelUrl)
  
  const scene = gltfData?.scene
  
  const clonedScene = useMemo(() => {
    if (!scene) return null
    try {
      const cloned = scene.clone()
      // Calculate scale based on target size
      if (targetSize) {
        const modelSize = getModelSize(cloned)
        const scale = targetSize / modelSize
        setCalculatedScale(scale)
      }
      return cloned
    } catch (error) {
      console.error('Failed to clone scene:', error)
      return null
    }
  }, [scene, targetSize])

  useFrame((state, delta) => {
    const t = state.clock.getElapsedTime()
    
    // No hover effects - simple constant scale
    const targetScale = 1
    scaleRef.current = targetScale
    
    // No rotation speed multiplier - constant speed
    const rotationMultiplier = 1
    
    if (orbitRef.current && orbitRadius > 0) {
      // Orbital motion around the center - slower and smoother
      const angle = initialAngle + t * orbitSpeed
      orbitRef.current.position.x = Math.cos(angle) * orbitRadius
      orbitRef.current.position.z = Math.sin(angle) * orbitRadius
    }
    
    if (ref.current) {
      // Rotation on 2 axes - slower and consistent
      ref.current.rotation.y = t * rotationSpeed.y * rotationMultiplier
      ref.current.rotation.x = t * rotationSpeed.x * rotationMultiplier
      // Apply constant scale
      ref.current.scale.setScalar(calculatedScale * scaleRef.current)
    }
  })

  if (!clonedScene) return null

  return (
    <group ref={orbitRef}>
      <primitive ref={ref} object={clonedScene} {...props} />
    </group>
  )
}

const Scene = ({ isHovered = false, onHammerReturnToZero, showHammer = true }) => {
  const [targetSize, setTargetSize] = useState(null)
  const [isMounted, setIsMounted] = useState(false)
  
  // Ensure we're on the client side before loading models
  useEffect(() => {
    setIsMounted(true)
    
    // Preload models on mount (client side only)
    if (typeof window !== 'undefined') {
      try {
        useGLTF.preload('/3D/hand-pliers-1.snapshot.11.gltf.glb')
        useGLTF.preload('/3D/Hammer.glb')
        useGLTF.preload('/3D/scwer driver.glb')
      } catch (error) {
        // Silently fail preload - models will load on demand
      }
    }
  }, [])
  
  // Construct absolute URL for the model to avoid parsing issues
  const modelUrl = useMemo(() => '/3D/hand-pliers-1.snapshot.11.gltf.glb', [])
  
  // Hooks must be called unconditionally at the top level
  // useGLTF will throw errors that should be caught by error boundaries
  // We check if the result is valid before using it
  const centerScene = useGLTF(modelUrl)
  
  // Calculate the size of the center model (pliers) with its scale
  useEffect(() => {
    if (centerScene?.scene) {
      try {
        const box = new Box3().setFromObject(centerScene.scene)
        const size = new Vector3()
        box.getSize(size)
        const maxSize = Math.max(size.x, size.y, size.z)
        // Account for the scale of 4.5
        setTargetSize(maxSize * 4.5)
      } catch (error) {
        console.error('Failed to calculate model size:', error)
      }
    }
  }, [centerScene?.scene])

  // Don't render Canvas until mounted (client-side only)
  if (!isMounted) {
    return <div className="absolute inset-0 z-0" />
  }

  return (
    <div className="absolute inset-0 z-0">
      <Canvas 
        camera={{ position: [0, 0, 4], fov: 34 }}
        dpr={[1, 2]}
        performance={{ min: 0.5 }}
        style={{ cursor: 'pointer', pointerEvents: 'auto' }}
      >
        <Suspense fallback={null}>
          <ambientLight intensity={0.6} />
          <directionalLight position={[5, 5, 5]} intensity={1} />
          <Environment preset="city" />

        {/* Static hammer - positioned at top of triangle, moved right */}
        {showHammer && (
          <StaticHammer 
            position={[0.5, 0.5, 0]}
            rotation={[Math.PI / 2 + Math.PI, 0, 0]}
            targetSize={targetSize}
            isHovered={false}
            onRotationToZero={onHammerReturnToZero}
            shouldStop={!showHammer}
          />
        )}

        {/* Pliers - positioned at top vertex of smaller triangle, moved right, rotates around its own axis */}
        <CenterHammer 
          position={[0.5, 0.5, 0]}
          orbitRadius={0}
          orbitSpeed={0}
          initialAngle={0}
          isHovered={false}
          targetSize={targetSize}
        />

        {/* Hammer - positioned at bottom-left vertex of smaller triangle, moved right, rotates around its own axis */}
        <OrbitingModel
          modelPath="/3D/Hammer.glb"
          orbitRadius={0}
          orbitSpeed={0}
          rotationSpeed={{ y: 0.2, x: 0.15 }}
          initialAngle={0}
          targetSize={targetSize}
          position={[0.1, -0.2, 0]}
          isHovered={false}
        />

        {/* Screw Driver - positioned at bottom-right vertex of smaller triangle, moved right, rotates around its own axis */}
        <OrbitingModel
          modelPath="/3D/scwer driver.glb"
          orbitRadius={0}
          orbitSpeed={0}
          rotationSpeed={{ y: 0.18, x: 0.12 }}
          initialAngle={0}
          targetSize={targetSize}
          position={[0.9, -0.2, 0]}
          isHovered={false}
        />

          <OrbitControls enableZoom={false} autoRotate={false} />
        </Suspense>
      </Canvas>
    </div>
  )
}

export default Scene
