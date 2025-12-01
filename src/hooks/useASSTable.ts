/**
 * Custom hook for ASS Table state management
 * Centralizes all state logic, persistence, and generation
 */

import { useState, useCallback, useMemo } from "react";
import {
  TableSide,
  BlueprintId,
  ResolutionPresetId,
  DEFAULTS,
} from "@/lib/constants";
import {
  BLUEPRINTS,
  getBlueprintById,
  getResolutionPresetById,
  getContentForBlueprint,
  saveContentForBlueprint,
} from "@/lib/ass-table-blueprints";
import { generateASSTable, generateLogo } from "@/lib/ass-table-generator";
import type { ASSTableState } from "@/lib/schemas";

// ============================================================================
// TYPES
// ============================================================================

export interface UseASSTableReturn {
  /** Current state */
  state: ASSTableState;

  /** Generated ASS output for table */
  output: string;

  /** Generated ASS output for logo */
  logoOutput: string;

  /** Change resolution preset */
  setPreset: (presetId: ResolutionPresetId | string) => void;

  /** Set custom resolution (automatically switches to Custom preset) */
  setResolution: (width: number, height: number) => void;

  /** Change table side */
  setSide: (side: TableSide) => void;

  /** Change blueprint (loads saved content) */
  setBlueprint: (blueprintId: BlueprintId | string) => void;

  /** Update content field */
  setContent: (field: "title" | "content" | "description", value: string) => void;

  /** Change content font size */
  setContentFontSize: (size: number) => void;

  /** Save current content to localStorage */
  saveContent: () => void;

  /** Generate ASS output */
  generate: () => void;

  /** Get current content for preview */
  previewContent: {
    title: string;
    content: string;
    description: string;
    groupName: string;
  };
}

// ============================================================================
// INITIAL STATE
// ============================================================================

function getInitialState(): ASSTableState {
  const blueprintId = DEFAULTS.BLUEPRINT_ID;
  const content = getContentForBlueprint(blueprintId);
  const preset = getResolutionPresetById(DEFAULTS.RESOLUTION_PRESET_ID);

  return {
    presetId: DEFAULTS.RESOLUTION_PRESET_ID,
    width: preset?.width ?? 1920,
    height: preset?.height ?? 1080,
    side: DEFAULTS.SIDE,
    blueprintId,
    title: content.title,
    content: content.content,
    description: content.description,
    contentFontSize: DEFAULTS.CONTENT_FONT_SIZE,
  };
}

// ============================================================================
// HOOK
// ============================================================================

export function useASSTable(): UseASSTableReturn {
  const [state, setState] = useState<ASSTableState>(getInitialState);
  const [output, setOutput] = useState<string>("");
  const [logoOutput, setLogoOutput] = useState<string>("");

  // ---------------------------------------------------------------------------
  // Resolution handlers
  // ---------------------------------------------------------------------------

  const setPreset = useCallback((presetId: ResolutionPresetId | string) => {
    const preset = getResolutionPresetById(presetId);
    if (preset) {
      setState((prev) => ({
        ...prev,
        presetId,
        width: preset.width,
        height: preset.height,
      }));
    }
  }, []);

  const setResolution = useCallback((width: number, height: number) => {
    setState((prev) => ({
      ...prev,
      presetId: ResolutionPresetId.Custom,
      width,
      height,
    }));
  }, []);

  // ---------------------------------------------------------------------------
  // Position handler
  // ---------------------------------------------------------------------------

  const setSide = useCallback((side: TableSide) => {
    setState((prev) => ({ ...prev, side }));
  }, []);

  // ---------------------------------------------------------------------------
  // Blueprint handlers
  // ---------------------------------------------------------------------------

  const setBlueprint = useCallback((blueprintId: BlueprintId | string) => {
    const content = getContentForBlueprint(blueprintId);
    setState((prev) => ({
      ...prev,
      blueprintId,
      title: content.title,
      content: content.content,
      description: content.description,
    }));
  }, []);

  // ---------------------------------------------------------------------------
  // Content handlers
  // ---------------------------------------------------------------------------

  const setContent = useCallback(
    (field: "title" | "content" | "description", value: string) => {
      setState((prev) => ({ ...prev, [field]: value }));
    },
    []
  );

  const setContentFontSize = useCallback((size: number) => {
    // Clamp to valid range
    const clampedSize = Math.max(
      DEFAULTS.FONT_SIZE_MIN,
      Math.min(DEFAULTS.FONT_SIZE_MAX, size)
    );
    setState((prev) => ({ ...prev, contentFontSize: clampedSize }));
  }, []);

  const saveContent = useCallback(() => {
    saveContentForBlueprint(state.blueprintId, {
      title: state.title,
      content: state.content,
      description: state.description,
    });
  }, [state.blueprintId, state.title, state.content, state.description]);

  // ---------------------------------------------------------------------------
  // Generation
  // ---------------------------------------------------------------------------

  const generate = useCallback(() => {
    const blueprint = getBlueprintById(state.blueprintId);
    if (!blueprint) return;

    // Override font size in content style
    const contentStyleWithFontSize = blueprint.contentStyle.replace(
      /\\fs\d+/,
      `\\fs${state.contentFontSize}`
    );

    // Combine style prefix with user content
    const styledTitle = blueprint.titleStyle + state.title;
    const styledContent = contentStyleWithFontSize + state.content;
    const styledDescription = blueprint.descriptionStyle + state.description;

    try {
      const result = generateASSTable({
        width: state.width,
        height: state.height,
        side: state.side,
        title: styledTitle,
        content: styledContent,
        description: styledDescription,
        groupName: blueprint.name,
      });

      setOutput(result);

      // Generate logo with the same resolution
      const logoResult = generateLogo({
        width: state.width,
        height: state.height,
      });
      setLogoOutput(logoResult);

      // Auto-save content when generating
      saveContent();
    } catch (error) {
      console.error("Failed to generate ASS table:", error);
      setOutput(`; Error: ${error instanceof Error ? error.message : "Unknown error"}`);
      setLogoOutput("");
    }
  }, [state, saveContent]);

  // ---------------------------------------------------------------------------
  // Preview content (memoized)
  // ---------------------------------------------------------------------------

  const previewContent = useMemo(() => {
    return {
      title: state.title,
      content: state.content,
      description: state.description,
      groupName: getBlueprintById(state.blueprintId)?.name ?? "Group",
    };
  }, [state.blueprintId, state.title, state.content, state.description]);

  // ---------------------------------------------------------------------------
  // Return
  // ---------------------------------------------------------------------------

  return {
    state,
    output,
    logoOutput,
    setPreset,
    setResolution,
    setSide,
    setBlueprint,
    setContent,
    setContentFontSize,
    saveContent,
    generate,
    previewContent,
  };
}
