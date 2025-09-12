/**
 * @description Gets the master list of all inventory items.
 * @returns {Object} An object mapping item names to their units.
 */

import { SS } from './CONSTANTS';
import { MASTER_SHEET_NAME } from './CONSTANTS';
export function getMasterItems() {
  try {
    const sheet = SS.getSheetByName(MASTER_SHEET_NAME);
    if (!sheet) {
      const newSheet = SS.insertSheet(MASTER_SHEET_NAME);
      newSheet.appendRow(['Item Name', 'Unit']);
      return {};
    }
    const data = sheet.getDataRange().getValues();
    if (data.length < 2) return {};

    const items = {};
    for (let i = 1; i < data.length; i++) {
      if (data[i][0]) items[data[i][0]] = data[i][1];
    }
    return items;
  } catch(e) {
    Logger.log(`Error in getMasterItems: ${e.message}`);
    throw new Error(`Could not fetch master items. Details: ${e.message}`);
  }
}