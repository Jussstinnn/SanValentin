import type { TimelineItem } from '../types'
import { motion } from 'framer-motion'
import { assetUrl } from '../lib/assetUrl'

export default function Timeline({ items }: { items: TimelineItem[] }) {

  return (
    <ol className="relative ml-3 border-l-2 border-black/10">
      {items.map((it, idx) => (
        <motion.li
          key={`${it.date}-${idx}`}
          className="mb-8 ml-6"
          initial={{ opacity: 0, x: -10 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.35, delay: idx * 0.02 }}
        >
          <span className="absolute -left-3 mt-1 flex h-6 w-6 items-center justify-center rounded-full bg-white shadow-soft ring-1 ring-black/10">
            💟
          </span>
          <div className="rounded-3xl bg-white/90 p-5 shadow-soft ring-1 ring-black/5">
            <div className={it.photo ? 'grid gap-4 sm:grid-cols-[140px_1fr] sm:items-start' : ''}>
              {it.photo && (
                <div className="sm:pt-1 mx-auto w-full max-w-[360px] sm:mx-0 sm:max-w-none">
                  <div className="rounded-3xl bg-white p-2 shadow-soft ring-1 ring-black/10">
                    <img
                      src={assetUrl(it.photo)}
                      alt={it.title}
                      loading="lazy" decoding="async"
                      className="w-full aspect-square rounded-2xl object-cover"
                    />
                  </div>
                </div>
              )}

              <div>
                <div className="flex flex-wrap items-center gap-3">
                  <span className="rounded-full bg-black/5 px-3 py-1 text-xs font-bold">{it.date}</span>
                  <span className="font-display text-lg font-extrabold">{it.title}</span>
                </div>
                <p className="mt-2 text-sm text-black/70">{it.note}</p>
              </div>
            </div>
          </div>
        </motion.li>
      ))}
    </ol>
  )
}
