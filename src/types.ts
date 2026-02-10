export type TimelineItem = {
  date: string
  title: string
  note: string
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
