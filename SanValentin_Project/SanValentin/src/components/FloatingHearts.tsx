import { useMemo } from 'react'

type Heart = {
  id: string
  left: string
  size: number
  duration: number
  delay: number
  opacity: number
}

export default function FloatingHearts({ count = 18 }: { count?: number }) {
  const hearts = useMemo<Heart[]>(() => {
    const arr: Heart[] = []
    for (let i = 0; i < count; i++) {
      arr.push({
        id: `${i}-${Math.random()}`,
        left: `${Math.floor(Math.random() * 100)}%`,
        size: 14 + Math.random() * 26,
        duration: 8 + Math.random() * 10,
        delay: Math.random() * 6,
        opacity: 0.25 + Math.random() * 0.45,
      })
    }
    return arr
  }, [count])

  return (
    <div aria-hidden className="pointer-events-none absolute inset-0 overflow-hidden">
      {hearts.map((h) => (
        <div
          key={h.id}
          className="absolute -bottom-10 select-none"
          style={{ left: h.left }}
        >
          <div
            className="animate-[sv-float_var(--dur)_linear_infinite]"
            style={{
              ['--dur' as any]: `${h.duration}s`,
              animationDelay: `${h.delay}s`,
              opacity: h.opacity,
              fontSize: `${h.size}px`,
              transform: `translateY(0px) rotate(${Math.random() * 20 - 10}deg)`,
              filter: 'drop-shadow(0 8px 16px rgba(255,77,166,0.25))',
            }}
          >
            💗
          </div>
        </div>
      ))}
      <style>{`
        @keyframes sv-float {
          0% { transform: translateY(0) translateX(0) rotate(-6deg); }
          25% { transform: translateY(-25vh) translateX(10px) rotate(6deg); }
          50% { transform: translateY(-55vh) translateX(-8px) rotate(-4deg); }
          75% { transform: translateY(-80vh) translateX(14px) rotate(8deg); }
          100% { transform: translateY(-120vh) translateX(0) rotate(-6deg); }
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
