import { useEffect, useMemo, useState } from 'react'

export default function Typewriter({
  text,
  enabled,
  speedMs = 18,
}: {
  text: string
  enabled: boolean
  speedMs?: number
}) {
  const [shown, setShown] = useState(enabled ? '' : text)

  const chars = useMemo(() => [...text], [text])

  useEffect(() => {
    if (!enabled) {
      setShown(text)
      return
    }
    setShown('')
    let i = 0
    const t = setInterval(() => {
      i++
      setShown(chars.slice(0, i).join(''))
      if (i >= chars.length) clearInterval(t)
    }, speedMs)
    return () => clearInterval(t)
  }, [enabled, text, speedMs, chars])

  return <>{shown}</>
}
