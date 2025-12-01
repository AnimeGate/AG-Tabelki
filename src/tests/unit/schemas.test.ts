/**
 * Unit tests for schemas.ts
 */

import { describe, it, expect } from "vitest";
import {
  dimensionSchema,
  fontSizeSchema,
  tableSideSchema,
  titleSchema,
  contentSchema,
  descriptionSchema,
  assTableConfigSchema,
  logoConfigSchema,
  validateASSTableConfig,
  validateLogoConfig,
} from "@/lib/schemas";
import { TableSide, LIMITS, DEFAULTS } from "@/lib/constants";

describe("schemas", () => {
  // ===========================================================================
  // Primitive schema tests
  // ===========================================================================
  describe("dimensionSchema", () => {
    it("should accept valid dimensions", () => {
      expect(dimensionSchema.safeParse(1920).success).toBe(true);
      expect(dimensionSchema.safeParse(3840).success).toBe(true);
      expect(dimensionSchema.safeParse(LIMITS.MIN_WIDTH).success).toBe(true);
      expect(dimensionSchema.safeParse(LIMITS.MAX_WIDTH).success).toBe(true);
    });

    it("should reject dimensions below minimum", () => {
      const result = dimensionSchema.safeParse(LIMITS.MIN_WIDTH - 1);
      expect(result.success).toBe(false);
    });

    it("should reject dimensions above maximum", () => {
      const result = dimensionSchema.safeParse(LIMITS.MAX_WIDTH + 1);
      expect(result.success).toBe(false);
    });

    it("should reject non-integer values", () => {
      expect(dimensionSchema.safeParse(1920.5).success).toBe(false);
    });

    it("should reject non-numbers", () => {
      expect(dimensionSchema.safeParse("1920").success).toBe(false);
    });
  });

  describe("fontSizeSchema", () => {
    it("should accept valid font sizes", () => {
      expect(fontSizeSchema.safeParse(70).success).toBe(true);
      expect(fontSizeSchema.safeParse(DEFAULTS.FONT_SIZE_MIN).success).toBe(true);
      expect(fontSizeSchema.safeParse(DEFAULTS.FONT_SIZE_MAX).success).toBe(true);
    });

    it("should reject font sizes below minimum", () => {
      const result = fontSizeSchema.safeParse(DEFAULTS.FONT_SIZE_MIN - 1);
      expect(result.success).toBe(false);
    });

    it("should reject font sizes above maximum", () => {
      const result = fontSizeSchema.safeParse(DEFAULTS.FONT_SIZE_MAX + 1);
      expect(result.success).toBe(false);
    });
  });

  describe("tableSideSchema", () => {
    it("should accept valid table sides", () => {
      expect(tableSideSchema.safeParse(TableSide.Left).success).toBe(true);
      expect(tableSideSchema.safeParse(TableSide.Right).success).toBe(true);
      expect(tableSideSchema.safeParse("left").success).toBe(true);
      expect(tableSideSchema.safeParse("right").success).toBe(true);
    });

    it("should reject invalid values", () => {
      expect(tableSideSchema.safeParse("center").success).toBe(false);
      expect(tableSideSchema.safeParse("top").success).toBe(false);
    });
  });

  // ===========================================================================
  // Content schema tests
  // ===========================================================================
  describe("titleSchema", () => {
    it("should accept valid titles", () => {
      expect(titleSchema.safeParse("AnimeGATE").success).toBe(true);
      expect(titleSchema.safeParse("").success).toBe(true); // Empty allowed
    });

    it("should reject titles exceeding max length", () => {
      const longTitle = "a".repeat(LIMITS.MAX_TITLE_LENGTH + 1);
      expect(titleSchema.safeParse(longTitle).success).toBe(false);
    });
  });

  describe("contentSchema", () => {
    it("should accept valid content", () => {
      expect(contentSchema.safeParse("Tłumacz: Someone").success).toBe(true);
      expect(contentSchema.safeParse("").success).toBe(true);
    });

    it("should reject content exceeding max length", () => {
      const longContent = "a".repeat(LIMITS.MAX_CONTENT_LENGTH + 1);
      expect(contentSchema.safeParse(longContent).success).toBe(false);
    });
  });

  describe("descriptionSchema", () => {
    it("should accept valid descriptions", () => {
      expect(descriptionSchema.safeParse("Discord: discord.gg/test").success).toBe(true);
    });

    it("should reject descriptions exceeding max length", () => {
      const longDesc = "a".repeat(LIMITS.MAX_DESCRIPTION_LENGTH + 1);
      expect(descriptionSchema.safeParse(longDesc).success).toBe(false);
    });
  });

  // ===========================================================================
  // Composite schema tests
  // ===========================================================================
  describe("assTableConfigSchema", () => {
    const validConfig = {
      width: 1920,
      height: 1080,
      side: TableSide.Left,
      title: "Test",
      content: "Content",
      description: "Description",
      groupName: "TestGroup",
    };

    it("should accept valid config", () => {
      expect(assTableConfigSchema.safeParse(validConfig).success).toBe(true);
    });

    it("should reject config with invalid width", () => {
      const result = assTableConfigSchema.safeParse({
        ...validConfig,
        width: 100,
      });
      expect(result.success).toBe(false);
    });

    it("should reject config with invalid side", () => {
      const result = assTableConfigSchema.safeParse({
        ...validConfig,
        side: "invalid",
      });
      expect(result.success).toBe(false);
    });

    it("should reject config with empty groupName", () => {
      const result = assTableConfigSchema.safeParse({
        ...validConfig,
        groupName: "",
      });
      expect(result.success).toBe(false);
    });

    it("should reject config with missing fields", () => {
      const { title, ...incomplete } = validConfig;
      expect(assTableConfigSchema.safeParse(incomplete).success).toBe(false);
    });
  });

  describe("logoConfigSchema", () => {
    it("should accept valid config", () => {
      expect(logoConfigSchema.safeParse({ width: 1920, height: 1080 }).success).toBe(true);
      expect(logoConfigSchema.safeParse({ width: 3840, height: 2160 }).success).toBe(true);
    });

    it("should reject config with invalid dimensions", () => {
      expect(logoConfigSchema.safeParse({ width: 100, height: 100 }).success).toBe(false);
    });
  });

  // ===========================================================================
  // Validation helper tests
  // ===========================================================================
  describe("validateASSTableConfig", () => {
    const validConfig = {
      width: 1920,
      height: 1080,
      side: TableSide.Left,
      title: "Test",
      content: "Content",
      description: "Description",
      groupName: "TestGroup",
    };

    it("should return success for valid config", () => {
      const result = validateASSTableConfig(validConfig);
      expect(result.success).toBe(true);
      expect(result.data).toEqual(validConfig);
      expect(result.error).toBeUndefined();
    });

    it("should return error message for invalid config", () => {
      const result = validateASSTableConfig({ ...validConfig, width: 100 });
      expect(result.success).toBe(false);
      expect(result.error).toBeDefined();
      expect(result.data).toBeUndefined();
    });
  });

  describe("validateLogoConfig", () => {
    it("should return success for valid config", () => {
      const result = validateLogoConfig({ width: 1920, height: 1080 });
      expect(result.success).toBe(true);
      expect(result.data).toEqual({ width: 1920, height: 1080 });
    });

    it("should return error for invalid config", () => {
      const result = validateLogoConfig({ width: 100, height: 100 });
      expect(result.success).toBe(false);
      expect(result.error).toBeDefined();
    });
  });
});
