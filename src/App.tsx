import { useEffect, useMemo, useRef, useState, type CSSProperties } from 'react'
import { motion } from 'framer-motion'
import confetti from 'canvas-confetti'
import { Heart, Sparkles, Download } from 'lucide-react'

import { loadConfig, saveConfig } from './lib/storage'
import type { AppConfig } from './types'
import FloatingHearts from './components/FloatingHearts'
import Toast from './components/Toast'
import Modal from './components/Modal'
import ReasonCards from './components/ReasonCards'
import Timeline from './components/Timeline'
import PolaroidGallery from './components/PolaroidGallery'
import Typewriter from './components/Typewriter'
import CustomizerDrawer from './components/CustomizerDrawer'

function clamp(n: number, min: number, max: number) {
  return Math.max(min, Math.min(max, n))
}

function runConfetti(primary: string, secondary: string) {
  const end = Date.now() + 900
  const colors = [primary, secondary, '#ffffff']
  ;(function frame() {
    confetti({
      particleCount: 3,
      angle: 60,
      spread: 65,
      origin: { x: 0 },
      colors,
    })
    confetti({
      particleCount: 3,
      angle: 120,
      spread: 65,
      origin: { x: 1 },
      colors,
    })
    if (Date.now() < end) requestAnimationFrame(frame)
  })()
}

function downloadMemoryCard(cfg: AppConfig) {
  const canvas = document.createElement('canvas')
  canvas.width = 1200
  canvas.height = 630
  const ctx = canvas.getContext('2d')
  if (!ctx) return

  // bg gradient
  const g = ctx.createLinearGradient(0, 0, canvas.width, canvas.height)
  g.addColorStop(0, cfg.theme.cream)
  g.addColorStop(0.5, cfg.theme.secondary + '22')
  g.addColorStop(1, cfg.theme.primary + '22')
  ctx.fillStyle = g
  ctx.fillRect(0, 0, canvas.width, canvas.height)

  // cute bubbles
  for (let i = 0; i < 18; i++) {
    ctx.beginPath()
    const r = 14 + Math.random() * 70
    const x = Math.random() * canvas.width
    const y = Math.random() * canvas.height
    ctx.fillStyle = i % 2 === 0 ? cfg.theme.primary + '18' : cfg.theme.secondary + '14'
    ctx.arc(x, y, r, 0, Math.PI * 2)
    ctx.fill()
  }

  // card
  const pad = 70
  const radius = 36
  const x = pad
  const y = pad
  const w = canvas.width - pad * 2
  const h = canvas.height - pad * 2

  ctx.fillStyle = '#ffffffcc'
  ctx.strokeStyle = '#00000014'
  ctx.lineWidth = 2

  // rounded rect
  const rr = (x0: number, y0: number, w0: number, h0: number, r0: number) => {
    ctx.beginPath()
    ctx.moveTo(x0 + r0, y0)
    ctx.arcTo(x0 + w0, y0, x0 + w0, y0 + h0, r0)
    ctx.arcTo(x0 + w0, y0 + h0, x0, y0 + h0, r0)
    ctx.arcTo(x0, y0 + h0, x0, y0, r0)
    ctx.arcTo(x0, y0, x0 + w0, y0, r0)
    ctx.closePath()
  }
  rr(x, y, w, h, radius)
  ctx.fill()
  rr(x, y, w, h, radius)
  ctx.stroke()

  // text
  ctx.fillStyle = cfg.theme.text
  ctx.font = '800 52px Nunito, system-ui, sans-serif'
  ctx.fillText('San Valentín 💘', x + 50, y + 110)

  ctx.font = '700 34px Nunito, system-ui, sans-serif'
  ctx.fillStyle = cfg.theme.primary
  ctx.fillText(`${cfg.yourName} + ${cfg.girlfriendName}`, x + 50, y + 165)

  ctx.fillStyle = cfg.theme.text
  ctx.font = '600 28px Nunito, system-ui, sans-serif'
  const line = 'Gracias por este capítulo juntos. Y por todos los que vienen. ✨'
  ctx.fillText(line, x + 50, y + 230)

  ctx.font = '700 28px Nunito, system-ui, sans-serif'
  ctx.fillStyle = cfg.theme.secondary
  ctx.fillText('— Guardado desde tu página 💗', x + 50, y + h - 70)

  // hearts
  ctx.font = '56px system-ui'
  ctx.fillStyle = cfg.theme.primary
  ctx.fillText('💗', x + w - 120, y + 120)
  ctx.fillText('✨', x + w - 160, y + 180)

  const url = canvas.toDataURL('image/png')
  const a = document.createElement('a')
  a.href = url
  a.download = `SanValentin_${cfg.yourName}_${cfg.girlfriendName}.png`
  a.click()
}

