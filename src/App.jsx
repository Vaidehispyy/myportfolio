import { useEffect, useState } from 'react'
import { AnimatePresence, motion, useScroll, useSpring } from 'framer-motion'
import Navbar from './components/Navbar'
import Hero from './components/Hero'
import PetalMarquee from './components/PetalMarquee'
import Projects from './components/Projects'
import Skills from './components/Skills'
import Timeline from './components/Timeline'
import Contact from './components/Contact'
import Footer from './components/Footer'
import Chatbot from './components/Chatbot'
import Cursor from './components/Cursor'
import NeuralCanvas from './components/NeuralCanvas'

function Preloader() {
  const [done, setDone] = useState(false)
  const [hidden, setHidden] = useState(false)

  useEffect(() => {
    const t = setTimeout(() => setDone(true), 2200)
    const t2 = setTimeout(() => setHidden(true), 3000)
    return () => {
      clearTimeout(t)
      clearTimeout(t2)
    }
  }, [])

  if (hidden) return null

  return (
    <AnimatePresence>
      <motion.div
        animate={{ opacity: done ? 0 : 1, pointerEvents: done ? 'none' : 'auto' }}
        transition={{ duration: 0.8 }}
        className="fixed inset-0 z-[100] flex flex-col items-center justify-center bg-[#faf5ec]"
      >
        <div className="flex overflow-hidden">
          {'Vaidehi'.split('').map((ch, i) => (
            <motion.span
              key={i}
              initial={{ y: 90, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.1 + i * 0.07, duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
              className="font-display text-5xl font-bold sm:text-6xl"
            >
              <span className="text-gradient">{ch}</span>
            </motion.span>
          ))}
          <motion.span
            initial={{ y: 90, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.55, duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
            className="font-display text-5xl font-bold text-ink sm:text-6xl"
          >
            .
          </motion.span>
        </div>
        <motion.div
          initial={{ scaleX: 0 }}
          animate={{ scaleX: 1 }}
          transition={{ delay: 0.4, duration: 1.4, ease: [0.22, 1, 0.36, 1] }}
          className="mt-6 h-px w-40 origin-left rounded-full bg-gradient-to-r from-rose-400 via-pink-500 to-peach-400"
        />
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.8 }}
          className="mt-4 text-[10px] tracking-[0.5em] text-ink/40 uppercase"
        >
          AI / ML Engineer
        </motion.p>
      </motion.div>
    </AnimatePresence>
  )
}

function ScrollProgress() {
  const { scrollYProgress } = useScroll()
  const scaleX = useSpring(scrollYProgress, { stiffness: 120, damping: 24, restDelta: 0.001 })
  return (
    <motion.div
      style={{ scaleX }}
      className="fixed inset-x-0 top-0 z-[65] h-[3px] origin-left bg-gradient-to-r from-rose-400 via-pink-500 to-peach-400"
    />
  )
}

export default function App() {
  return (
    <div className="relative min-h-screen overflow-x-clip font-body">
      <Preloader />
      <Cursor />
      <ScrollProgress />
      <NeuralCanvas />

      <div className="relative z-10">
        <Navbar />
        <main>
          <Hero />
          <PetalMarquee />
          <Projects />
          <Skills />
          <Timeline />
          <Contact />
        </main>
        <Footer />
      </div>

      <Chatbot />
    </div>
  )
}
