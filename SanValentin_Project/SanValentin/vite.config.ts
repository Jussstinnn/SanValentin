import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// GitHub Pages serves this repo at:
//   https://jussstinnn.github.io/SanValentin/
// If you rename the repo, change REPO_NAME below.
const REPO_NAME = 'SanValentin'

export default defineConfig(({ mode }) => ({
  base: mode === 'production' ? `/${REPO_NAME}/` : '/',
  plugins: [react()],
}))
