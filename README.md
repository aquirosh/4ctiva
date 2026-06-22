# Activa

Marketing / informative website for **Activa** — a wellness membership platform connecting people and companies with gyms, studios, and wellness services in Costa Rica through a single flexible membership.

The site is a single-page landing built with Vite + React + TypeScript, Tailwind CSS v4, and shadcn/ui. Content is in Spanish and oriented around the Costa Rica pilot, with sections for users, companies, and gyms/studios, plus a three-audience contact form.

## Development

```bash
npm install
npm run dev      # start the dev server
npm run build    # production build to dist/
```

## Structure

- `src/app/App.tsx` — the full landing page (header, hero, benefits, pilot, FAQ, contact forms, footer).
- `src/app/components/ui/` — shadcn/ui components.
- `src/styles/` — theme, fonts, and Tailwind entry (`index.css`).
- `index.html` — Vite entry point.
