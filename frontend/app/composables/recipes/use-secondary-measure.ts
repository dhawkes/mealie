import { useIngredientTextParser } from "./use-recipe-ingredients";
import { useUnitConversion } from "./use-unit-conversion";
import { useUnitSystem } from "./use-unit-system";
import type { RecipeIngredient } from "~/lib/api/types/recipe";

/**
 * Formats an ingredient's secondary measure ("120 g" beside "1 cup flour") for display, in the
 * reader's chosen unit system when they have one.
 */
export function useSecondaryMeasure() {
  const { secondaryMeasure } = useUnitConversion();
  const { useParsedIngredientText } = useIngredientTextParser();
  const { unitSystem } = useUnitSystem();

  function secondaryMeasureText(ingredient: RecipeIngredient, scale = 1, includeFormating = true): string | undefined {
    const secondary = secondaryMeasure(ingredient, scale, unitSystem.value);
    if (!secondary) {
      return undefined;
    }

    // already scaled by secondaryMeasure, so formatted at 1x
    const { quantity, unit } = useParsedIngredientText(secondary, 1, includeFormating);
    return [quantity, unit].filter(Boolean).join(" ") || undefined;
  }

  return { secondaryMeasureText };
}
