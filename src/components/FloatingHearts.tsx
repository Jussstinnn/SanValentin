import { useMemo } from 'react'

type Heart = {
  id: string
  left: string
  top: string
  size: number
  duration: number
  delay: number
  opacity: number
  rotate: number
  emoji: string
}

export default function FloatingHearts({ count = 60 }: { count?: number }) {
  const hearts = useMemo<Heart[]>(() => {
    const arr: Heart[] = []
    const emojis = ['💗', '💖', '💘', '💞']
    for (let i = 0; i < count; i++) {
      arr.push({
        id: `${i}-${Math.random()}`,
        left: `${Math.floor(Math.random() * 100)}%`,
        // Start scattered across the viewport so the page feels "llena" desde el inicio.
        top: `${Math.floor(Math.random() * 100)}%`,
        size: 14 + Math.random() * 26,
        duration: 8 + Math.random() * 10,
        delay: Math.random() * 6,
        opacity: 0.25 + Math.random() * 0.45,
        rotate: Math.random() * 26 - 13,
        emoji: emojis[Math.floor(Math.random() * emojis.length)],
      })
    }
    return arr
  }, [count])

  return (
    // Fixed so it covers *toda* la página (aunque hagas scroll)
    <div aria-hidden className="pointer-events-none fixed inset-0 z-10 overflow-hidden">
      {hearts.map((h) => (
        <div
          key={h.id}
          className="absolute select-none"
          style={{ left: h.left, top: h.top }}
        >
          {/* rotation stays constant; animation only moves */}
          <div style={{ transform: `rotate(${h.rotate}deg)` }}>
            <div
              className="animate-[sv-float_var(--dur)_linear_infinite]"
              style={{
                ['--dur' as any]: `${h.duration}s`,
                animationDelay: `${h.delay}s`,
                opacity: h.opacity,
                fontSize: `${h.size}px`,
                filter: 'drop-shadow(0 8px 16px rgba(255,77,166,0.25))',
              }}
            >
              {h.emoji}
            </div>
          </div>
        </div>
      ))}
      <style>{`
        @keyframes sv-float {
          0% { transform: translateY(0) translateX(0); }
          25% { transform: translateY(-25vh) translateX(10px); }
          50% { transform: translateY(-55vh) translateX(-8px); }
          75% { transform: translateY(-80vh) translateX(14px); }
          100% { transform: translateY(-120vh) translateX(0); }
        }
        .animate-[sv-float_var(--dur)_linear_infinite] {
          animation-name: sv-float;
          animation-duration: var(--dur);
          animation-timing-function: linear;
          animation-iteration-count: infinite;
        }
      `}</style>
    </div>
  )
}
