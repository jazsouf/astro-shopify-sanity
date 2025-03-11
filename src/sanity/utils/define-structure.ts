import type { ConfigContext } from "sanity";
import type { StructureBuilder } from "sanity/structure";

/**
 * Helper for creating and typing composable desk structure parts.
 */
export function defineStructure<StructureType>(
  factory: (S: StructureBuilder, context: ConfigContext) => StructureType,
) {
  return factory;
}
