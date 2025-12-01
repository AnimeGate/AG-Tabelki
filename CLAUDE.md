# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

**AG-Tabelki** is an ASS (Advanced SubStation Alpha) table overlay generator for fansub groups. Built with Electron, React 19, TypeScript, and shadcn-ui, it allows users to create professional-looking table overlays for anime fansubs.

**Key Features:**
- Generate ASS dialogue lines for table overlays
- Multiple preset blueprints for different fansub groups (AnimeGATE, AnimeSubs.info, Desu-Online, etc.)
- Custom blueprint support with localStorage persistence
- Resolution presets (1080p, 4K, Cinema variants)
- Left/Right positioning options
- Live SVG preview with background image support
- Logo generation for corner watermarks
- Polish and English localization
- Dark/light theme support
- Auto-update via GitHub Releases

## Commands

### Development
- `pnpm start` - Start the app in development mode with Vite hot reload
- `pnpm run start:debug` - Start with debug mode (opens debug console window)
- `pnpm run start:debug:win` - Windows-specific debug mode command
- `pnpm run lint` - Run ESLint
- `pnpm run format` - Check formatting with Prettier
- `pnpm run format:write` - Format all code

### Testing
- `pnpm test` - Run Vitest unit tests once
- `pnpm run test:watch` - Run Vitest in watch mode
- `pnpm run test:unit` - Alias for test:watch
- `pnpm run test:e2e` - Run Playwright E2E tests (requires `dist:dir` first)
- `pnpm run test:all` - Run all tests

**IMPORTANT**: E2E tests require the app to be packaged first with `pnpm run dist:dir`.

### Building and Distribution
- `pnpm run build` - Build the app (no packaging)
- `pnpm run dist:dir` - Build and package without installer (fast, for testing)
- `pnpm run dist` - Build and create NSIS installer
- `pnpm run publish` - Build and publish to GitHub Releases (auto-update)

**Note**: Uses **electron-builder** with NSIS (not Electron Forge). Output goes to `release/`.

## Architecture

### Centralized App Configuration

**Location:** `src/config/app.config.ts`

Single source of truth for all app metadata:
- `APP_NAME` - "AG-Tabelki"
- `APP_ID` - "com.animegate.ag-tabelki"
- `PRODUCT_NAME` - "AG-Tabelki"
- `GITHUB_CONFIG` - { owner: "AnimeGate", repo: "AG-Tabelki" }

### Electron Process Model

1. **Main Process** (`src/main.ts`)
   - Creates and manages BrowserWindow
   - Persists window state via electron-window-state
   - Registers IPC listeners
   - Initializes auto-updater

2. **Preload Script** (`src/preload.ts`)
   - Runs in isolated context
   - Exposes IPC contexts via `exposeContexts()`

3. **Renderer Process** (`src/renderer.ts`)
   - Entry point for React app
   - Renders `App.tsx` with routing

### Main Application Component

**Tabelka** (`src/components/tabelka/`) - The core functionality:

- `Tabelka.tsx` - Main component with state management
  - Resolution and position settings
  - Blueprint selection and content editing
  - Generate button triggers ASS code generation

- `TabelkaSettingsPanel.tsx` - Left panel controls
  - Resolution preset selector (1080p, 4K, Cinema variants)
  - Custom resolution inputs
  - Position toggle (Left/Right)
  - Blueprint/template selection dropdown
  - Editable content fields (title, description, content lines)
  - Content font size slider
  - Generate button

- `TabelkaPreview.tsx` - Right panel SVG preview
  - Real-time preview of table overlay
  - Background image upload/removal
  - Scaled positioning based on resolution

- `TabelkaOutput.tsx` - Collapsible output section
  - Generated ASS code for table
  - Generated ASS code for logo
  - Copy to clipboard buttons

### Core Libraries

**Location:** `src/lib/`

- `tabelka-blueprints.ts` - Blueprint definitions and utilities
  - 9 preset blueprints (AnimeGATE, AnimeSubs.info, Biblioteka Nyaa, etc.)
  - 5 resolution presets
  - localStorage functions for saving/loading custom content
  - `TabelkaBlueprint` interface with id, name, title, description, content, contentFontSize

- `tabelka-generator.ts` - ASS code generation
  - `generateTabelka()` - Creates ASS dialogue lines for table
  - `generateLogo()` - Creates AnimeGATE logo overlay
  - `calculateScaledValues()` - Calculates scaled positioning
  - `extractPlainText()` - Strips ASS tags for preview
  - ASS template with style definitions and placeholders

### IPC Communication Pattern

Centralized in `src/helpers/ipc/`:

**Current IPC Features:**
- `theme/` - Theme management (dark/light/system)
- `window/` - Window controls (minimize/maximize/close)
- `debug/` - Debug logging system
- `updater/` - Auto-updater events and commands

### Routes

TanStack Router with memory-based history:
- `/` (root) - Renders `Tabelka` component

### Theme System

- Light/dark/system modes
- Persistent storage via IPC
- oklch color space (Tailwind CSS 4)
- `syncThemeWithLocal()` helper

### Internationalization

i18next with Polish and English:
- Configuration: `src/localization/i18n.ts`
- Translation keys prefixed with `tabelka.*` for main functionality
- Helper: `updateAppLanguage()` in `language_helpers.ts`

### UI Components

- **shadcn-ui**: `src/components/ui/`
  - Button, Card, Input, Label, RadioGroup, Select
  - Slider, Textarea, ScrollArea, Separator
  - Collapsible, Checkbox, Dialog, Tabs
- **Tailwind CSS 4**: Utility-first with oklch colors
- **Lucide React**: Icon library

### Auto-Update System

electron-updater + NSIS with custom React UI:
- Core: `src/helpers/updater/auto-updater.ts`
- UI: `src/components/UpdateDialog.tsx`
- History: `src/components/ChangelogHistoryDialog.tsx`
- Checks 3 seconds after start, then hourly

**Publishing:**
1. Bump version in `package.json`
2. Run `pnpm run publish`
3. Publish draft GitHub release with release notes

### Debug Mode

Enable with `pnpm run start:debug` or `--debug` flag in production.

Features:
- Separate debug console window
- Colored logs by category
- Auto-open DevTools
- Export logs

## Development Notes

### Adding New Blueprint

1. Edit `src/lib/tabelka-blueprints.ts`
2. Add to `TABELKA_BLUEPRINTS` array:
   ```typescript
   {
     id: "unique-id",
     name: "Display Name",
     title: "\\N{\\b1}Title{\\b0}\\N",  // ASS-formatted
     description: "{\\c&H808080&}Description",
     content: "Content\\NWith\\NLines",
     contentFontSize: 35,
   }
   ```

### Modifying ASS Output

Edit `src/lib/tabelka-generator.ts`:
- `TABELKA_TEMPLATE` - Base ASS template with styles
- `generateTabelka()` - Main table generation logic
- `generateLogo()` - Logo overlay generation

### Adding Translation Keys

1. Edit `src/localization/i18n.ts`
2. Add key to both `pl` and `en` translations under `tabelka.*` namespace
3. Use with `const { t } = useTranslation(); t('tabelka.key')`

## Important Notes

- **NOT using Electron Forge** - Uses electron-builder
- **Context isolation enabled** - Always use contextBridge
- **React Compiler enabled** - Automatic optimization
- **Single route app** - Tabelka is the only feature at root `/`
- **localStorage persistence** - Blueprint content saved per-blueprint ID
