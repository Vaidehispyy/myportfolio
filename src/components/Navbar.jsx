import { useEffect, useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { Menu, X } from 'lucide-react'
import { navLinks } from '../data/content'
import { useActiveSection } from '../hooks/useEffects'
import Magnetic from './Magnetic'

export default function Navbar() {
  const active = useActiveSection(navLinks.map((l) => l.id))
  const [scrolled, setScrolled] = useState(false)
  const [open, setOpen] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40)
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  const goTo = (id) => {
    setOpen(false)
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' })
  }

  return (
    <>
      <motion.header
        initial={{ y: -80, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.8, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
          scrolled ? 'py-3' : 'py-5'
        }`}
      >
        <div className="mx-auto flex max-w-7xl items-center justify-between px-5 md:px-8">
          <button onClick={() => goTo('home')} className="group flex items-center gap-3">
            <Magnetic strength={0.4}>
              <span className="grid h-11 w-11 place-items-center rounded-2xl bg-gradient-to-br from-rose-400 via-rose-500 to-peach-400 font-display text-lg font-bold text-white shadow-glow transition-transform duration-300 group-hover:rotate-6">
                V
              </span>
            </Magnetic>
            <span className="hidden font-display text-lg font-semibold tracking-tight text-ink sm:block">
              Vaidehi<span className="text-rose-500">.</span>
            </span>
          </button>

          <nav className="glass-strong hidden items-center gap-1 rounded-full p-1.5 lg:flex">
            {navLinks.map((link) => (
              <button
                key={link.id}
                onClick={() => goTo(link.id)}
                className={`relative rounded-full px-3.5 py-2 text-[13px] font-medium transition-colors duration-300 ${
                  active === link.id ? 'text-white' : 'text-ink/60 hover:text-ink'
                }`}
              >
                {active === link.id && (
                  <motion.span
                    layoutId="nav-pill"
                    className="absolute inset-0 rounded-full bg-gradient-to-r from-rose-400 to-pink-500 shadow-glow"
                    transition={{ type: 'spring', stiffness: 380, damping: 30 }}
                  />
                )}
                <span className="relative z-10">{link.label}</span>
              </button>
            ))}
          </nav>

          <button
            onClick={() => setOpen(true)}
            className="glass-strong grid h-11 w-11 place-items-center rounded-2xl text-ink lg:hidden"
            aria-label="Open menu"
          >
            <Menu size={20} />
          </button>
        </div>
      </motion.header>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 z-[70] flex flex-col bg-[#faf5ec]/92 backdrop-blur-2xl lg:hidden"
          >
            <div className="flex items-center justify-between px-6 py-6">
              <span className="font-display text-lg font-bold text-ink">Vaidehi.</span>
              <button
                onClick={() => setOpen(false)}
                className="glass grid h-11 w-11 place-items-center rounded-2xl text-ink"
                aria-label="Close menu"
              >
                <X size={20} />
              </button>
            </div>
            <nav className="flex flex-1 flex-col items-center justify-center gap-2">
              {navLinks.map((link, i) => (
                <motion.button
                  key={link.id}
                  initial={{ opacity: 0, x: 40 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: 40 }}
                  transition={{ delay: 0.05 * i, duration: 0.4 }}
                  onClick={() => goTo(link.id)}
                  className={`font-display text-2xl font-semibold transition-colors ${
                    active === link.id ? 'text-gradient' : 'text-ink/60 hover:text-ink'
                  }`}
                >
                  {link.label}
                </motion.button>
              ))}
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}
