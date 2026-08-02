import { useRef } from 'react'
import { motion, useMotionValue, useSpring, useMotionTemplate } from 'framer-motion'

export default function TiltCard({ children, max = 9, className = '', glare = true }) {
  const ref = useRef(null)
  const rotateX = useMotionValue(0)
  const rotateY = useMotionValue(0)
  const glowX = useMotionValue(50)
  const glowY = useMotionValue(50)

  const sRotateX = useSpring(rotateX, { stiffness: 180, damping: 18 })
  const sRotateY = useSpring(rotateY, { stiffness: 180, damping: 18 })
  const sGlowX = useSpring(glowX, { stiffness: 120, damping: 20 })
  const sGlowY = useSpring(glowY, { stiffness: 120, damping: 20 })

  const glareBackground = useMotionTemplate`radial-gradient(circle at ${sGlowX}% ${sGlowY}%, rgba(255,255,255,0.35), transparent 55%)`

  const onMouseMove = (e) => {
    const rect = ref.current.getBoundingClientRect()
    const px = (e.clientX - rect.left) / rect.width
    const py = (e.clientY - rect.top) / rect.height
    rotateX.set((0.5 - py) * max)
    rotateY.set((px - 0.5) * max)
    glowX.set(px * 100)
    glowY.set(py * 100)
  }

  const onMouseLeave = () => {
    rotateX.set(0)
    rotateY.set(0)
  }

  return (
    <motion.div
      ref={ref}
      onMouseMove={onMouseMove}
      onMouseLeave={onMouseLeave}
      whileHover={{ y: -8 }}
      transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
      style={{ rotateX: sRotateX, rotateY: sRotateY, transformStyle: 'preserve-3d' }}
      className={`perspective-1200 ${className}`}
    >
      {children}
      {glare && (
        <motion.div
          aria-hidden
          className="pointer-events-none absolute inset-0 rounded-[inherit] z-20"
          style={{ background: glareBackground }}
        />
      )}
    </motion.div>
  )
}
