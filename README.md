# CCGrupo — Website

Corporate website for **Contact Center Grupo S.A.S.**, a next-generation BPO company based in Bogotá, Colombia.

## Stack

| Layer | Technology |
|-------|------------|
| Frontend | React 19 + TypeScript |
| Bundler | Vite 6 |
| Styling | Tailwind CSS v4 |
| Animations | Motion (Framer Motion), GSAP, Three.js |
| Scroll | Lenis |
| Testing | Vitest |

## Quick Start

```bash
# Install dependencies
npm install

# Start development server
npm run dev
# → http://localhost:3000
```

## Commands

| Command | Description |
|---------|-------------|
| `make dev` | Start dev server with HMR |
| `make build` | Production build → `dist/` |
| `make preview` | Preview production build |
| `make lint` | TypeScript + ESLint check |
| `make test` | Run test suite |
| `make clean` | Remove `dist/` |

## Requirements

- Node.js 20.x (use `.nvmrc` to switch)
- npm 10+

## Environment Variables

Copy `.env.example` to `.env.local` and configure:

```bash
# EmailJS (contact form)
VITE_EMAILJS_SERVICE_ID="your_service_id"
VITE_EMAILJS_TEMPLATE_ID="your_template_id"
VITE_EMAILJS_PUBLIC_KEY="your_public_key"

# Floating WhatsApp button (optional)
VITE_WHATSAPP_NUMBER=""

# Google Analytics 4 (optional)
VITE_GA_ID=""
```

## Project Structure

```
src/
├── components/
│   ├── layout/          # Navbar, Footer
│   ├── sections/        # Homepage sections (Hero, About, Services, etc.)
│   ├── modules/         # Full-page views (ServiceModule, ContactModule)
│   └── ui/              # Reusable UI components and animations
├── data/                # Static content (services data)
├── types/               # TypeScript interfaces
├── hooks/               # Custom React hooks
├── i18n/                # Internationalization (es, en)
├── lib/                 # Utilities (cn utility)
└── config/              # Configuration (branding)
```

## Architecture Notes

- **Routing**: Client-side SPA with URL-based state management (no router)
- **Data layer**: Single source of truth in `src/data/services.ts`
- **Styling**: Tailwind v4 with CSS variables in `src/index.css`
- **Assets**: Fonts in `public/fonts/`, images in `public/images/`

## Deployment

Build for production:

```bash
npm run build
# Output: dist/
```

Deploy to Vercel (default) or any static hosting.

## License

Proprietary — All rights reserved