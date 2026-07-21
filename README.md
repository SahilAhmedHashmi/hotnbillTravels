# Hornbill Journeys

> Premium, responsible travel experiences across Northeast India — curated destinations, guided experiences, a reliable vehicle fleet, and custom itineraries.

Hornbill Journeys is a single-page marketing and trip-planning website for a Northeast India travel agency. It features destination and experience catalogues, a bookable vehicle fleet, curated packages, and a multi-step trip-planning / booking flow.

## Tech Stack

- **[React](https://react.dev/)** — UI library
- **[Vite](https://vite.dev/)** — build tool and dev server
- **[React Router](https://reactrouter.com/)** — client-side routing

## Getting Started

### Prerequisites

- [Node.js](https://nodejs.org/) 18+ and npm

### Installation

```bash
# Clone the repository
git clone https://github.com/<owner>/hotnbillTravels.git
cd hotnbillTravels

# Install dependencies
npm install
```

### Development

```bash
npm run dev
```

Starts the Vite dev server (default: http://localhost:5173) with hot module replacement.

### Production build

```bash
npm run build     # bundle to dist/
npm run preview   # preview the production build locally
```

## Project Structure

```
hotnbillTravels/
├── public/               # Static assets served at the site root (images, media)
├── src/
│   ├── app/              # Router configuration
│   ├── components/       # Reusable UI components, grouped by feature
│   │   ├── booking/      #   multi-step booking flow
│   │   ├── cards/        #   destination / experience / package / vehicle cards
│   │   ├── common/       #   shared UI primitives (Button, Icon, FAQ, ...)
│   │   ├── destinations/
│   │   ├── experiences/
│   │   ├── fleet/
│   │   ├── home/         #   homepage sections
│   │   ├── layout/       #   Navbar, Footer, floating widgets
│   │   └── packages/
│   ├── data/             # Static content data (destinations, vehicles, packages, ...)
│   ├── hooks/            # Custom React hooks
│   ├── layouts/          # Route layout wrappers
│   ├── pages/            # Route-level page components
│   ├── services/         # Client-side services (booking, etc.)
│   ├── styles/           # Global styles, design tokens, per-section CSS
│   └── main.jsx          # Application entry point
├── docs/                 # Design specs, architecture notes, implementation guides
│   └── legacy/           # Archived earlier prototype
├── index.html            # Vite HTML entry point
└── vite.config.js        # Vite configuration
```

## Assets

All images and static media live in [`public/`](public/) and are referenced from code with root-absolute paths (e.g. `/Thar.png`), which Vite serves from `public/` in development and copies into `dist/` on build.

## Documentation

Design system, page-by-page specifications, and the overall site architecture are documented in [`docs/`](docs/). Start with [`docs/00_read_first.md`](docs/00_read_first.md) and [`docs/WEBSITE_ARCHITECTURE.md`](docs/WEBSITE_ARCHITECTURE.md).
