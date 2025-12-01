/**
 * Blueprint definitions for the ASS Table Generator
 * Each blueprint contains styling templates - user provides the text content
 */

import { BlueprintId, ResolutionPresetId, STORAGE_KEYS, RESOLUTION_VALUES } from "./constants";

// ============================================================================
// TYPES
// ============================================================================

export interface Blueprint {
  id: BlueprintId | string;
  name: string;
  /** Style prefix for title (applied before user text) */
  titleStyle: string;
  /** Style prefix for content */
  contentStyle: string;
  /** Style prefix for description */
  descriptionStyle: string;
  /** Default values for new users */
  defaults: {
    title: string;
    content: string;
    description: string;
  };
}

export interface ResolutionPreset {
  id: ResolutionPresetId | string;
  name: string;
  width: number;
  height: number;
}

export interface SavedBlueprintContent {
  [blueprintId: string]: {
    title: string;
    content: string;
    description: string;
  };
}

// ============================================================================
// BLUEPRINT DATA
// ============================================================================

export const BLUEPRINTS: Blueprint[] = [
  {
    id: BlueprintId.AnimeGate,
    name: "AnimeGATE",
    titleStyle: String.raw`{\4c&H75605D&\3c&H57423F&\1c&HFFBE74&\3a&H00&\fnTahoma\b1\fs89}`,
    contentStyle: String.raw`{\4c&H75605D&\3c&H57423F&\1c&HFFBE74&\3a&H00&\fnTahoma\b1\fs108}`,
    descriptionStyle: String.raw`{\4c&H75605D&\3c&H57423F&\1c&HFFBE74&\3a&H00&\fnTahoma\b1\fs48}`,
    defaults: {
      title: "AnimeGATE",
      content: "Lektor: osoba",
      description: "Discord: discord.gg/AnimeGate",
    },
  },
  {
    id: BlueprintId.AnimeSubsInfo,
    name: "AnimeSubs.info",
    titleStyle: String.raw`{\4c&H75605D&\3c&H310E61&\1c&HFFBE74&\3a&H00&\fnTahoma\b1\fs76}`,
    contentStyle: String.raw`{\fnTahoma\b1\fs58}`,
    descriptionStyle: String.raw`{\fnTahoma\b1\fs48}`,
    defaults: {
      title: "AnimeSubs.info",
      content: "Tłumacz: osoba",
      description: "Strona: AnimeSubs.info",
    },
  },
  {
    id: BlueprintId.BibliotekaNyaa,
    name: "Biblioteka Nyaa",
    titleStyle: String.raw`{\2c&H275886&\4c&H0C0B0B&\3c&H4AA0B3&\1c&H275BDE&\3a&H00&\fnTahoma\b1\fs66}`,
    contentStyle: String.raw`{\2c&H2D5ACE&\4c&H25C596&\3c&H000000&\1c&H0000FF&\3a&H00&\fnTahoma\b1\fs58}`,
    descriptionStyle: String.raw`{\4c&H4D5053&\3c&H000000&\1c&H0559F1&\3a&H00&\fnTahoma\b1\fs48}`,
    defaults: {
      title: "Biblioteka Nyaa",
      content: "Tłumacz: osoba",
      description: "Strona: https://nyaa.si/",
    },
  },
  {
    id: BlueprintId.DemoSubs,
    name: "Demo Subs",
    titleStyle: String.raw`{\4c&H75605D&\3c&H0D0D5A&\1c&H4B4CE6&\3a&H00&\fnTahoma\b1\fs89}`,
    contentStyle: String.raw`{\4c&H75605D&\3c&H0D0D5A&\1c&H4B4CE6&\3a&H00&\fnTahoma\b1\fs58}`,
    descriptionStyle: String.raw`{\4c&H75605D&\3c&H0D0D5A&\1c&H4B4CE6&\3a&H00&\fnTahoma\b1\fs48}`,
    defaults: {
      title: "Demo Subs",
      content: "Tłumacz: osoba",
      description: "Discord: discord.gg/demosubs",
    },
  },
  {
    id: BlueprintId.DesuOnline,
    name: "Desu-Online",
    titleStyle: String.raw`{\bord5\4c&H75605D&\3c&HB27733&\1c&HEDEDED&\3a&H00&\fnTahoma\b1\fs89}`,
    contentStyle: String.raw`{\bord5\4c&H75605D&\3c&HB27733&\1c&HEDEDED&\3a&H00&\fnTahoma\b1\fs58}`,
    descriptionStyle: String.raw`{\bord5\4c&H75605D&\3c&HB27733&\1c&HEDEDED&\3a&H00&\fnTahoma\b1\fs48}`,
    defaults: {
      title: "Desu-Online",
      content: "Tłumacz: osoba",
      description: "Discord: discord.gg/fuFwbwjDNV",
    },
  },
  {
    id: BlueprintId.FrixySubs,
    name: "FrixySubs",
    titleStyle: String.raw`{\4c&H75605D&\3c&H052D39&\1c&H1DADFF&\3a&H00&\fnTahoma\b1\fs89}`,
    contentStyle: String.raw`{\4c&H75605D&\3c&H052D39&\1c&H1DADFF&\3a&H00&\fnTahoma\b1\fs58}`,
    descriptionStyle: String.raw`{\4c&H75605D&\3c&H052D39&\1c&H1DADFF&\3a&H00&\fnTahoma\b1\fs48}`,
    defaults: {
      title: "FrixySubs",
      content: "Tłumacz: osoba",
      description: "Discord: discord.gg/frixysubs",
    },
  },
  {
    id: BlueprintId.LycorisCafe,
    name: "LycorisCafe",
    titleStyle: String.raw`{\4c&H75605D&\3c&H310E61&\1c&H7646FF&\3a&H00&\fnTahoma\b1\fs89}`,
    contentStyle: String.raw`{\4c&H75605D&\3c&H310E61&\1c&H7646FF&\3a&H00&\fnTahoma\b1\fs58}`,
    descriptionStyle: String.raw`{\4c&H75605D&\3c&H310E61&\1c&H7646FF&\3a&H00&\fnTahoma\b1\fs48}`,
    defaults: {
      title: "LycorisCafe",
      content: "Tłumacz: osoba",
      description: "Discord: discord.gg/54ea46RHxb",
    },
  },
  {
    id: BlueprintId.Shisha,
    name: "Shisha",
    titleStyle: String.raw`{\4c&H75605D&\3c&H60660C&\1c&HFFFC8A&\3a&H00&\fnTahoma\b1\fs89}`,
    contentStyle: String.raw`{\4c&H75605D&\3c&H60660C&\1c&HFFFC8A&\3a&H00&\fnTahoma\b1\fs58}`,
    descriptionStyle: String.raw`{\4c&H75605D&\3c&H60660C&\1c&HFFFC8A&\3a&H00&\fnTahoma\b1\fs48}`,
    defaults: {
      title: "Shisha",
      content: "Tłumacz: osoba",
      description: "Discord: discord.gg/szisza",
    },
  },
  {
    id: BlueprintId.Custom,
    name: "Własny",
    titleStyle: String.raw`{\4c&H75605D&\3c&H57423F&\1c&HFFBE74&\3a&H00&\fnTahoma\b1\fs89}`,
    contentStyle: String.raw`{\4c&H75605D&\3c&H57423F&\1c&HFFBE74&\3a&H00&\fnTahoma\b1\fs108}`,
    descriptionStyle: String.raw`{\4c&H75605D&\3c&H57423F&\1c&HFFBE74&\3a&H00&\fnTahoma\b1\fs48}`,
    defaults: {
      title: "Nazwa Grupy",
      content: "Tłumacz: osoba",
      description: "Discord: discord.gg/...",
    },
  },
];

