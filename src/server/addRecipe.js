/**
 * @description Adds a new menu item and its ingredients to the Recipes sheet.
 * @param {Object} recipe The recipe object from the client.
 * @returns {string} A success message.
 */

import { SS } from './CONSTANTS';
import { RECIPE_SHEET_NAME } from './CONSTANTS';

export function addRecipe(recipe) {
  try {
    const { name, ingredients } = recipe;
    if (!name || !ingredients || ingredients.length === 0) {
      throw new Error("Invalid recipe data.");
    }

    const sheet = SS.getSheetByName(RECIPE_SHEET_NAME);
    const existingRecipes = sheet.getRange(2, 1, sheet.getLastRow(), 1).getValues().flat();
    if (existingRecipes.some(r => r.toString().toLowerCase() === name.toString().toLowerCase())) {
        throw new Error(`A menu item named "${name}" already exists.`);
    }

    const rows = ingredients.map(ing => [name, ing.name, ing.quantity, ing.unit]);

    sheet.getRange(sheet.getLastRow() + 1, 1, rows.length, rows[0].length).setValues(rows);
    Logger.log(`Added recipe for ${name}`);
    return `Recipe for "${name}" saved successfully.`;
  } catch (e) {
    Logger.log(`Error in addRecipe: ${e.message}`);
    throw new Error(`Could not save recipe. Details: ${e.message}`);
  }
}