/**
 * Constants and enums for AG-Tabelki
 * Single source of truth for all magic values
 */

// ============================================================================
// ENUMS
// ============================================================================

/** Table position on screen */
export enum TableSide {
  Left = "left",
  Right = "right",
}

/** Resolution preset identifiers */
export enum ResolutionPresetId {
  FullHD = "1080p",
  FullHDCinema = "1080p-cinema",
  UHD4K = "4k",
  UHD4KCinema = "4k-cinema",
  Custom = "custom",
}

/** Blueprint identifiers */
export enum BlueprintId {
  AnimeGate = "animegate",
  AnimeSubsInfo = "animesubs-info",
  BibliotekaNyaa = "biblioteka-nyaa",
  DemoSubs = "demo-subs",
  DesuOnline = "desu-online",
  FrixySubs = "frixysubs",
  LycorisCafe = "lycoriscafe",
  Shisha = "shisha",
  Custom = "custom",
}

// ============================================================================
// STORAGE KEYS
// ============================================================================

export const STORAGE_KEYS = {
  /** LocalStorage key for saving blueprint content */
  BLUEPRINT_CONTENT: "tabelka-blueprint-content",
} as const;

// ============================================================================
// DEFAULT VALUES
// ============================================================================

export const DEFAULTS = {
  /** Default blueprint to use on first load */
  BLUEPRINT_ID: BlueprintId.AnimeGate,

  /** Default resolution preset */
  RESOLUTION_PRESET_ID: ResolutionPresetId.FullHD,

  /** Default table position */
  SIDE: TableSide.Left,

  /** Default content font size */
  CONTENT_FONT_SIZE: 70,

  /** Font size range */
  FONT_SIZE_MIN: 30,
  FONT_SIZE_MAX: 150,
  FONT_SIZE_STEP: 1,
} as const;

// ============================================================================
// ASS GENERATOR CONSTANTS
// ============================================================================

export const ASS_CONFIG = {
  /** Base resolution for scaling calculations (Full HD) */
  BASE_WIDTH: 1920,
  BASE_HEIGHT: 1080,

  /** Base scale factors for table elements */
  BASE_SCALE_X: 60,
  BASE_SCALE_Y: 60,

  /** Base Y positions for table elements (at 1080p) */
  BASE_POS_Y: 880,
  BASE_POS_Y_TITLE: 780,
  BASE_POS_Y_CONTENT: 900,
  BASE_POS_Y_DESCRIPTION: 1020,

  /** Base positions for scrolling content (unused but preserved) */
  BASE_POS_Y_TOP: 1200,
  BASE_POS_Y_BOTTOM: 700,

  /** Base X positions for left/right alignment */
  BASE_POS_X_LEFT: 270,
  BASE_POS_X_RIGHT_OFFSET: 1630, // Subtract widthDiff from this

  /** Clip rectangle base values */
  CLIP: {
    LEFT_START: 0,
    LEFT_END: 560,
    RIGHT_START_OFFSET: 1360, // Subtract widthDiff from this
    RIGHT_END_OFFSET: 1920, // Subtract widthDiff from this
    TOP: 810,
    BOTTOM: 1000,
  },

  /** Threshold for 4K vs 1080p logo scaling */
  LOGO_4K_THRESHOLD: 1920,

  /** Logo scale factors */
  LOGO_SCALE_1080P: 7,
  LOGO_SCALE_4K: 14,

  /** Animation timing (in ASS time format) */
  TIMING: {
    START: "0:00:00.00",
    END: "0:00:15.00",
    LOGO_END: "9:59:59.99",
    FADE_IN_START: 0,
    FADE_IN_END: 1000,
    FADE_OUT_START: 14000,
    FADE_OUT_END: 15000,
  },
} as const;

// ============================================================================
// RESOLUTION PRESETS
// ============================================================================

export const RESOLUTION_VALUES = {
  [ResolutionPresetId.FullHD]: { width: 1920, height: 1080 },
  [ResolutionPresetId.FullHDCinema]: { width: 1920, height: 820 },
  [ResolutionPresetId.UHD4K]: { width: 3840, height: 2160 },
  [ResolutionPresetId.UHD4KCinema]: { width: 3840, height: 1640 },
  [ResolutionPresetId.Custom]: { width: 1920, height: 1080 },
} as const;

// ============================================================================
// VALIDATION LIMITS
// ============================================================================

export const LIMITS = {
  /** Minimum resolution dimensions */
  MIN_WIDTH: 640,
  MIN_HEIGHT: 360,

  /** Maximum resolution dimensions */
  MAX_WIDTH: 7680,
  MAX_HEIGHT: 4320,

  /** Maximum text lengths */
  MAX_TITLE_LENGTH: 500,
  MAX_CONTENT_LENGTH: 2000,
  MAX_DESCRIPTION_LENGTH: 500,
} as const;
