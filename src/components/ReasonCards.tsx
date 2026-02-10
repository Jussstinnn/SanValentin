import { motion } from 'framer-motion'

export default function ReasonCards({ reasons }: { reasons: string[] }) {
  return (
    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
      {reasons.map((r, idx) => (
        <motion.div
          key={`${idx}-${r}`}
          className="rounded-3xl bg-white/90 p-5 shadow-soft ring-1 ring-black/5"
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.35, delay: idx * 0.03 }}
        >
          <div className="font-display text-xl font-extrabold">{idx + 1} 💗</div>
          <p className="mt-2 text-sm text-black/70">{r}</p>
        </motion.div>
      ))}
    </div>
  )
}
