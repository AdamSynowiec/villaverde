my-landing/
├── public/
│   └── images/                # wszystkie obrazki (Hero, Services, OG itp.)
├── src/
│   ├── assets/
│   │   └── styles/            # globalne style CSS / Tailwind config itp.
│   │
│   ├── components/
│   │   ├── common/            # reużywalne komponenty
│   │   │   ├── Button.jsx
│   │   │   ├── Navbar.jsx
│   │   │   └── Footer.jsx
│   │   │
│   │   ├── layout/            # layout aplikacji
│   │   │   └── Layout.jsx
│   │   │
│   │   └── sections/          # sekcje landing page
│   │       ├── Hero.jsx
│   │       ├── Features.jsx
│   │       ├── Services.jsx
│   │       ├── Testimonials.jsx
│   │       └── Cta.jsx
│   │
│   ├── data/                  # dane JSON (treści + SEO)
│   │   └── pages.json
│   │
│   ├── pages/                 # widoki stron
│   │   └── Page.jsx           # uniwersalny komponent strony
│   │
│   ├── routes/
│   │   └── AppRoutes.jsx      # dynamiczny routing z slug
│   │
│   ├── utils/
│   │   └── helpers.js         # funkcje pomocnicze np. mapowanie sekcji
│   │
│   ├── components/Seo.jsx     # konfiguracja SEO z react-helmet-async
│   ├── SectionRenderer.jsx    # renderuje sekcje na podstawie JSON
│   ├── App.jsx
│   └── index.js
├── package.json
└── tailwind.config.js (opcjonalnie)
