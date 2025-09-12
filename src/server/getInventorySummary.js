/**
 * @description Calculates the current stock of all items.
 * @returns {Object} The summarized inventory.
 */

import { SS, TRANSACTION_SHEET_NAME } from './CONSTANTS.js';
import { getMasterItems } from './getMasterItems.js';

export function getInventorySummary() {
  try {
    const masterItems = getMasterItems();
    const inventorySummary = {};

    Object.keys(masterItems).forEach(name => {
      inventorySummary[name] = { quantity: 0, unit: masterItems[name] };
    });

    const transactionSheet = SS.getSheetByName(TRANSACTION_SHEET_NAME);
     if (!transactionSheet) {
      const newSheet = SS.insertSheet(TRANSACTION_SHEET_NAME);
      newSheet.appendRow(['Timestamp', 'Item Name', 'Type', 'Quantity']);
      return inventorySummary;
    }
    
    const transactions = transactionSheet.getDataRange().getValues();
    
    for (let i = 1; i < transactions.length; i++) {
      const [ts, name, type, qty] = transactions[i];
      if (inventorySummary[name] && !isNaN(parseFloat(qty))) {
        if (type === 'IN') inventorySummary[name].quantity += parseFloat(qty);
        else if (type === 'OUT') inventorySummary[name].quantity -= parseFloat(qty);
      }
    }
    return inventorySummary;
  } catch (e) {
    Logger.log(`Error in getInventorySummary: ${e.message}`);
    throw new Error(`Could not calculate inventory summary. Details: ${e.message}`);
  }
}