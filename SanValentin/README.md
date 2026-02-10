# SanValentin 💘 (Justin x Sophia)

Proyecto listo para **GitHub Pages**.

## 1) Cómo correrlo local

```bash
npm install
npm run dev
```

## 2) Deploy a GitHub Pages (automático)

Este repo ya incluye un workflow (`.github/workflows/deploy.yml`).

1. Sube todo al repo **main**.
2. En GitHub: **Settings → Pages**
   - Source: **GitHub Actions**
3. Haz `git push`.
4. Espera a que termine el action.

### URL esperada
- `https://jussstinnn.github.io/SanValentin/`

## 3) Si cambias el nombre del repo
Edita `vite.config.ts` y cambia:

```ts
base: '/SanValentin/'
```

por:

```ts
base: '/NOMBRE_DEL_REPO/'
```

## 4) Personalización
Abre el botón **“Personalizar”** (abajo a la derecha). Todo se guarda en el navegador (localStorage).

- Cambiar nombres, textos, razones, timeline.
- Colores/preset del tema.
- Efectos (corazones/confetti/typewriter).

## Fotos
Están en `public/photos/`.

