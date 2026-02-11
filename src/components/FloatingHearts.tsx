import { useMemo } from 'react'

type Props = {
  /**
   * Legacy prop (kept for backwards compatibility).
   * If provided, it will be used as the desktop count.
   */
  count?: number
  /**
   * Hearts count for desktop/tablet screens.
   * (Higher count = more "full" screen, but heavier on mobile.)
   */
  countDesktop?: number
  /**
   * Hearts count for small/mobile screens (iOS especially).
   */
  countMobile?: number
}

/**
 * Floating hearts overlay.
 * Optimized for iOS/mobile: fewer nodes + cheaper effects.
 */
export default function FloatingHearts({ count, countDesktop = 180, countMobile = 70 }: Props) {
  const isBrowser = typeof window !== 'undefined'
  const isSmall =
    isBrowser && typeof window.matchMedia === 'function'
      ? window.matchMedia('(max-width: 640px)').matches
      : false

  const prefersReduced =
    isBrowser && typeof window.matchMedia === 'function'
      ? window.matchMedia('(prefers-reduced-motion: reduce)').matches
      : false

  const isIOS =
    typeof navigator !== 'undefined'
      ? /iPad|iPhone|iPod/.test(navigator.userAgent)
      : false

  // iOS + heavy blur/drop-shadows can make the page feel laggy.
  const lowPower = prefersReduced || isIOS
  const enableFancyFx = !lowPower && !isSmall

  const desktopCount = count ?? countDesktop
  const effectiveCount = isSmall ? countMobile : desktopCount

  const hearts = useMemo(() => {
    const colors = ['#ff4da6', '#ff80c0', '#7c5cff', '#ff3d7f']
    const emojis = ['💗', '💖', '💞', '💘', '💝']

    return Array.from({ length: effectiveCount }).map((_, i) => {
      const left = `${-5 + Math.random() * 110}%`
      // Start above the viewport so hearts naturally drift through the whole screen.
      const top = `${-(20 + Math.random() * 40)}%`
      const delay = `${Math.random() * 6}s`
      const duration = `${6 + Math.random() * 8}s`
      const size = 12 + Math.random() * 20

      return {
        id: i,
        left,
        top,
        delay,
        duration,
        size,
        color: colors[i % colors.length],
        emoji: emojis[i % emojis.length],
        drift: -30 + Math.random() * 60, // vw
        rotate: -25 + Math.random() * 50, // deg
      }
    })
  }, [effectiveCount])

  return (
    <div className="pointer-events-none fixed inset-0 z-10 overflow-hidden">
      {hearts.map((h) => (
        <div
          key={h.id}
          className="absolute will-change-transform"
          style={{
            left: h.left,
            top: h.top,
            animation: `floatDown ${h.duration} linear ${h.delay} infinite`,
            transform: 'translateZ(0)',
          }}
        >
          <div
            style={{
              // CSS variables used by keyframes (cheaper than generating per-heart keyframes)
              ['--drift' as any]: `${h.drift}vw`,
              ['--rot' as any]: `${h.rotate}deg`,

              fontSize: h.size,
              color: h.color,

              // Drop-shadow is expensive on mobile Safari.
              filter: enableFancyFx ? 'drop-shadow(0 10px 18px rgba(255, 77, 166, 0.25))' : 'none',
              textShadow: !enableFancyFx ? '0 8px 14px rgba(0,0,0,0.08)' : 'none',

              opacity: 0.7,
              animation: `drift 4s ease-in-out ${h.delay} infinite`,
              transform: 'translateZ(0)',
            }}
          >
            {h.emoji}
          </div>
        </div>
      ))}

      <style>
        {`
        @keyframes floatDown {
          0%   { transform: translate3d(0, 0, 0) rotate(0deg); opacity: 0; }
          10%  { opacity: 0.7; }
          100% { transform: translate3d(0, 160vh, 0) rotate(30deg); opacity: 0; }
        }
        @keyframes drift {
          0%   { transform: translate3d(0, 0, 0) rotate(0deg); }
          50%  { transform: translate3d(var(--drift), -8vh, 0) rotate(var(--rot)); }
          100% { transform: translate3d(0, -16vh, 0) rotate(0deg); }
        }
        `}
      </style>
    </div>
  )
}
