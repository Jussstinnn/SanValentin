import type { AppConfig } from '../types'

// NOTE: On GitHub Pages this site is served from a sub-path (e.g. /SanValentin/).
// Always prefix static assets with Vite's BASE_URL so images work on *all* devices/browsers.
const BASE = import.meta.env.BASE_URL

export const defaultConfig: AppConfig = {
  girlfriendName: 'Sophia',
  yourName: 'Justin',

  heroTitle: 'Mi amor, ¿quieres ser mi San Valentín? 💘',
  heroSubtitle: 'Te hice esta mini página para decirte algo simple pero gigante: quiero seguir viviendo todo contigo.',

  yesButtonText: 'Sí, obvio ❤️',
  thinkButtonText: 'Lo tengo que pensar 🙈',

  yesMessageTitle: '¡Sabía que dirías que sí! 🥹💞',
  yesMessageBody:
    'Gracias por un año mas ser mi san valentin, te amo muchisimo y espero siempre pasemos este dia juntos',

  reasons: [
    'Eres la mujer mas hermosa que hay en el mundo para mi',
    'No existe otra igual jamas',
    'Tu manera de ser es muy especial',
    'No eres igual al resto',
    'Una persona increible',
  ],

  timeline: [
    {
      date: '5 Jul 2024',
      title: 'Primera vez que nos vimos',
      note: '¿Te acuerdas como estabas de nerviosa? Ni me veías a los ojos.',
      photo: `${BASE}timeline/2024-07-05.jpeg`,
    },
    {
      date: '13 Jul 2024',
      title: 'Primera vez en mi casa',
      note: 'Estabas muerta de nervios por conocer a mi familia.',
      photo: `${BASE}timeline/2024-07-13.jpeg`,
    },
    {
      date: '3 Ago 2024',
      title: 'Arrollado',
      note: 'Te llevé a probar el arrollado que tanto querías probar.',
      photo: `${BASE}timeline/2024-08-03.jpeg`,
    },
    {
      date: '11 Oct 2024',
      title: 'City Bakery',
      note: 'Fuimos al restaurante del que tanto me hablabas.',
      photo: `${BASE}timeline/2024-10-11.jpeg`,
    },
    {
      date: '18 Oct 2024',
      title: 'Payasos',
      note: 'Primera vez que fui a los payasos y fue por ti.',
      photo: `${BASE}timeline/2024-10-18.jpeg`,
    },
    {
      date: '14 Feb 2025',
      title: 'Flores',
      note: 'Primera vez que te di flores.',
      photo: `${BASE}timeline/2025-02-14.jpeg`,
    },
    {
      date: '5 Abr 2025',
      title: 'Festival Japonés',
      note: 'Fuimos al festival japonés y compramos cosas.',
      photo: `${BASE}timeline/2025-04-05.jpeg`,
    },
    {
      date: '9 Ago 2025',
      title: 'Pulsera y Santería',
      note: 'Me regalaste la pulsera que nunca me he quitado y fuimos a santería.',
      photo: `${BASE}timeline/2025-08-09.jpeg`,
    },
    {
      date: '25 Ago 2025',
      title: 'Snowty',
      note: 'Fuimos a Snowty y estabas feliz.',
      photo: `${BASE}timeline/2025-08-25.jpeg`,
    },
    {
      date: '∞',
      title: 'Lo que falta por vivir',
      note: 'Me faltaron muchas más cosas… y todas las que quedan por vivir.',
    },
  ],

  gallery: [
    `${BASE}photos/01.jpeg`,
    `${BASE}photos/02.jpeg`,
    `${BASE}photos/03.jpeg`,
    `${BASE}photos/04.jpeg`,
    `${BASE}photos/05.jpeg`,
    `${BASE}photos/06.jpeg`,
  ],

  playfulMessages: ['¿En serio? 😳', '¿Estás segura? 🥺', 'Me daré cuenta de tu respuesta 👀', 'Sophiaaaaa 😭💗', 'Justin está nervioso 🙈', 'Ok… lo intento otra vez 😤💘'],

  theme: {
    preset: 'cute',
    // Pastel/Sanrio-ish palette
    primary: '#ff4da6',
    secondary: '#7c5cff',
    cream: '#fff3f8',
    text: '#241a22',
    card: '#ffffff',
  },

  toggles: {
    floatingHearts: true,
    confetti: true,
    typewriterSubtitle: true,
  },
}
