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
├── src/
│   ├── components/
│   │   ├── ui/              # Componentes base: Button, Card, Input, Badge
│   │   └── ThemeToggle.jsx  # Botón de modo día / noche
│   ├── hooks/
│   │   └── useTheme.js      # Manejo del modo oscuro
│   ├── styles/
│   │   └── clefairy-theme.css  # Tema de Tailwind CSS v4
│   ├── App.jsx      # Componente principal
│   ├── main.jsx     # Punto de entrada
│   └── index.css    # CSS principal (importa el tema)
├── index.html
├── vite.config.js
└── package.json
```

## Autoría

Julieta Bravo
