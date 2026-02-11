/**
 * Prefix a relative public asset path with the correct base path.
 *
 * Why: GitHub Pages serves this site from /<repo>/, and some browsers/devices can cache
 * an older build. This helper makes image URLs resilient by:
 * 1) using Vite's BASE_URL when available
 * 2) falling back to guessing the repo base from window.location.pathname
 */
export function assetUrl(path: string): string {
  const raw = (path || '').trim()
  if (!raw) return raw

  // Leave absolute URLs/data URIs untouched
  if (/^(https?:)?\/\//i.test(raw) || /^data:/i.test(raw)) return raw

  // Normalize: remove leading "./"
  const normalized = raw.replace(/^\.\//, '')

  // Vite provides a build-time base, usually "/" locally and "/SanValentin/" on GH Pages.
  let base = (import.meta as any).env?.BASE_URL || '/'

  // If base is just "/", try to infer from the current URL (works well on GH Pages).
  if (base === '/' && typeof window !== 'undefined') {
    const parts = window.location.pathname.split('/').filter(Boolean)
    if (parts.length > 0) base = `/${parts[0]}/`
  }

  // Ensure base ends with a single slash
  base = base.endsWith('/') ? base : `${base}/`

  // If the incoming path already starts with the base, return as-is.
  if (normalized.startsWith(base)) return normalized

  // Remove any leading slashes from path, then join.
  return `${base}${normalized.replace(/^\/+/, '')}`
}
