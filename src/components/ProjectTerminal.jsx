import { useEffect, useMemo, useRef, useState } from 'react'
import { motion } from 'framer-motion'
import { BarChart3, Bus, ChefHat, Monitor, Timer } from 'lucide-react'
import { Flower } from './Flowers'

const iconMap = { timer: Timer, bus: Bus, cookbook: ChefHat, attendance: BarChart3, browser: Monitor }

const ledColors = {
  timer: '#f9a8c4',
  bus: '#c4b5fd',
  cookbook: '#fcd34d',
  attendance: '#99f6e4',
  browser: '#fdba74'
}

function useTypedLines(lines, active, speed = 22, gap = 260) {
  const [state, setState] = useState({ line: 0, chars: 0 })
  const ref = useRef({ line: 0, chars: 0 })

  useEffect(() => {
    if (!active) return
    ref.current = { line: 0, chars: 0 }
    setState({ line: 0, chars: 0 })
    let timer
    const tick = () => {
      const { line, chars } = ref.current
      if (line >= lines.length) return
      const current = lines[line]
      if (chars < current.length) {
        ref.current = { line, chars: chars + 1 }
        setState(ref.current)
        timer = setTimeout(tick, speed)
      } else {
        ref.current = { line: line + 1, chars: 0 }
        setState(ref.current)
        timer = setTimeout(tick, line + 1 >= lines.length ? gap : gap * 0.7)
      }
    }
    timer = setTimeout(tick, 380)
    return () => clearTimeout(timer)
  }, [active, lines, speed, gap])

  return state
}

export default function ProjectTerminal({ project }) {
  const [hovered, setHovered] = useState(false)
  const Icon = iconMap[project.mockup] ?? Monitor

  const lines = useMemo(
    () => [
      `$ ./boot ${project.id}`,
      `> ${project.category}`,
      `> ${project.tagline}`,
      `> ${project.tech.join('  ')}`,
      `> ${project.features.length} features loaded`,
      `> status: ready`
    ],
    [project.id, project.category, project.tagline, project.tech, project.features.length]
  )

  const typed = useTypedLines(lines, hovered)
  const done = typed.line >= lines.length
  const caretLine = Math.min(typed.line, lines.length - 1)

  return (
    <div
      className="relative h-56 overflow-hidden rounded-t-[30px] bg-gradient-to-b from-[#f4ead8] to-[#e6d6be] p-3 sm:h-60"
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      <div className="relative h-full w-full overflow-hidden rounded-[20px] border-4 border-[#cdb891] bg-[#2b1a26] scanlines crt-glow">
        <div className="pointer-events-none absolute inset-0 z-10 rounded-[16px] bg-[radial-gradient(circle_at_50%_30%,rgba(229,150,174,0.14),transparent_70%)]" />
        <div className="relative flex h-full flex-col justify-center px-5 font-mono text-[10px] leading-relaxed sm:text-[11px]">
          {!hovered ? (
            <div className="flex flex-col items-center gap-2 text-center">
              <motion.div
                animate={{ y: [0, -5, 0] }}
                transition={{ duration: 2.4, repeat: Infinity, ease: 'easeInOut' }}
                className="grid h-16 w-16 place-items-center rounded-2xl bg-gradient-to-br from-rose-400 to-pink-500 text-white shadow-glow"
              >
                <Icon size={30} />
              </motion.div>
              <span className="font-mono text-[11px] text-[#f6c6d4]">{project.title}</span>
              <span className="text-[9px] tracking-widest text-[#f6c6d4]/50 uppercase">
                ~ hover to boot ~
              </span>
            </div>
          ) : (
            <div className="space-y-0.5">
              {lines.map((line, i) => {
                if (i > typed.line) return null
                const text = i < typed.line ? line : line.slice(0, typed.chars)
                const isCaretLine = i === caretLine
                return (
                  <div
                    key={i}
                    className={
                      i === 0 ? 'text-rose-300' : i === 3 ? 'text-peach-200' : 'text-[#f6c6d4]'
                    }
                  >
                    {text}
                    {isCaretLine && <span className="animate-caret text-rose-300">▌</span>}
                  </div>
                )
              })}
              {done && <span className="animate-caret text-rose-300">▌</span>}
            </div>
          )}
        </div>
      </div>
      <div className="absolute right-3 top-2 z-20 -rotate-6">
        <Flower size={20} />
      </div>
      <div className="absolute bottom-3 left-4 z-20 flex items-center gap-1.5">
        <span className="h-1.5 w-1.5 rounded-full animate-pulse-glow" style={{ background: ledColors[project.mockup] }} />
        <span className="font-mono text-[8px] tracking-widest text-[#a08a68] uppercase">crt-1998</span>
      </div>
    </div>
  )
}
