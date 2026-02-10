import { motion } from 'framer-motion'

export default function PolaroidGallery({ photos }: { photos: string[] }) {
  return (
    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
      {photos.map((src, idx) => (
        <motion.figure
          key={src}
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.35, delay: idx * 0.03 }}
          className="rounded-3xl bg-white p-3 shadow-soft ring-1 ring-black/5"
          style={{ transform: `rotate(${(idx % 3 - 1) * 1.5}deg)` }}
        >
          <div className="overflow-hidden rounded-2xl">
            <img src={src} alt={`Foto ${idx + 1}`} className="h-64 w-full object-cover" loading="eager" decoding="async" />
          </div>
          <figcaption className="mt-3 text-center text-sm font-semibold text-black/70">
            {idx % 2 === 0 ? '💗' : '✨'}
          </figcaption>
        </motion.figure>
      ))}
    </div>
  )
}
