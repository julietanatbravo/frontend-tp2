# Frontend – TP2

Trabajo Práctico N.º 2 de la materia Frontend.

Aplicación desarrollada con [React](https://react.dev/) y [Vite](https://vite.dev/).

## Requisitos

- [Node.js](https://nodejs.org/) 18 o superior (probado con 20.18)
- npm

## Instalación

```bash
git clone <url-del-repositorio>
cd frontend-tp2
npm install
```

## Scripts

| Comando           | Descripción                                        |
| ----------------- | -------------------------------------------------- |
| `npm run dev`     | Levanta el servidor de desarrollo                  |
| `npm run build`   | Genera la versión de producción en `dist/`         |
| `npm run preview` | Sirve localmente la versión de producción generada |
| `npm run lint`    | Revisa el código con ESLint                        |

## Estructura

```
frontend-tp2/
├── public/          # Archivos estáticos
├── scripts/
│   └── component-tree.js  # Genera el árbol de componentes desde el código (plugin de Vite)
├── src/
│   ├── components/
│   │   ├── home/            # Portada (MemberCard, SectionCard, MoonIllustration)
│   │   ├── layout/          # Layout, Sidebar y Brand (identidad del equipo)
│   │   ├── pokemon/         # Juego "¿Es eficaz?" (PokéAPI)
│   │   ├── profile/         # Perfil de integrante (FavoritePokemon, FavoriteList)
│   │   ├── songs/           # Listado de canciones (SongCard, SongFilters)
│   │   ├── tree/            # Árbol de componentes (TreeNode, TreeLegend)
│   │   ├── ui/              # Componentes base: Button, Card, Input, Badge, ConfirmDialog, Disclosure, SegmentedControl
│   │   └── ThemeToggle.jsx  # Botón de modo día / noche
│   ├── data/                # Datos locales en JSON
│   ├── pages/               # Una página por ruta
│   ├── hooks/               # useTheme (modo oscuro), usePokemonRound (estados de la API), useAudioPreview
│   ├── services/            # Consultas a APIs externas
│   ├── utils/               # Funciones auxiliares (cálculo de eficacia)
│   ├── styles/
│   │   └── clefairy-theme.css  # Tema de Tailwind CSS v4
│   ├── App.jsx      # Componente principal
│   ├── main.jsx     # Punto de entrada
│   └── index.css    # CSS principal (importa el tema)
├── index.html
├── vercel.json      # Redirige todas las rutas a index.html (React Router)
├── vite.config.js
└── package.json
```

## Autoría

Julieta Bravo
