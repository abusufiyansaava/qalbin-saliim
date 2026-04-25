// src/sanity/env.ts
/**
 * Centralized environment variables for Sanity
 * Reads from process.env with fallbacks for embedded studio
 */

export const apiVersion = "2024-01-01";

export const projectId = assertValue(
  process.env.NEXT_PUBLIC_SANITY_PROJECT_ID || process.env.SANITY_STUDIO_PROJECT_ID,
  "Missing environment variable: SANITY PROJECT ID"
);

export const dataset = assertValue(
  process.env.NEXT_PUBLIC_SANITY_DATASET || process.env.SANITY_STUDIO_DATASET,
  "Missing environment variable: SANITY DATASET"
);

function assertValue<T>(v: T | undefined, errorMessage: string): T {
  if (v === undefined) {
    throw new Error(errorMessage);
  }
  return v;
}