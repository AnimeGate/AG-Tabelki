/**
 * Zod schemas for input validation
 * Provides runtime type safety and helpful error messages
 */

import { z } from "zod";
import {
  TableSide,
  BlueprintId,
  ResolutionPresetId,
  LIMITS,
  DEFAULTS,
} from "./constants";

// ============================================================================
// PRIMITIVE SCHEMAS
// ============================================================================

/** Positive integer for dimensions */
export const dimensionSchema = z
  .number()
  .int()
  .min(LIMITS.MIN_WIDTH, `Minimum dimension is ${LIMITS.MIN_WIDTH}`)
  .max(LIMITS.MAX_WIDTH, `Maximum dimension is ${LIMITS.MAX_WIDTH}`);

/** Font size within valid range */
export const fontSizeSchema = z
  .number()
  .int()
  .min(DEFAULTS.FONT_SIZE_MIN, `Minimum font size is ${DEFAULTS.FONT_SIZE_MIN}`)
  .max(DEFAULTS.FONT_SIZE_MAX, `Maximum font size is ${DEFAULTS.FONT_SIZE_MAX}`);

/** Table side enum */
export const tableSideSchema = z.nativeEnum(TableSide);

/** Blueprint ID enum */
export const blueprintIdSchema = z.nativeEnum(BlueprintId);

/** Resolution preset ID enum */
export const resolutionPresetIdSchema = z.nativeEnum(ResolutionPresetId);

// ============================================================================
// CONTENT SCHEMAS
// ============================================================================

/** Text content with length limits */
export const titleSchema = z
  .string()
  .max(LIMITS.MAX_TITLE_LENGTH, `Title cannot exceed ${LIMITS.MAX_TITLE_LENGTH} characters`);

export const contentSchema = z
  .string()
  .max(LIMITS.MAX_CONTENT_LENGTH, `Content cannot exceed ${LIMITS.MAX_CONTENT_LENGTH} characters`);

export const descriptionSchema = z
  .string()
  .max(LIMITS.MAX_DESCRIPTION_LENGTH, `Description cannot exceed ${LIMITS.MAX_DESCRIPTION_LENGTH} characters`);

/** Group name (used in ASS comments) */
export const groupNameSchema = z
  .string()
  .min(1, "Group name is required")
  .max(100, "Group name cannot exceed 100 characters");

// ============================================================================
// COMPOSITE SCHEMAS
// ============================================================================

/** Resolution configuration */
export const resolutionSchema = z.object({
  width: dimensionSchema,
  height: dimensionSchema,
});

/** Blueprint content (user-editable text) */
export const blueprintContentSchema = z.object({
  title: titleSchema,
  content: contentSchema,
  description: descriptionSchema,
});

/** Configuration for generating table ASS output */
export const tabelkaConfigSchema = z.object({
  width: dimensionSchema,
  height: dimensionSchema,
  side: tableSideSchema,
  title: titleSchema,
  content: contentSchema,
  description: descriptionSchema,
  groupName: groupNameSchema,
});

/** Configuration for generating logo ASS output */
export const logoConfigSchema = z.object({
  width: dimensionSchema,
  height: dimensionSchema,
});

/** Full application state */
export const tabelkaStateSchema = z.object({
  presetId: z.string(),
  width: dimensionSchema,
  height: dimensionSchema,
  side: tableSideSchema,
  blueprintId: z.string(),
  title: titleSchema,
  content: contentSchema,
  description: descriptionSchema,
  contentFontSize: fontSizeSchema,
});

// ============================================================================
// TYPE EXPORTS
// ============================================================================

export type Resolution = z.infer<typeof resolutionSchema>;
export type BlueprintContent = z.infer<typeof blueprintContentSchema>;
export type TabelkaConfig = z.infer<typeof tabelkaConfigSchema>;
export type LogoConfig = z.infer<typeof logoConfigSchema>;
export type TabelkaState = z.infer<typeof tabelkaStateSchema>;

// ============================================================================
// VALIDATION HELPERS
// ============================================================================

/**
 * Validate tabelka configuration and return result
 */
export function validateTabelkaConfig(config: unknown): {
  success: boolean;
  data?: TabelkaConfig;
  error?: string;
} {
  const result = tabelkaConfigSchema.safeParse(config);
  if (result.success) {
    return { success: true, data: result.data };
  }
  // Zod v4 uses .issues instead of .errors
  const issues = result.error?.issues ?? result.error?.errors ?? [];
  return {
    success: false,
    error: issues.map((e: { message: string }) => e.message).join(", "),
  };
}

/**
 * Validate logo configuration and return result
 */
export function validateLogoConfig(config: unknown): {
  success: boolean;
  data?: LogoConfig;
  error?: string;
} {
  const result = logoConfigSchema.safeParse(config);
  if (result.success) {
    return { success: true, data: result.data };
  }
  // Zod v4 uses .issues instead of .errors
  const issues = result.error?.issues ?? result.error?.errors ?? [];
  return {
    success: false,
    error: issues.map((e: { message: string }) => e.message).join(", "),
  };
}
