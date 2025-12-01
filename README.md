# AG-Tabelki

ASS subtitle table overlay generator for fansub groups. Create professional-looking table overlays for anime fansubs with ease.

## Features

- **Multiple Preset Blueprints** - AnimeGATE, AnimeSubs.info, Biblioteka Nyaa, Desu-Online, FrixySubs, LycorisCafe, Shisha, and more
- **Custom Templates** - Create and save your own templates with localStorage persistence
- **Resolution Presets** - 1080p, 1080p Cinema (2.35:1), 4K, 4K Cinema, and custom resolutions
- **Live Preview** - Real-time SVG preview with background image support
- **Logo Generation** - Generate corner watermark overlays
- **Bilingual** - Polish and English interface
- **Auto-Update** - Automatic updates via GitHub Releases

## Tech Stack

- **Electron 38+** - Cross-platform desktop application
- **React 19** - With React Compiler for automatic optimization
- **TypeScript** - Full type safety
- **Vite** - Fast development and builds
- **shadcn-ui** - Beautiful, accessible UI components
- **Tailwind CSS 4** - Utility-first styling
- **TanStack Router** - Type-safe routing
- **i18next** - Internationalization

## Quick Start

### Prerequisites

- Node.js 18+ (20+ recommended)
- pnpm 9+ (`npm install -g pnpm` or `corepack enable`)

### Installation

```bash
# Clone the repository
git clone https://github.com/AnimeGate/AG-Tabelki.git
cd AG-Tabelki

# Install dependencies
pnpm install

# Start development server
pnpm start
```

### Development

```bash
# Start with hot reload
pnpm start

# Start with debug console
pnpm run dev

# Run tests
pnpm test

# Lint code
pnpm run lint

# Format code
pnpm run format:write
```

### Building

```bash
# Build for development (no installer)
pnpm run dist:dir

# Build with NSIS installer
pnpm run dist

# Build and publish to GitHub Releases
pnpm run publish
```

## Usage

1. **Select Resolution** - Choose from presets (1080p, 4K, etc.) or enter custom dimensions
2. **Choose Position** - Left or Right side of the video
3. **Select Template** - Pick a preset blueprint or use Custom
4. **Edit Content** - Modify title, description, and content lines
5. **Preview** - See real-time preview (optionally add background image)
6. **Generate** - Click Generate to create ASS code
7. **Copy** - Copy the generated ASS code to your subtitle editor

## Project Structure

```
AG-Tabelki/
├── src/
│   ├── components/
│   │   ├── tabelka/              # Main application components
│   │   │   ├── Tabelka.tsx       # Main component with state
│   │   │   ├── TabelkaSettingsPanel.tsx  # Settings controls
│   │   │   ├── TabelkaPreview.tsx        # SVG preview
│   │   │   └── TabelkaOutput.tsx         # Output display
│   │   └── ui/                   # shadcn-ui components
│   │
│   ├── lib/                      # Core libraries
│   │   ├── tabelka-blueprints.ts # Blueprint definitions
│   │   └── tabelka-generator.ts  # ASS code generation
│   │
│   ├── config/
│   │   └── app.config.ts         # App configuration
│   │
│   ├── localization/
│   │   └── i18n.ts               # Translations (PL/EN)
│   │
│   └── routes/
│       └── index.tsx             # Main route
│
├── package.json
└── README.md
```

## Available Blueprints

| Blueprint | Description |
|-----------|-------------|
| AnimeGATE | Main AnimeGATE template |
| AnimeSubs.info | AnimeSubs.info group template |
| Biblioteka Nyaa | Biblioteka Nyaa group template |
| Demo Subs | Demo Subs group template |
| Desu-Online | Desu-Online group template |
| FrixySubs | FrixySubs group template |
| LycorisCafe | LycorisCafe group template |
| Shisha | Shisha group template |
| Custom | Create your own template |

## Scripts Reference

| Script | Description |
|--------|-------------|
| `pnpm start` | Start development server |
| `pnpm run dev` | Start with debug console |
| `pnpm run build` | Build for production |
| `pnpm run dist:dir` | Build and package (no installer) |
| `pnpm run dist` | Build with installer |
| `pnpm run publish` | Build and publish to GitHub |
| `pnpm test` | Run unit tests |
| `pnpm run lint` | Lint code |
| `pnpm run format:write` | Format code |

## License

MIT License - see [LICENSE](./LICENSE) file for details.

## Credits

Built by [AnimeGate](https://github.com/AnimeGate)

Technologies used:
- [Electron](https://electronjs.org)
- [React](https://react.dev)
- [shadcn-ui](https://ui.shadcn.com)
- [Tailwind CSS](https://tailwindcss.com)
