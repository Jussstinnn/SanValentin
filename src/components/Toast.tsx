import { AnimatePresence, motion } from 'framer-motion'

export default function Toast({
  message,
  show,
}: {
  message: string
  show: boolean
}) {
  return (
    <div className="fixed left-0 right-0 top-4 z-50 flex justify-center px-4">
      <AnimatePresence>
        {show && (
          <motion.div
            initial={{ opacity: 0, y: -10, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -10, scale: 0.98 }}
            transition={{ duration: 0.18 }}
            className="max-w-md rounded-2xl border border-white/60 bg-white/80 px-4 py-3 text-center text-sm shadow-soft backdrop-blur"
          >
            <span className="font-semibold">{message}</span>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}