// ============================================================================
// RESOLUTION PRESETS
// ============================================================================

export const RESOLUTION_PRESETS: ResolutionPreset[] = [
  {
    id: ResolutionPresetId.FullHD,
    name: "1920x1080 (Full HD)",
    ...RESOLUTION_VALUES[ResolutionPresetId.FullHD],
  },
  {
    id: ResolutionPresetId.FullHDCinema,
    name: "1920x820 (Kinowe 1080p)",
    ...RESOLUTION_VALUES[ResolutionPresetId.FullHDCinema],
  },
  {
    id: ResolutionPresetId.UHD4K,
    name: "3840x2160 (4K)",
    ...RESOLUTION_VALUES[ResolutionPresetId.UHD4K],
  },
  {
    id: ResolutionPresetId.UHD4KCinema,
    name: "3840x1640 (Kinowe 4K)",
    ...RESOLUTION_VALUES[ResolutionPresetId.UHD4KCinema],
  },
  {
    id: ResolutionPresetId.Custom,
    name: "Własne",
    ...RESOLUTION_VALUES[ResolutionPresetId.Custom],
  },
];

// ============================================================================
// HELPER FUNCTIONS
// ============================================================================

/**
 * Get a blueprint by ID
 */
export function getBlueprintById(id: string): Blueprint | undefined {
  return BLUEPRINTS.find((bp) => bp.id === id);
}

/**
 * Get a resolution preset by ID
 */
export function getResolutionPresetById(id: string): ResolutionPreset | undefined {
  return RESOLUTION_PRESETS.find((preset) => preset.id === id);
}

// ============================================================================
// LOCALSTORAGE PERSISTENCE
// ============================================================================

/**
 * Load saved content for all blueprints from localStorage
 */
export function loadSavedContent(): SavedBlueprintContent {
  try {
    const saved = localStorage.getItem(STORAGE_KEYS.BLUEPRINT_CONTENT);
    if (saved) {
      return JSON.parse(saved);
    }
  } catch (e) {
    console.error("Failed to load saved blueprint content:", e);
  }
  return {};
}

/**
 * Save content for a specific blueprint to localStorage
 */
export function saveContentForBlueprint(
  blueprintId: string,
  content: { title: string; content: string; description: string }
): void {
  try {
    const saved = loadSavedContent();
    saved[blueprintId] = content;
    localStorage.setItem(STORAGE_KEYS.BLUEPRINT_CONTENT, JSON.stringify(saved));
  } catch (e) {
    console.error("Failed to save blueprint content:", e);
  }
}

/**
 * Get content for a blueprint (saved or default)
 */
export function getContentForBlueprint(blueprintId: string): {
  title: string;
  content: string;
  description: string;
} {
  const saved = loadSavedContent();
  if (saved[blueprintId]) {
    return saved[blueprintId];
  }

  const blueprint = getBlueprintById(blueprintId);
  if (blueprint) {
    return blueprint.defaults;
  }

  // Fallback for unknown blueprints
  return {
    title: "Nazwa Grupy",
    content: "Zawartość",
    description: "Opis",
  };
}
