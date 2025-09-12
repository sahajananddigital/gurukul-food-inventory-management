/**
 * @description Fetches all defined recipes.
 * @returns {Object} An object where keys are menu item names and values are arrays of ingredients.
 */

import { SS } from './CONSTANTS';
import { RECIPE_SHEET_NAME } from './CONSTANTS';

export function getRecipes() {
  try {
    const sheet = SS.getSheetByName(RECIPE_SHEET_NAME);
    if (!sheet) {
      const newSheet = SS.insertSheet(RECIPE_SHEET_NAME);
      newSheet.appendRow(['MenuItemName', 'IngredientName', 'IngredientQuantity', 'IngredientUnit']);
      return {};
    }
    const data = sheet.getDataRange().getValues();
    const recipes = {};

    for (let i = 1; i < data.length; i++) {
      const [menuItem, ingName, ingQty, ingUnit] = data[i];
      if (!menuItem) continue;
      if (!recipes[menuItem]) {
        recipes[menuItem] = [];
      }
      if (ingName && !isNaN(parseFloat(ingQty))) {
        recipes[menuItem].push({
          name: ingName,
          quantity: parseFloat(ingQty),
          unit: ingUnit
        });
      }
    }
    return recipes;
  } catch (e) {
    Logger.log(`Error in getRecipes: ${e.message}`);
    throw new Error(`Could not fetch recipes. Details: ${e.message}`);
  }
}