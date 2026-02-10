import React from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Settings, RotateCcw, Plus, Trash2 } from 'lucide-react'
import type { AppConfig, ThemePreset, TimelineItem } from '../types'
import { defaultConfig } from '../config/defaultConfig'

function Label({ children }: { children: React.ReactNode }) {
  return <div className="text-xs font-extrabold text-black/60">{children}</div>
}

function TextInput(props: React.InputHTMLAttributes<HTMLInputElement>) {
  return (
    <input
      {...props}
      className={`w-full rounded-2xl border border-black/10 bg-white px-4 py-3 text-sm shadow-sm outline-none transition focus:border-black/20 focus:ring-2 focus:ring-pink-300 ${props.className ?? ''}`}
    />
  )
}

function TextArea(props: React.TextareaHTMLAttributes<HTMLTextAreaElement>) {
  return (
    <textarea
      {...props}
      className={`w-full resize-none rounded-2xl border border-black/10 bg-white px-4 py-3 text-sm shadow-sm outline-none transition focus:border-black/20 focus:ring-2 focus:ring-pink-300 ${props.className ?? ''}`}
    />
  )
}

function Select(props: React.SelectHTMLAttributes<HTMLSelectElement>) {
  return (
    <select
      {...props}
      className={`w-full rounded-2xl border border-black/10 bg-white px-4 py-3 text-sm shadow-sm outline-none transition focus:border-black/20 focus:ring-2 focus:ring-pink-300 ${props.className ?? ''}`}
    />
  )
}

function Section({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div className="rounded-3xl bg-white/70 p-4 shadow-sm ring-1 ring-black/5">
      <div className="font-display text-lg font-extrabold">{title}</div>
      <div className="mt-3 space-y-3">{children}</div>
    </div>
  )
}

