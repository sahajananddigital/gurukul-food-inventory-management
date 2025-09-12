/**
 * @description Fetches all initial data (inventory, recipes, and config) in one call.
 * @returns {Object} An object containing inventory summary, recipe data, and app config.
 */
import { getInventorySummary } from './getInventorySummary.js';
import { getRecipes } from './getRecipes.js';
import { getAppConfig } from './getAppConfig.js';

export function getInitialData() {
  try {
    const inventory = getInventorySummary();
    const recipes = getRecipes();
    const config = getAppConfig();
    return { inventory, recipes, config };
  } catch(e) {
    Logger.log(`Error in getInitialData: ${e.message}`);
    throw new Error(`Could not fetch initial data. Details: ${e.message}`);
  }
}