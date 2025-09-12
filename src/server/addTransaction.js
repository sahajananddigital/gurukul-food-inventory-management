/**
 * @description Adds a single IN/OUT transaction for raw inventory.
 * @param {string} itemName The name of the item.
 * @param {string} type The transaction type ('IN' or 'OUT').
 * @param {number} quantity The quantity for the transaction.
 * @returns {string} A success message.
 */
import { SS, TRANSACTION_SHEET_NAME } from './CONSTANTS.js';
export function addTransaction(itemName, type, quantity) {
  try {
    if (!itemName || !type || !quantity) throw new Error("Missing transaction details.");
    
    const sheet = SS.getSheetByName(TRANSACTION_SHEET_NAME);
    sheet.appendRow([new Date(), itemName, type, quantity]);
    return "Transaction logged successfully.";
  } catch(e) {
    Logger.log(`Error in addTransaction: ${e.message}`);
    throw new Error(`Could not log transaction. Details: ${e.message}`);
  }
}