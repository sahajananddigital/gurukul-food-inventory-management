/**
 * @description Adds a new raw item to the master 'Inventory' sheet.
 * @param {string} name The name of the new item.
 * @param {string} unit The unit of measurement for the item.
 * @returns {string} A success message.
 */
import { SS, MASTER_SHEET_NAME } from './CONSTANTS';

export function addNewItem(name, unit) {
   try {
    const masterSheet = SS.getSheetByName(MASTER_SHEET_NAME);
    const itemNames = masterSheet.getRange(2, 1, masterSheet.getLastRow(), 1).getValues();
    if (itemNames.some(row => row[0] && row[0].toString().toLowerCase() === name.toString().toLowerCase())) {
      throw new Error(`Item "${name}" already exists.`);
    }
    masterSheet.appendRow([name, unit]);
    return `Successfully added ${name}.`;
  } catch (e) {
    Logger.log(`Error in addNewItem: ${e.message}`);
    throw new Error(`Could not add new master item. Details: ${e.message}`);
  }
}