import type { AppConfig } from '../types'
import { defaultConfig } from '../config/defaultConfig'

const KEY = 'sv-config-v1'


function isObject(v: unknown): v is Record<string, unknown> {
  return typeof v === 'object' && v !== null
}

export function loadConfig(): AppConfig {
  try {
    const raw = localStorage.getItem(KEY)
    if (!raw) return defaultConfig
    const parsed: unknown = JSON.parse(raw)
    if (!isObject(parsed)) return defaultConfig
    // Deep-ish merge with defaults to keep new fields safe
    return {
      ...defaultConfig,
      ...parsed,
      theme: {
        ...defaultConfig.theme,
        ...(isObject(parsed.theme) ? (parsed.theme as any) : {}),
      },
      toggles: {
        ...defaultConfig.toggles,
        ...(isObject(parsed.toggles) ? (parsed.toggles as any) : {}),
      },
    }
  } catch {
    return defaultConfig
  }
}

export function saveConfig(cfg: AppConfig) {
  localStorage.setItem(KEY, JSON.stringify(cfg))
}

export function resetConfig() {
  localStorage.removeItem(KEY)
}