export default function CustomizerDrawer({
  config,
  setConfig,
}: {
  config: AppConfig
  setConfig: (cfg: AppConfig) => void
}) {
  const [open, setOpen] = React.useState(false)

  const applyPreset = (preset: ThemePreset) => {
    if (preset === 'cute') {
      setConfig({
        ...config,
        theme: {
          ...config.theme,
          preset,
          primary: '#ff4da6',
          secondary: '#7c5cff',
          cream: '#fff3f8',
          text: '#241a22',
          card: '#ffffff',
        },
      })
      return
    }
    if (preset === 'elegant') {
      setConfig({
        ...config,
        theme: {
          ...config.theme,
          preset,
          primary: '#e11d48',
          secondary: '#111827',
          cream: '#fff1f2',
          text: '#0b0b10',
          card: '#ffffff',
        },
      })
      return
    }
    setConfig({
      ...config,
      theme: {
        ...config.theme,
        preset,
        primary: '#a855f7',
        secondary: '#38bdf8',
        cream: '#f5f3ff',
        text: '#0b0b10',
        card: '#ffffff',
      },
    })
  }

  const updateTimeline = (items: TimelineItem[]) => setConfig({ ...config, timeline: items })

  return (
    <>
      <button
        onClick={() => setOpen(true)}
        className="fixed bottom-5 right-5 z-40 flex items-center gap-2 rounded-full bg-white/85 px-4 py-3 text-sm font-extrabold shadow-soft ring-1 ring-black/10 backdrop-blur-0 sm:backdrop-blur transition hover:scale-[1.02] active:scale-[0.98]"
      >
        <Settings className="h-4 w-4" />
        Personalizar
      </button>

      <AnimatePresence>
        {open && (
          <motion.div
            className="fixed inset-0 z-50 flex justify-end bg-black/30"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onMouseDown={(e) => {
              if (e.target === e.currentTarget) setOpen(false)
            }}
          >
            <motion.aside
              className="h-full w-full max-w-md overflow-y-auto bg-[rgba(255,255,255,0.92)] p-5 backdrop-blur-0 sm:backdrop-blur"
              initial={{ x: 30, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              exit={{ x: 30, opacity: 0 }}
              transition={{ type: 'spring', stiffness: 280, damping: 26 }}
            >
              <div className="flex items-start justify-between gap-4">
                <div>
                  <div className="font-display text-2xl font-extrabold">Panel de personalización</div>
                  <div className="mt-1 text-sm text-black/60">Todo se guarda en este dispositivo (localStorage).</div>
                </div>
                <button
                  onClick={() => setOpen(false)}
                  className="rounded-2xl border border-black/10 bg-white px-3 py-2 text-sm shadow-sm transition hover:scale-[1.02] active:scale-[0.98]"
                >
                  Cerrar
                </button>
              </div>

              <div className="mt-5 space-y-4">
                <Section title="Nombres">
                  <div className="space-y-2">
                    <Label>Nombre de ella</Label>
                    <TextInput
                      value={config.girlfriendName}
                      onChange={(e) => setConfig({ ...config, girlfriendName: e.target.value })}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label>Tu nombre</Label>
                    <TextInput value={config.yourName} onChange={(e) => setConfig({ ...config, yourName: e.target.value })} />
                  </div>
                </Section>

                <Section title="Textos principales">
                  <div className="space-y-2">
                    <Label>Título (hero)</Label>
                    <TextInput value={config.heroTitle} onChange={(e) => setConfig({ ...config, heroTitle: e.target.value })} />
                  </div>
                  <div className="space-y-2">
                    <Label>Subtítulo</Label>
                    <TextArea
                      rows={3}
                      value={config.heroSubtitle}
                      onChange={(e) => setConfig({ ...config, heroSubtitle: e.target.value })}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label>Mensaje final (cuando diga SÍ)</Label>
                    <TextArea
                      rows={4}
                      value={config.yesMessageBody}
                      onChange={(e) => setConfig({ ...config, yesMessageBody: e.target.value })}
                    />
                  </div>
                </Section>

                <Section title="Botones">
                  <div className="space-y-2">
                    <Label>Texto del botón SÍ</Label>
                    <TextInput value={config.yesButtonText} onChange={(e) => setConfig({ ...config, yesButtonText: e.target.value })} />
                  </div>
                  <div className="space-y-2">
                    <Label>Texto del botón “pensarlo”</Label>
                    <TextInput value={config.thinkButtonText} onChange={(e) => setConfig({ ...config, thinkButtonText: e.target.value })} />
                  </div>
                </Section>

                <Section title="Razones (1 por línea)">
                  <TextArea
                    rows={6}
                    value={config.reasons.join('\n')}
                    onChange={(e) =>
                      setConfig({
                        ...config,
                        reasons: e.target.value
                          .split('\n')
                          .map((s) => s.trim())
                          .filter(Boolean),
                      })
                    }
                  />
                </Section>

                <Section title="Mensajitos del botón travieso (1 por línea)">
                  <TextArea
                    rows={5}
                    value={config.playfulMessages.join('\n')}
                    onChange={(e) =>
                      setConfig({
                        ...config,
                        playfulMessages: e.target.value
                          .split('\n')
                          .map((s) => s.trim())
                          .filter(Boolean),
                      })
                    }
                  />
                </Section>

                <Section title="Timeline">
                  <div className="space-y-3">
                    {config.timeline.map((t, idx) => (
                      <div key={idx} className="rounded-2xl border border-black/10 bg-white p-3">
                        <div className="flex items-center justify-between gap-3">
                          <div className="font-extrabold text-sm">#{idx + 1}</div>
                          <button
                            onClick={() => {
                              const next = config.timeline.filter((_, i) => i !== idx)
                              updateTimeline(next)
                            }}
                            className="rounded-xl border border-black/10 bg-white px-2 py-1 text-xs font-extrabold shadow-sm transition hover:scale-[1.02] active:scale-[0.98]"
                            aria-label="Eliminar"
                          >
                            <Trash2 className="h-4 w-4" />
                          </button>
                        </div>
                        <div className="mt-2 grid gap-2">
                          <div className="space-y-1">
                            <Label>Fecha</Label>
                            <TextInput
                              value={t.date}
                              onChange={(e) => {
                                const next = [...config.timeline]
                                next[idx] = { ...next[idx], date: e.target.value }
                                updateTimeline(next)
                              }}
                            />
                          </div>
                          <div className="space-y-1">
                            <Label>Título</Label>
                            <TextInput
                              value={t.title}
                              onChange={(e) => {
                                const next = [...config.timeline]
                                next[idx] = { ...next[idx], title: e.target.value }
                                updateTimeline(next)
                              }}
                            />
                          </div>
                          <div className="space-y-1">
                            <Label>Nota</Label>
                            <TextArea
                              rows={2}
                              value={t.note}
                              onChange={(e) => {
                                const next = [...config.timeline]
                                next[idx] = { ...next[idx], note: e.target.value }
                                updateTimeline(next)
                              }}
                            />
                          </div>

                          <div className="space-y-1">
                            <Label>Foto (opcional)</Label>
                            <TextInput
                              placeholder="Ej: photos/timeline/01.jpg o https://..."
                              value={t.photo ?? ''}
                              onChange={(e) => {
                                const next = [...config.timeline]
                                const v = e.target.value.trim()
                                next[idx] = { ...next[idx], photo: v ? v : undefined }
                                updateTimeline(next)
                              }}
                            />
                            <div className="text-xs text-black/50">
                              Tip: si subes la imagen al repo en <b>public/photos/timeline</b>, solo escribe <b>photos/timeline/01.jpg</b>.
                            </div>
                          </div>
                        </div>
                      </div>
                    ))}

                    <button
                      onClick={() =>
                        updateTimeline([
                          ...config.timeline,
                          { date: 'Nueva fecha', title: 'Nuevo momento', note: 'Un mini recuerdo...' },
                        ])
                      }
                      className="flex w-full items-center justify-center gap-2 rounded-2xl bg-white px-4 py-3 text-sm font-extrabold shadow-soft ring-1 ring-black/10 transition hover:scale-[1.02] active:scale-[0.98]"
                    >
                      <Plus className="h-4 w-4" />
                      Agregar momento
                    </button>
                  </div>
                </Section>

                <Section title="Tema">
                  <div className="space-y-2">
                    <Label>Preset</Label>
                    <Select
                      value={config.theme.preset}
                      onChange={(e) => applyPreset(e.target.value as ThemePreset)}
                    >
                      <option value="cute">Cute (Sanrio)</option>
                      <option value="elegant">Elegante</option>
                      <option value="dreamy">Dreamy</option>
                    </Select>
                  </div>

                  <div className="grid grid-cols-2 gap-3">
                    <div className="space-y-2">
                      <Label>Primario</Label>
                      <TextInput type="color" value={config.theme.primary} onChange={(e) => setConfig({ ...config, theme: { ...config.theme, primary: e.target.value } })} />
                    </div>
                    <div className="space-y-2">
                      <Label>Secundario</Label>
                      <TextInput type="color" value={config.theme.secondary} onChange={(e) => setConfig({ ...config, theme: { ...config.theme, secondary: e.target.value } })} />
                    </div>
                    <div className="space-y-2">
                      <Label>Cream</Label>
                      <TextInput type="color" value={config.theme.cream} onChange={(e) => setConfig({ ...config, theme: { ...config.theme, cream: e.target.value } })} />
                    </div>
                    <div className="space-y-2">
                      <Label>Texto</Label>
                      <TextInput type="color" value={config.theme.text} onChange={(e) => setConfig({ ...config, theme: { ...config.theme, text: e.target.value } })} />
                    </div>
                  </div>
                </Section>

                <Section title="Efectos">
                  <div className="grid grid-cols-1 gap-2">
                    <label className="flex items-center justify-between gap-3 rounded-2xl border border-black/10 bg-white px-4 py-3 text-sm font-bold">
                      Corazones flotando
                      <input
                        type="checkbox"
                        checked={config.toggles.floatingHearts}
                        onChange={(e) => setConfig({ ...config, toggles: { ...config.toggles, floatingHearts: e.target.checked } })}
                      />
                    </label>
                    <label className="flex items-center justify-between gap-3 rounded-2xl border border-black/10 bg-white px-4 py-3 text-sm font-bold">
                      Confetti al decir “sí”
                      <input
                        type="checkbox"
                        checked={config.toggles.confetti}
                        onChange={(e) => setConfig({ ...config, toggles: { ...config.toggles, confetti: e.target.checked } })}
                      />
                    </label>
                    <label className="flex items-center justify-between gap-3 rounded-2xl border border-black/10 bg-white px-4 py-3 text-sm font-bold">
                      Subtítulo typewriter
                      <input
                        type="checkbox"
                        checked={config.toggles.typewriterSubtitle}
                        onChange={(e) => setConfig({ ...config, toggles: { ...config.toggles, typewriterSubtitle: e.target.checked } })}
                      />
                    </label>
                  </div>
                </Section>

                <div className="rounded-3xl bg-white/70 p-4 shadow-sm ring-1 ring-black/5">
                  <button
                    onClick={() => setConfig(defaultConfig)}
                    className="flex w-full items-center justify-center gap-2 rounded-2xl bg-white px-4 py-3 text-sm font-extrabold shadow-soft ring-1 ring-black/10 transition hover:scale-[1.02] active:scale-[0.98]"
                  >
                    <RotateCcw className="h-4 w-4" />
                    Reset (volver al default)
                  </button>
                </div>

                <div className="h-8" />
              </div>
            </motion.aside>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}

