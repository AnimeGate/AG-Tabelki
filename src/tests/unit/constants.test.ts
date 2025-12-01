/**
 * Unit tests for constants.ts
 */

import { describe, it, expect } from "vitest";
import {
  TableSide,
  ResolutionPresetId,
  BlueprintId,
  STORAGE_KEYS,
  DEFAULTS,
  ASS_CONFIG,
  RESOLUTION_VALUES,
  LIMITS,
} from "@/lib/constants";

describe("constants", () => {
  // ===========================================================================
  // Enum tests
  // ===========================================================================
  describe("TableSide enum", () => {
    it("should have left and right values", () => {
      expect(TableSide.Left).toBe("left");
      expect(TableSide.Right).toBe("right");
    });
  });

  describe("ResolutionPresetId enum", () => {
    it("should have all expected presets", () => {
      expect(ResolutionPresetId.FullHD).toBe("1080p");
      expect(ResolutionPresetId.FullHDCinema).toBe("1080p-cinema");
      expect(ResolutionPresetId.UHD4K).toBe("4k");
      expect(ResolutionPresetId.UHD4KCinema).toBe("4k-cinema");
      expect(ResolutionPresetId.Custom).toBe("custom");
    });
  });

  describe("BlueprintId enum", () => {
    it("should have all expected blueprints", () => {
      expect(BlueprintId.AnimeGate).toBe("animegate");
      expect(BlueprintId.Custom).toBe("custom");
      // Check a few more
      expect(BlueprintId.FrixySubs).toBeDefined();
      expect(BlueprintId.DesuOnline).toBeDefined();
    });
  });

  // ===========================================================================
  // Storage keys tests
  // ===========================================================================
  describe("STORAGE_KEYS", () => {
    it("should have blueprint content key", () => {
      expect(STORAGE_KEYS.BLUEPRINT_CONTENT).toBe("tabelka-blueprint-content");
    });
  });

  // ===========================================================================
  // Defaults tests
  // ===========================================================================
  describe("DEFAULTS", () => {
    it("should have valid default blueprint ID", () => {
      expect(DEFAULTS.BLUEPRINT_ID).toBe(BlueprintId.AnimeGate);
    });

    it("should have valid default resolution preset", () => {
      expect(DEFAULTS.RESOLUTION_PRESET_ID).toBe(ResolutionPresetId.FullHD);
    });

    it("should have valid default side", () => {
      expect(DEFAULTS.SIDE).toBe(TableSide.Left);
    });

    it("should have valid font size range", () => {
      expect(DEFAULTS.FONT_SIZE_MIN).toBeLessThan(DEFAULTS.FONT_SIZE_MAX);
      expect(DEFAULTS.CONTENT_FONT_SIZE).toBeGreaterThanOrEqual(DEFAULTS.FONT_SIZE_MIN);
      expect(DEFAULTS.CONTENT_FONT_SIZE).toBeLessThanOrEqual(DEFAULTS.FONT_SIZE_MAX);
    });
  });

  // ===========================================================================
  // ASS_CONFIG tests
  // ===========================================================================
  describe("ASS_CONFIG", () => {
    it("should have base resolution values", () => {
      expect(ASS_CONFIG.BASE_WIDTH).toBe(1920);
      expect(ASS_CONFIG.BASE_HEIGHT).toBe(1080);
    });

    it("should have base scale factors", () => {
      expect(ASS_CONFIG.BASE_SCALE_X).toBeGreaterThan(0);
      expect(ASS_CONFIG.BASE_SCALE_Y).toBeGreaterThan(0);
    });

    it("should have position values", () => {
      expect(ASS_CONFIG.BASE_POS_Y).toBeGreaterThan(0);
      expect(ASS_CONFIG.BASE_POS_Y_TITLE).toBeGreaterThan(0);
      expect(ASS_CONFIG.BASE_POS_Y_CONTENT).toBeGreaterThan(0);
      expect(ASS_CONFIG.BASE_POS_Y_DESCRIPTION).toBeGreaterThan(0);
    });

    it("should have clip configuration", () => {
      expect(ASS_CONFIG.CLIP).toBeDefined();
      expect(ASS_CONFIG.CLIP.LEFT_START).toBeDefined();
      expect(ASS_CONFIG.CLIP.LEFT_END).toBeDefined();
      expect(ASS_CONFIG.CLIP.TOP).toBeDefined();
      expect(ASS_CONFIG.CLIP.BOTTOM).toBeDefined();
    });

    it("should have logo scale thresholds", () => {
      expect(ASS_CONFIG.LOGO_4K_THRESHOLD).toBe(1920);
      expect(ASS_CONFIG.LOGO_SCALE_1080P).toBe(7);
      expect(ASS_CONFIG.LOGO_SCALE_4K).toBe(14);
    });

    it("should have timing configuration", () => {
      expect(ASS_CONFIG.TIMING.START).toBe("0:00:00.00");
      expect(ASS_CONFIG.TIMING.END).toBe("0:00:15.00");
      expect(ASS_CONFIG.TIMING.LOGO_END).toBeDefined();
    });
  });

  // ===========================================================================
  // Resolution values tests
  // ===========================================================================
  describe("RESOLUTION_VALUES", () => {
    it("should have 1080p values", () => {
      expect(RESOLUTION_VALUES[ResolutionPresetId.FullHD]).toEqual({
        width: 1920,
        height: 1080,
      });
    });

    it("should have 4K values", () => {
      expect(RESOLUTION_VALUES[ResolutionPresetId.UHD4K]).toEqual({
        width: 3840,
        height: 2160,
      });
    });

    it("should have cinema aspect ratios with correct width", () => {
      expect(RESOLUTION_VALUES[ResolutionPresetId.FullHDCinema].width).toBe(1920);
      expect(RESOLUTION_VALUES[ResolutionPresetId.UHD4KCinema].width).toBe(3840);

      // Cinema ratios should have smaller height
      expect(RESOLUTION_VALUES[ResolutionPresetId.FullHDCinema].height).toBeLessThan(1080);
      expect(RESOLUTION_VALUES[ResolutionPresetId.UHD4KCinema].height).toBeLessThan(2160);
    });
  });

  // ===========================================================================
  // Limits tests
  // ===========================================================================
  describe("LIMITS", () => {
    it("should have dimension limits", () => {
      expect(LIMITS.MIN_WIDTH).toBeGreaterThan(0);
      expect(LIMITS.MIN_HEIGHT).toBeGreaterThan(0);
      expect(LIMITS.MAX_WIDTH).toBeGreaterThan(LIMITS.MIN_WIDTH);
      expect(LIMITS.MAX_HEIGHT).toBeGreaterThan(LIMITS.MIN_HEIGHT);
    });

    it("should have text length limits", () => {
      expect(LIMITS.MAX_TITLE_LENGTH).toBeGreaterThan(0);
      expect(LIMITS.MAX_CONTENT_LENGTH).toBeGreaterThan(0);
      expect(LIMITS.MAX_DESCRIPTION_LENGTH).toBeGreaterThan(0);
    });

    it("should allow common resolutions", () => {
      // 720p
      expect(LIMITS.MIN_WIDTH).toBeLessThanOrEqual(1280);
      expect(LIMITS.MIN_HEIGHT).toBeLessThanOrEqual(720);

      // 8K
      expect(LIMITS.MAX_WIDTH).toBeGreaterThanOrEqual(7680);
      expect(LIMITS.MAX_HEIGHT).toBeGreaterThanOrEqual(4320);
    });
  });
});
