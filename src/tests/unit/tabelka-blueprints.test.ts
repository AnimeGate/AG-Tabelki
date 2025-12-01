/**
 * Unit tests for tabelka-blueprints.ts
 */

import { describe, it, expect, beforeEach } from "vitest";
import {
  BLUEPRINTS,
  RESOLUTION_PRESETS,
  getBlueprintById,
  getResolutionPresetById,
  loadSavedContent,
  saveContentForBlueprint,
  getContentForBlueprint,
} from "@/lib/tabelka-blueprints";
import { BlueprintId, ResolutionPresetId, STORAGE_KEYS } from "@/lib/constants";

describe("tabelka-blueprints", () => {
  // ===========================================================================
  // BLUEPRINTS data tests
  // ===========================================================================
  describe("BLUEPRINTS", () => {
    it("should have all required blueprint entries", () => {
      expect(BLUEPRINTS.length).toBeGreaterThan(0);

      // Check for known blueprints
      const ids = BLUEPRINTS.map((bp) => bp.id);
      expect(ids).toContain(BlueprintId.AnimeGate);
      expect(ids).toContain(BlueprintId.Custom);
    });

    it("should have valid structure for all blueprints", () => {
      BLUEPRINTS.forEach((blueprint) => {
        expect(blueprint.id).toBeDefined();
        expect(blueprint.name).toBeDefined();
        expect(blueprint.titleStyle).toBeDefined();
        expect(blueprint.contentStyle).toBeDefined();
        expect(blueprint.descriptionStyle).toBeDefined();
        expect(blueprint.defaults).toBeDefined();
        expect(blueprint.defaults.title).toBeDefined();
        expect(blueprint.defaults.content).toBeDefined();
        expect(blueprint.defaults.description).toBeDefined();
      });
    });

    it("should have ASS style tags in style strings", () => {
      BLUEPRINTS.forEach((blueprint) => {
        // Style strings should contain ASS tags like \4c, \3c, \1c, \fn, etc.
        expect(blueprint.titleStyle).toMatch(/\\/);
        expect(blueprint.contentStyle).toMatch(/\\/);
        expect(blueprint.descriptionStyle).toMatch(/\\/);
      });
    });

    it("should have unique IDs", () => {
      const ids = BLUEPRINTS.map((bp) => bp.id);
      const uniqueIds = new Set(ids);
      expect(uniqueIds.size).toBe(ids.length);
    });
  });

  // ===========================================================================
  // RESOLUTION_PRESETS data tests
  // ===========================================================================
  describe("RESOLUTION_PRESETS", () => {
    it("should have all required preset entries", () => {
      expect(RESOLUTION_PRESETS.length).toBeGreaterThan(0);

      const ids = RESOLUTION_PRESETS.map((p) => p.id);
      expect(ids).toContain(ResolutionPresetId.FullHD);
      expect(ids).toContain(ResolutionPresetId.UHD4K);
      expect(ids).toContain(ResolutionPresetId.Custom);
    });

    it("should have valid structure for all presets", () => {
      RESOLUTION_PRESETS.forEach((preset) => {
        expect(preset.id).toBeDefined();
        expect(preset.name).toBeDefined();
        expect(preset.width).toBeGreaterThan(0);
        expect(preset.height).toBeGreaterThan(0);
      });
    });

    it("should have correct 1080p dimensions", () => {
      const fullHD = RESOLUTION_PRESETS.find(
        (p) => p.id === ResolutionPresetId.FullHD
      );
      expect(fullHD?.width).toBe(1920);
      expect(fullHD?.height).toBe(1080);
    });

    it("should have correct 4K dimensions", () => {
      const uhd4k = RESOLUTION_PRESETS.find(
        (p) => p.id === ResolutionPresetId.UHD4K
      );
      expect(uhd4k?.width).toBe(3840);
      expect(uhd4k?.height).toBe(2160);
    });
  });

  // ===========================================================================
  // Helper function tests
  // ===========================================================================
  describe("getBlueprintById", () => {
    it("should return blueprint for valid ID", () => {
      const blueprint = getBlueprintById(BlueprintId.AnimeGate);
      expect(blueprint).toBeDefined();
      expect(blueprint?.id).toBe(BlueprintId.AnimeGate);
    });

    it("should return undefined for invalid ID", () => {
      const blueprint = getBlueprintById("nonexistent-id");
      expect(blueprint).toBeUndefined();
    });

    it("should return correct blueprint data", () => {
      const blueprint = getBlueprintById(BlueprintId.AnimeGate);
      expect(blueprint?.name).toBe("AnimeGATE");
    });
  });

  describe("getResolutionPresetById", () => {
    it("should return preset for valid ID", () => {
      const preset = getResolutionPresetById(ResolutionPresetId.FullHD);
      expect(preset).toBeDefined();
      expect(preset?.id).toBe(ResolutionPresetId.FullHD);
    });

    it("should return undefined for invalid ID", () => {
      const preset = getResolutionPresetById("nonexistent-id");
      expect(preset).toBeUndefined();
    });
  });

  // ===========================================================================
  // LocalStorage persistence tests
  // ===========================================================================
  describe("localStorage persistence", () => {
    beforeEach(() => {
      // Clear localStorage before each test
      localStorage.clear();
    });

    describe("loadSavedContent", () => {
      it("should return empty object when no saved content", () => {
        const content = loadSavedContent();
        expect(content).toEqual({});
      });

      it("should return saved content when available", () => {
        const testContent = {
          "test-id": {
            title: "Test Title",
            content: "Test Content",
            description: "Test Description",
          },
        };
        localStorage.setItem(
          STORAGE_KEYS.BLUEPRINT_CONTENT,
          JSON.stringify(testContent)
        );

        const content = loadSavedContent();
        expect(content).toEqual(testContent);
      });

      it("should return empty object for invalid JSON", () => {
        localStorage.setItem(STORAGE_KEYS.BLUEPRINT_CONTENT, "invalid json");
        const content = loadSavedContent();
        expect(content).toEqual({});
      });
    });

    describe("saveContentForBlueprint", () => {
      it("should save content to localStorage", () => {
        saveContentForBlueprint("test-id", {
          title: "New Title",
          content: "New Content",
          description: "New Description",
        });

        const saved = JSON.parse(
          localStorage.getItem(STORAGE_KEYS.BLUEPRINT_CONTENT) || "{}"
        );
        expect(saved["test-id"]).toEqual({
          title: "New Title",
          content: "New Content",
          description: "New Description",
        });
      });

      it("should preserve existing content when saving", () => {
        saveContentForBlueprint("id-1", {
          title: "Title 1",
          content: "Content 1",
          description: "Description 1",
        });
        saveContentForBlueprint("id-2", {
          title: "Title 2",
          content: "Content 2",
          description: "Description 2",
        });

        const saved = loadSavedContent();
        expect(saved["id-1"]).toBeDefined();
        expect(saved["id-2"]).toBeDefined();
      });
    });

    describe("getContentForBlueprint", () => {
      it("should return saved content if available", () => {
        saveContentForBlueprint(BlueprintId.AnimeGate, {
          title: "Custom Title",
          content: "Custom Content",
          description: "Custom Description",
        });

        const content = getContentForBlueprint(BlueprintId.AnimeGate);
        expect(content.title).toBe("Custom Title");
        expect(content.content).toBe("Custom Content");
        expect(content.description).toBe("Custom Description");
      });

      it("should return default content if not saved", () => {
        const content = getContentForBlueprint(BlueprintId.AnimeGate);
        const blueprint = getBlueprintById(BlueprintId.AnimeGate);

        expect(content.title).toBe(blueprint?.defaults.title);
        expect(content.content).toBe(blueprint?.defaults.content);
        expect(content.description).toBe(blueprint?.defaults.description);
      });

      it("should return fallback content for unknown blueprint", () => {
        const content = getContentForBlueprint("unknown-blueprint");

        expect(content.title).toBe("Nazwa Grupy");
        expect(content.content).toBe("Zawartość");
        expect(content.description).toBe("Opis");
      });
    });
  });
});