export default function App() {
  const [config, setConfig] = useState<AppConfig>(() => loadConfig())

  // persist changes
  useEffect(() => {
    saveConfig(config)
  }, [config])

  const themeStyle = useMemo(
    () =>
      ({
        '--primary': config.theme.primary,
        '--secondary': config.theme.secondary,
        '--cream': config.theme.cream,
        '--text': config.theme.text,
        '--card': config.theme.card,
      }) as CSSProperties,
    [config.theme],
  )

  // toast for playful button
  const [toast, setToast] = useState({ show: false, message: '' })
  const toastTimer = useRef<number | null>(null)

  const showToast = (message: string) => {
    if (toastTimer.current) window.clearTimeout(toastTimer.current)
    setToast({ show: true, message })
    toastTimer.current = window.setTimeout(() => setToast((t) => ({ ...t, show: false })), 1400)
  }

  // think button antics
  const areaRef = useRef<HTMLDivElement | null>(null)
  const [thinkPos, setThinkPos] = useState<{ x: number; y: number } | null>(null)
  const [tries, setTries] = useState(0)

  const thinkIsTame = tries >= 6

  const moveThink = () => {
    if (!areaRef.current) return
    if (thinkIsTame) return

    const area = areaRef.current.getBoundingClientRect()
    const pad = 18

    // button size guess (works well enough)
    const btnW = 210
    const btnH = 52

    const x = pad + Math.random() * (area.width - btnW - pad * 2)
    const y = pad + Math.random() * (area.height - btnH - pad * 2)

    setThinkPos({ x: clamp(x, pad, area.width - btnW - pad), y: clamp(y, pad, area.height - btnH - pad) })

    setTries((t) => t + 1)
    const msg = config.playfulMessages.length
      ? config.playfulMessages[Math.floor(Math.random() * config.playfulMessages.length)]
      : '¿En serio? 😳'
    showToast(msg)
  }

  // yes modal
  const [openYes, setOpenYes] = useState(false)

  const onYes = () => {
    setOpenYes(true)
    if (config.toggles.confetti) runConfetti(config.theme.primary, config.theme.secondary)
  }

  return (
    <div
      className="min-h-screen"
      style={themeStyle}
    >
      <Toast show={toast.show} message={toast.message} />

      <div
        className="relative min-h-screen overflow-hidden"
        style={{
          background:
            'radial-gradient(1200px 700px at 20% 0%, rgba(255,77,166,0.25), transparent 60%), radial-gradient(900px 600px at 80% 20%, rgba(124,92,255,0.22), transparent 65%), linear-gradient(180deg, var(--cream), #ffffff 70%)',
          color: 'var(--text)',
        }}
      >
        <div className="noise pointer-events-none absolute inset-0 opacity-60" />
      {config.toggles.floatingHearts && <FloatingHearts countDesktop={160} countMobile={55} />}

        <header className="sticky top-0 z-30 border-b border-black/5 bg-white/55 backdrop-blur-0 sm:backdrop-blur">
          <div className="mx-auto flex max-w-6xl items-center justify-between px-5 py-3">
            <div className="flex items-center gap-3">
              <div
                className="flex h-10 w-10 items-center justify-center rounded-2xl shadow-soft ring-1 ring-black/5"
                style={{ background: 'linear-gradient(135deg, var(--primary), var(--secondary))' }}
              >
                <Heart className="h-5 w-5 text-white" />
              </div>
              <div className="leading-tight">
                <div className="font-display text-base font-extrabold">{config.yourName} &amp; {config.girlfriendName}</div>
                <div className="text-xs text-black/60">San Valentín</div>
              </div>
            </div>
            <div className="hidden items-center gap-2 sm:flex">
              <span className="rounded-full bg-black/5 px-3 py-1 text-xs font-extrabold">Cute mode 💗</span>
            </div>
          </div>
        </header>

        <main className="mx-auto max-w-6xl px-5 pb-16 pt-10">
          {/* HERO */}
          <section className="relative overflow-hidden rounded-[40px] bg-white/70 p-8 shadow-soft ring-1 ring-black/5 sm:p-12">
            <div className="absolute -right-10 -top-10 h-44 w-44 rounded-full" style={{ background: 'radial-gradient(circle at 30% 30%, var(--primary), transparent 70%)', opacity: 0.35 }} />
            <div className="absolute -left-16 bottom-0 h-56 w-56 rounded-full" style={{ background: 'radial-gradient(circle at 40% 40%, var(--secondary), transparent 70%)', opacity: 0.25 }} />

            <motion.h1
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="font-display text-3xl font-extrabold leading-tight sm:text-5xl"
            >
              {config.heroTitle}
            </motion.h1>

            <p className="mt-4 max-w-2xl text-base text-black/70 sm:text-lg">
              <Typewriter text={config.heroSubtitle} enabled={config.toggles.typewriterSubtitle} />
            </p>

            <div
              ref={areaRef}
              className="relative mt-8 min-h-[140px] rounded-3xl bg-white/70 p-4 ring-1 ring-black/5"
            >
              <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
                <button
                  onClick={onYes}
                  className="group inline-flex items-center justify-center gap-2 rounded-2xl px-6 py-4 text-sm font-extrabold shadow-soft transition active:scale-[0.98]"
                  style={{
                    background: 'linear-gradient(135deg, var(--primary), var(--secondary))',
                    color: 'white',
                  }}
                >
                  <Sparkles className="h-4 w-4 transition group-hover:rotate-12" />
                  {config.yesButtonText}
                </button>

                <button
                  onClick={() => {
                    if (thinkIsTame) {
                      showToast('Ok… te dejo pensarlo 🙈💗')
                    } else {
                      moveThink()
                    }
                  }}
                  onMouseEnter={moveThink}
                  onTouchStart={(e) => {
                    // prevent accidental click; move instead
                    if (!thinkIsTame) {
                      e.preventDefault()
                      moveThink()
                    }
                  }}
                  className="inline-flex items-center justify-center rounded-2xl border border-black/10 bg-white px-6 py-4 text-sm font-extrabold shadow-sm transition hover:scale-[1.01] active:scale-[0.98]"
                  style={
                    thinkPos && !thinkIsTame
                      ? {
                          position: 'absolute',
                          left: thinkPos.x,
                          top: thinkPos.y,
                        }
                      : undefined
                  }
                >
                  {thinkIsTame ? 'Está bien 😅' : config.thinkButtonText}
                </button>
              </div>

              <div className="mt-3 text-xs text-black/55">
                {thinkIsTame ? 'Ok ok… ya no lo muevo 😭💗' : 'Tip: intenta tocar “Lo tengo que pensar”… a ver si te deja 👀'}
              </div>
            </div>
          </section>

          {/* REASONS */}
          <section className="mt-10">
            <div className="mb-4 flex items-end justify-between gap-4">
              <div>
                <div className="font-display text-2xl font-extrabold sm:text-3xl">Razones</div>
                <div className="mt-1 text-sm text-black/60">Porque eres tú… y ya 💗</div>
              </div>
            </div>
            <ReasonCards reasons={config.reasons} />
          </section>

          {/* TIMELINE */}
          <section className="mt-12">
            <div className="mb-4">
              <div className="font-display text-2xl font-extrabold sm:text-3xl">Nuestro timeline</div>
              <div className="mt-1 text-sm text-black/60">Pequeños recuerdos que se sienten enormes.</div>
            </div>
            <Timeline items={config.timeline} />
          </section>

          {/* GALLERY */}
          <section className="mt-12">
            <div className="mb-4">
              <div className="font-display text-2xl font-extrabold sm:text-3xl">Galería</div>
              <div className="mt-1 text-sm text-black/60">Nuestra versión favorita del mundo: juntos.</div>
            </div>
            <PolaroidGallery photos={config.gallery} />
          </section>

          {/* LETTER */}
          <section className="mt-12">
            <div className="rounded-[40px] bg-white/70 p-8 shadow-soft ring-1 ring-black/5 sm:p-12">
              <div className="font-display text-2xl font-extrabold sm:text-3xl">Carta para ti, {config.girlfriendName}</div>
              <p className="mt-4 text-sm leading-relaxed text-black/70 sm:text-base">
                {config.yesMessageBody}
                <br />
                <span className="mt-4 inline-block font-extrabold" style={{ color: 'var(--primary)' }}>
                  — {config.yourName}
                </span>
              </p>
            </div>
          </section>

          <footer className="mt-12 flex flex-col items-center gap-2 text-center text-xs text-black/50">
            <div>Hecho con 💗 para {config.girlfriendName}.</div>
            <div className="opacity-80">Tip: abre el botón “Personalizar” abajo a la derecha si quieres cambiar algo.</div>
          </footer>
        </main>

        <CustomizerDrawer config={config} setConfig={setConfig} />

        <Modal open={openYes} title={config.yesMessageTitle} onClose={() => setOpenYes(false)}>
          <div className="space-y-4">
            <div className="rounded-3xl bg-white p-5 shadow-soft ring-1 ring-black/5">
              <div className="font-display text-xl font-extrabold">{config.girlfriendName}, te amo 💞</div>
              <p className="mt-2 text-sm text-black/70">{config.yesMessageBody}</p>
            </div>

            <div className="flex flex-col gap-3 sm:flex-row">
              <button
                onClick={() => downloadMemoryCard(config)}
                className="inline-flex items-center justify-center gap-2 rounded-2xl bg-white px-5 py-4 text-sm font-extrabold shadow-soft ring-1 ring-black/10 transition hover:scale-[1.02] active:scale-[0.98]"
              >
                <Download className="h-4 w-4" />
                Guardar recuerdo
              </button>
              <button
                onClick={() => setOpenYes(false)}
                className="inline-flex items-center justify-center gap-2 rounded-2xl px-5 py-4 text-sm font-extrabold shadow-soft transition active:scale-[0.98]"
                style={{ background: 'linear-gradient(135deg, var(--primary), var(--secondary))', color: 'white' }}
              >
                <Heart className="h-4 w-4" />
                Cerrar con amor
              </button>
            </div>

            <div className="text-xs text-black/50">
              Si no descarga en iPhone, mantén presionada la imagen cuando se abra en nueva pestaña.
            </div>
          </div>
        </Modal>
      </div>
    </div>
  )
}