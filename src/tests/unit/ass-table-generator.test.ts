/**
 * Unit tests for ass-table-generator.ts
 */

import { describe, it, expect } from "vitest";
import {
  generateASSTable,
  generateLogo,
  calculateScaledValues,
  stripAssTags,
  extractPlainText,
} from "@/lib/ass-table-generator";
import { TableSide } from "@/lib/constants";

describe("ass-table-generator", () => {
  // ===========================================================================
  // generateASSTable tests
  // ===========================================================================
  describe("generateASSTable", () => {
    const validConfig = {
      width: 1920,
      height: 1080,
      side: TableSide.Left,
      title: "Test Title",
      content: "Test Content",
      description: "Test Description",
      groupName: "TestGroup",
    };

    it("should generate valid ASS output for left side", () => {
      const result = generateASSTable(validConfig);

      expect(result).toContain("Dialogue:");
      expect(result).toContain("AnimeGate");
      expect(result).toContain("LEFT");
      expect(result).toContain("TestGroup");
      expect(result).toContain("Test Title");
      expect(result).toContain("Test Content");
      expect(result).toContain("Test Description");
    });

    it("should generate valid ASS output for right side", () => {
      const result = generateASSTable({
        ...validConfig,
        side: TableSide.Right,
      });

      expect(result).toContain("RIGHT");
      expect(result).not.toContain("LEFT");
    });

    it("should include all required dialogue lines", () => {
      const result = generateASSTable(validConfig);
      const lines = result.split("\n");

      // Should have 5 dialogue lines: BG, Border, Title, Content, DSC
      expect(lines.length).toBe(5);
      expect(lines[0]).toContain("BG");
      expect(lines[1]).toContain("Border");
      expect(lines[2]).toContain("Title");
      expect(lines[3]).toContain("Content");
      expect(lines[4]).toContain("DSC");
    });

    it("should include fade effects", () => {
      const result = generateASSTable(validConfig);

      expect(result).toContain("\\fade(");
    });

    it("should include position tags", () => {
      const result = generateASSTable(validConfig);

      expect(result).toContain("\\pos(");
      expect(result).toContain("\\fscx");
      expect(result).toContain("\\fscy");
    });

    it("should convert newlines to ASS format", () => {
      const result = generateASSTable({
        ...validConfig,
        content: "Line 1\nLine 2\r\nLine 3",
      });

      // Content should have \\N escape sequences
      expect(result).toContain("Line 1\\NLine 2\\NLine 3");
    });

    it("should throw error for invalid config", () => {
      expect(() =>
        generateASSTable({
          ...validConfig,
          width: 100, // Below minimum
        })
      ).toThrow("Invalid ASS table config");
    });

    it("should throw error for missing required fields", () => {
      expect(() =>
        generateASSTable({
          ...validConfig,
          groupName: "", // Empty group name
        })
      ).toThrow();
    });

    it("should scale correctly for 4K resolution", () => {
      const result1080 = generateASSTable(validConfig);
      const result4K = generateASSTable({
        ...validConfig,
        width: 3840,
        height: 2160,
      });

      // 4K should have larger scale values
      const match1080 = result1080.match(/\\fscx(\d+\.?\d*)/);
      const match4K = result4K.match(/\\fscx(\d+\.?\d*)/);

      expect(match1080).not.toBeNull();
      expect(match4K).not.toBeNull();

      if (match1080 && match4K) {
        const scale1080 = parseFloat(match1080[1]);
        const scale4K = parseFloat(match4K[1]);
        expect(scale4K).toBeGreaterThan(scale1080);
      }
    });
  });

  // ===========================================================================
  // generateLogo tests
  // ===========================================================================
  describe("generateLogo", () => {
    it("should generate valid ASS dialogue line", () => {
      const result = generateLogo({ width: 1920, height: 1080 });

      expect(result).toContain("Dialogue:");
      expect(result).toContain("Logo");
      expect(result).toContain("\\p1");
    });

    it("should use scale 7 for 1080p", () => {
      const result = generateLogo({ width: 1920, height: 1080 });

      expect(result).toContain("\\fscx7");
      expect(result).toContain("\\fscy7");
    });

    it("should use scale 14 for 4K", () => {
      const result = generateLogo({ width: 3840, height: 2160 });

      expect(result).toContain("\\fscx14");
      expect(result).toContain("\\fscy14");
    });

    it("should throw error for invalid config", () => {
      expect(() => generateLogo({ width: 100, height: 100 })).toThrow();
    });
  });

  // ===========================================================================
  // calculateScaledValues tests
  // ===========================================================================
  describe("calculateScaledValues", () => {
    it("should calculate correct values for 1080p left side", () => {
      const scaled = calculateScaledValues(1920, 1080, false);

      expect(parseFloat(scaled.scaleX)).toBeCloseTo(60, 1);
      expect(parseFloat(scaled.scaleY)).toBeCloseTo(60, 1);
      expect(parseFloat(scaled.posX)).toBeGreaterThan(0);
      expect(parseFloat(scaled.posY)).toBeGreaterThan(0);
    });

    it("should have different posX for left vs right side", () => {
      const leftScaled = calculateScaledValues(1920, 1080, false);
      const rightScaled = calculateScaledValues(1920, 1080, true);

      expect(parseFloat(rightScaled.posX)).toBeGreaterThan(
        parseFloat(leftScaled.posX)
      );
    });

    it("should scale proportionally with height", () => {
      const scaled1080 = calculateScaledValues(1920, 1080, false);
      const scaled4K = calculateScaledValues(3840, 2160, false);

      // 4K is 2x 1080p height, so scale should be 2x
      expect(parseFloat(scaled4K.scaleX)).toBeCloseTo(
        parseFloat(scaled1080.scaleX) * 2,
        1
      );
    });

    it("should return string values with proper formatting", () => {
      const scaled = calculateScaledValues(1920, 1080, false);

      // Values should not have trailing zeros
      expect(scaled.scaleX).not.toMatch(/\.0+$/);
      expect(scaled.posX).not.toMatch(/\.0+$/);
    });

    it("should calculate clip regions correctly", () => {
      const scaled = calculateScaledValues(1920, 1080, false);

      // Clip left should be less than clip right
      expect(parseFloat(scaled.clipLeft)).toBeLessThan(
        parseFloat(scaled.clipRight)
      );
      // Clip top should be less than clip bottom
      expect(parseFloat(scaled.clipTop)).toBeLessThan(
        parseFloat(scaled.clipBottom)
      );
    });
  });

  // ===========================================================================
  // Utility function tests
  // ===========================================================================
  describe("stripAssTags", () => {
    it("should remove single ASS tag", () => {
      const input = "{\\b1}Bold text";
      const result = stripAssTags(input);
      expect(result).toBe("Bold text");
    });

    it("should remove multiple ASS tags", () => {
      const input = "{\\b1}{\\i1}Bold and italic{\\b0}{\\i0}";
      const result = stripAssTags(input);
      expect(result).toBe("Bold and italic");
    });

    it("should handle complex ASS tags", () => {
      const input = "{\\fscx60\\fscy60\\pos(270,880)}Text content";
      const result = stripAssTags(input);
      expect(result).toBe("Text content");
    });

    it("should preserve non-tag content", () => {
      const input = "Plain text without tags";
      const result = stripAssTags(input);
      expect(result).toBe("Plain text without tags");
    });

    it("should trim whitespace", () => {
      const input = "{\\b1}  Text with spaces  ";
      const result = stripAssTags(input);
      expect(result).toBe("Text with spaces");
    });
  });

  describe("extractPlainText", () => {
    it("should extract plain text from ASS formatted string", () => {
      const input = "{\\b1}Some text";
      const result = extractPlainText(input);
      expect(result).toBe("Some text");
    });

    it("should convert \\N to newlines", () => {
      const input = "Line 1\\NLine 2";
      const result = extractPlainText(input);
      expect(result).toBe("Line 1\nLine 2");
    });

    it("should convert \\n to newlines", () => {
      const input = "Line 1\\nLine 2";
      const result = extractPlainText(input);
      expect(result).toBe("Line 1\nLine 2");
    });

    it("should convert \\h to spaces", () => {
      const input = "Word1\\hWord2";
      const result = extractPlainText(input);
      expect(result).toBe("Word1 Word2");
    });

    it("should handle combined ASS formatting", () => {
      const input = "{\\b1\\fscx50}Text\\NNew line\\hmore";
      const result = extractPlainText(input);
      expect(result).toBe("Text\nNew line more");
    });
  });
});
