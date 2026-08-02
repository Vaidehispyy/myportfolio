import { useMemo, useRef } from 'react'
import { Canvas, useFrame } from '@react-three/fiber'
import { Sparkles } from '@react-three/drei'
import * as THREE from 'three'

const COUNT = 150
const LINK_DIST = 1.6
const MAX_LINKS = 640

function useNeuralData() {
  return useMemo(() => {
    const positions = new Float32Array(COUNT * 3)
    const scales = new Float32Array(COUNT)
    const colors = new Float32Array(COUNT * 3)
    const palette = [
      new THREE.Color('#e596ae'),
      new THREE.Color('#d4788f'),
      new THREE.Color('#f3b48a'),
      new THREE.Color('#f6c6d4')
    ]
    for (let i = 0; i < COUNT; i++) {
      const r = 4.4 * Math.pow(Math.random(), 0.38)
      const theta = Math.random() * Math.PI * 2
      const phi = Math.acos(2 * Math.random() - 1)
      positions[i * 3] = r * Math.sin(phi) * Math.cos(theta)
      positions[i * 3 + 1] = r * Math.sin(phi) * Math.sin(theta)
      positions[i * 3 + 2] = r * Math.cos(phi)
      scales[i] = 1.2 + Math.random() * 2.2
      const c = palette[Math.floor(Math.random() * palette.length)]
      colors[i * 3] = c.r
      colors[i * 3 + 1] = c.g
      colors[i * 3 + 2] = c.b
    }
    const linePositions = new Float32Array(MAX_LINKS * 6)
    const lineOpacity = new Float32Array(MAX_LINKS * 2)
    return { positions, scales, colors, linePositions, lineOpacity }
  }, [])
}

function NeuralNet() {
  const group = useRef(null)
  const points = useRef(null)
  const lines = useRef(null)
  const data = useNeuralData()

  useFrame((state, delta) => {
    const t = state.clock.elapsedTime
    const g = group.current

    g.rotation.y += delta * 0.05
    g.rotation.x = Math.sin(t * 0.12) * 0.12 + state.pointer.y * 0.3
    g.rotation.z = state.pointer.x * 0.18

    const attr = points.current.geometry.attributes.position
    for (let i = 0; i < COUNT; i++) {
      const base = i * 3
      const breathe = 1 + Math.sin(t * 1.2 + i * 0.7) * 0.035
      attr.setXYZ(i, data.positions[base] * breathe, data.positions[base + 1] * breathe, data.positions[base + 2] * breathe)
    }
    attr.needsUpdate = true

    const p1 = attr.array
    const lp = data.linePositions
    const lo = data.lineOpacity
    let idx = 0
    for (let i = 0; i < COUNT && idx < MAX_LINKS; i++) {
      for (let j = i + 1; j < COUNT; j++) {
        const a = i * 3
        const b = j * 3
        const dx = p1[a] - p1[b]
        const dy = p1[a + 1] - p1[b + 1]
        const dz = p1[a + 2] - p1[b + 2]
        const d = Math.sqrt(dx * dx + dy * dy + dz * dz)
        if (d < LINK_DIST) {
          const li = idx * 6
          lp[li] = p1[a]
          lp[li + 1] = p1[a + 1]
          lp[li + 2] = p1[a + 2]
          lp[li + 3] = p1[b]
          lp[li + 4] = p1[b + 1]
          lp[li + 5] = p1[b + 2]
          const alpha = (1 - d / LINK_DIST) * 0.4
          lo[idx * 2] = alpha
          lo[idx * 2 + 1] = alpha
          idx++
        }
      }
    }

    const lineGeo = lines.current.geometry
    lineGeo.attributes.position.needsUpdate = true
    lineGeo.attributes.aOpacity.needsUpdate = true
    lineGeo.setDrawRange(0, idx * 2)
  })

  return (
    <group ref={group}>
      <points ref={points}>
        <bufferGeometry>
          <bufferAttribute attach="attributes-position" args={[data.positions, 3]} />
          <bufferAttribute attach="attributes-aScale" args={[data.scales, 1]} />
          <bufferAttribute attach="attributes-color" args={[data.colors, 3]} />
        </bufferGeometry>
        <shaderMaterial
          vertexShader={`
            attribute float aScale;
            attribute vec3 color;
            varying vec3 vColor;
            void main() {
              vColor = color;
              vec4 mv = modelViewMatrix * vec4(position, 1.0);
              gl_PointSize = aScale * (90.0 / -mv.z);
              gl_Position = projectionMatrix * mv;
            }
          `}
          fragmentShader={`
            varying vec3 vColor;
            void main() {
              float d = distance(gl_PointCoord, vec2(0.5));
              float alpha = smoothstep(0.5, 0.05, d);
              gl_FragColor = vec4(vColor, alpha * 0.8);
            }
          `}
          transparent
          depthWrite={false}
          blending={THREE.NormalBlending}
        />
      </points>
      <lineSegments ref={lines}>
        <bufferGeometry>
          <bufferAttribute attach="attributes-position" args={[data.linePositions, 3]} />
          <bufferAttribute attach="attributes-aOpacity" args={[data.lineOpacity, 1]} />
        </bufferGeometry>
        <shaderMaterial
          vertexShader={`
            attribute float aOpacity;
            varying float vOpacity;
            void main() {
              vOpacity = aOpacity;
              gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
            }
          `}
          fragmentShader={`
            varying float vOpacity;
            void main() {
              gl_FragColor = vec4(0.9, 0.6, 0.7, vOpacity);
            }
          `}
          transparent
          depthWrite={false}
          blending={THREE.NormalBlending}
        />
      </lineSegments>
    </group>
  )
}

function Particles() {
  const ref = useRef(null)
  useFrame((state, delta) => {
    ref.current.rotation.y += delta * 0.02
    ref.current.position.y = Math.sin(state.clock.elapsedTime * 0.15) * 0.3
  })
  return (
    <group ref={ref}>
      <Sparkles count={90} scale={[16, 10, 10]} size={2.4} speed={0.35} color="#e596ae" opacity={0.55} />
      <Sparkles count={60} scale={[14, 9, 8]} size={3.2} speed={0.22} color="#f3b48a" opacity={0.45} />
    </group>
  )
}

export default function NeuralCanvas() {
  return (
    <div className="pointer-events-none fixed inset-0 z-0" aria-hidden>
      <Canvas
        camera={{ position: [0, 0, 9], fov: 60 }}
        dpr={[1, 1.6]}
        gl={{ antialias: true, alpha: true, powerPreference: 'high-performance' }}
      >
        <ambientLight intensity={0.4} />
        <NeuralNet />
        <Particles />
      </Canvas>
    </div>
  )
}
