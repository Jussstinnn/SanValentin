export type TimelineItem = {
  date: string
  title: string
  note: string
  /** Optional photo for this moment. Can be an absolute URL or a path inside /public (e.g. photos/timeline/01.jpg). */
  photo?: string
}

export type ThemePreset = 'cute' | 'elegant' | 'dreamy'

export type AppConfig = {
  girlfriendName: string
  yourName: string

  heroTitle: string
  heroSubtitle: string

  yesButtonText: string
  thinkButtonText: string

  yesMessageTitle: string
  yesMessageBody: string

  reasons: string[]
  timeline: TimelineItem[]

  gallery: string[]

  playfulMessages: string[]

  theme: {
    preset: ThemePreset
    primary: string
    secondary: string
    cream: string
    text: string
    card: string
  }

  toggles: {
    floatingHearts: boolean
    confetti: boolean
    typewriterSubtitle: boolean
  }
}
