import { motion } from 'framer-motion'

export function Flower({ size = 26, petal = '#f2b8c9', center = '#f6c06b', className = '' }) {
  return (
    <svg width={size} height={size} viewBox="0 0 32 32" className={className} aria-hidden>
      {[0, 72, 144, 216, 288].map((deg) => (
        <ellipse
          key={deg}
          cx="16"
          cy="7"
          rx="5.5"
          ry="7"
          fill={petal}
          transform={`rotate(${deg} 16 16)`}
        />
      ))}
      <circle cx="16" cy="16" r="4.5" fill={center} />
      <circle cx="16" cy="16" r="1.6" fill="#fdf3e0" />
    </svg>
  )
}

function Petal() {
  return (
    <svg width="14" height="14" viewBox="0 0 14 14" aria-hidden>
      <ellipse cx="7" cy="2.6" rx="3.4" ry="4.6" fill="#f6c6d4" transform="rotate(18 7 7)" />
    </svg>
  )
}

export function FloatingFlowers({ count = 5 }) {
  const spots = [
    { top: '16%', left: '6%', size: 30, delay: '0s', opacity: 0.5 },
    { top: '68%', left: '4%', size: 22, delay: '-3s', opacity: 0.4 },
    { top: '30%', left: '92%', size: 26, delay: '-5s', opacity: 0.45 },
    { top: '80%', left: '88%', size: 34, delay: '-8s', opacity: 0.5 },
    { top: '8%', left: '55%', size: 18, delay: '-10s', opacity: 0.35 }
  ]
  return (
    <div className="pointer-events-none absolute inset-0 overflow-hidden" aria-hidden>
      {spots.slice(0, count).map((s, i) => (
        <div
          key={i}
          className="absolute animate-float-x"
          style={{ top: s.top, left: s.left, opacity: s.opacity, animationDelay: s.delay }}
        >
          <Flower size={s.size} />
        </div>
      ))}
      <div className="absolute bottom-[12%] left-[12%] opacity-40 animate-float-x [animation-delay:-4s]">
        <Petal />
      </div>
      <div className="absolute top-[40%] right-[16%] opacity-35 animate-float-x [animation-delay:-7s]">
        <Petal />
      </div>
    </div>
  )
}

export function RetroComputer({ className = '' }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30, rotate: 3 }}
      animate={{ opacity: 1, y: 0, rotate: 0 }}
      transition={{ delay: 1, duration: 1, ease: [0.22, 1, 0.36, 1] }}
      className={`relative ${className}`}
    >
      <motion.div
        animate={{ y: [0, -10, 0] }}
        transition={{ duration: 5, repeat: Infinity, ease: 'easeInOut' }}
        className="relative"
      >
        <div className="relative w-80 rounded-[26px] border border-[#d4c2a5] bg-gradient-to-b from-[#f4ead8] to-[#e6d6be] p-3 shadow-card">
          <div className="relative overflow-hidden rounded-2xl border-4 border-[#cdb891] bg-[#2b1a26] p-3 scanlines crt-glow">
            <div className="pointer-events-none absolute inset-0 rounded-xl bg-[radial-gradient(circle_at_50%_35%,rgba(229,150,174,0.22),transparent_70%)]" />
            <div className="relative flex h-44 flex-col items-center justify-center gap-2 text-center">
              <Flower size={44} className="animate-float" />
              <div className="font-mono text-[11px] tracking-wide text-[#f6c6d4]">
                <span>hello, world! ^_^</span>
              </div>
              <div className="font-mono text-[10px] text-[#f3b48a]/90">vaidehi — ai/ml engineer</div>
              <div className="mt-1 flex items-center gap-2 font-mono text-[9px] text-[#e596ae]/70">
                <span className="flex gap-1">
                  {['f','l','o','w','e','r','.','p','n','g'].map((c, i) => (
                    <motion.span
                      key={i}
                      animate={{ opacity: [1, 0.15, 1] }}
                      transition={{ duration: 1.4, repeat: Infinity, delay: i * 0.09 }}
                    >
                      {c}
                    </motion.span>
                  ))}
                </span>
                <span className="text-[#f6c6d4]">loading…</span>
              </div>
              <span className="inline-block h-3 w-1.5 animate-caret bg-[#f6c6d4]" />
            </div>
          </div>
          <div className="absolute -right-2 -top-2 rotate-12">
            <Flower size={26} />
          </div>
          <div className="mx-auto -mb-2 mt-1 h-9 w-24 rounded-b-xl bg-gradient-to-b from-[#d4c2a5] to-[#c2ad8a]" />
        </div>
        <div className="mx-auto h-4 w-36 rounded-b-xl bg-gradient-to-b from-[#c2ad8a] to-[#b09a76] shadow-[0_6px_16px_rgba(120,84,70,0.3)]" />
        <div className="mx-auto mt-1.5 w-72 rounded-xl border border-[#cbb795] bg-gradient-to-b from-[#efe3cd] to-[#dfcbaa] p-2 shadow-card">
          <div className="grid grid-cols-12 gap-1">
            {Array.from({ length: 60 }).map((_, i) => (
              <div
                key={i}
                className="h-2.5 rounded-[3px] border border-[#d8c5a2] bg-gradient-to-b from-[#f7efe0] to-[#e5d5b8]"
              />
            ))}
          </div>
          <div className="mx-auto mt-1.5 h-4 w-1/3 rounded-md bg-gradient-to-b from-[#f0e2c8] to-[#dcc9a6] border border-[#d0bc97]" />
        </div>
        <motion.div
          className="absolute -bottom-8 -left-8"
          animate={{ y: [0, -6, 0], rotate: [0, 8, 0] }}
          transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
        >
          <Flower size={34} petal="#f3b48a" />
        </motion.div>
        <motion.div
          className="absolute -right-10 bottom-6"
          animate={{ y: [0, 7, 0], rotate: [0, -8, 0] }}
          transition={{ duration: 5, repeat: Infinity, ease: 'easeInOut', delay: 1 }}
        >
          <Flower size={28} center="#e596ae" />
        </motion.div>
      </motion.div>
    </motion.div>
  )
}
