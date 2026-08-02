import { useEffect, useState } from 'react'
import { motion, useMotionValue, useSpring } from 'framer-motion'
import { Flower } from './Flowers'

export default function Cursor() {
  const [active, setActive] = useState(false)
  const dotX = useMotionValue(-100)
  const dotY = useMotionValue(-100)
  const ringX = useMotionValue(-100)
  const ringY = useMotionValue(-100)
  const glowX = useMotionValue(-100)
  const glowY = useMotionValue(-100)

  const sDotX = useSpring(dotX, { stiffness: 1200, damping: 50 })
  const sDotY = useSpring(dotY, { stiffness: 1200, damping: 50 })
  const sRingX = useSpring(ringX, { stiffness: 300, damping: 28, mass: 0.6 })
  const sRingY = useSpring(ringY, { stiffness: 300, damping: 28, mass: 0.6 })
  const sGlowX = useSpring(glowX, { stiffness: 90, damping: 24, mass: 1 })
  const sGlowY = useSpring(glowY, { stiffness: 90, damping: 24, mass: 1 })

  const scale = useMotionValue(1)
  const sScale = useSpring(scale, { stiffness: 300, damping: 20 })

  useEffect(() => {
    const move = (e) => {
      dotX.set(e.clientX)
      dotY.set(e.clientY)
      ringX.set(e.clientX)
      ringY.set(e.clientY)
      glowX.set(e.clientX)
      glowY.set(e.clientY)
    }

    const over = (e) => {
      if (e.target.closest('a, button, [data-cursor]')) {
        setActive(true)
        scale.set(2.4)
      } else {
        setActive(false)
        scale.set(1)
      }
    }

    const down = () => scale.set(0.7)
    const up = () => scale.set(1)

    window.addEventListener('mousemove', move)
    window.addEventListener('mouseover', over)
    window.addEventListener('mousedown', down)
    window.addEventListener('mouseup', up)
    return () => {
      window.removeEventListener('mousemove', move)
      window.removeEventListener('mouseover', over)
      window.removeEventListener('mousedown', down)
      window.removeEventListener('mouseup', up)
    }
  }, [dotX, dotY, ringX, ringY, glowX, glowY, scale])

  return (
    <div className="pointer-events-none fixed inset-0 z-[9999] hidden md:block" aria-hidden>
      <motion.div
        className="absolute h-[300px] w-[300px] rounded-full mix-blend-multiply"
        style={{
          x: sGlowX,
          y: sGlowY,
          translateX: '-50%',
          translateY: '-50%',
          background:
            'radial-gradient(circle, rgba(229,150,174,0.16), rgba(243,180,138,0.08) 40%, transparent 70%)'
        }}
      />
      <motion.div
        className="absolute grid h-10 w-10 place-items-center rounded-full border border-rose-400/60 bg-rose-200/20 backdrop-blur-[2px]"
        style={{
          x: sRingX,
          y: sRingY,
          translateX: '-50%',
          translateY: '-50%',
          scale: sScale
        }}
      >
        <motion.span
          animate={{ scale: active ? 1 : 0, rotate: active ? 0 : -60 }}
          transition={{ type: 'spring', stiffness: 320, damping: 20 }}
        >
          <Flower size={15} />
        </motion.span>
      </motion.div>
      <motion.div
        className="absolute h-1.5 w-1.5 rounded-full bg-gradient-to-r from-rose-400 to-peach-400"
        style={{
          x: sDotX,
          y: sDotY,
          translateX: '-50%',
          translateY: '-50%',
          boxShadow: '0 0 12px rgba(229,150,174,0.9)'
        }}
      />
    </div>
  )
}
