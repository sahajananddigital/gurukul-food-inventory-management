/**
 * @description Logs daily usage. Cooked items are logged for reporting, while waste items also create inventory transactions.
 * @param {object} reportData The report data from the client.
 * @returns {string} A success message.
 */

import { SS, DAILY_USAGE_SHEET_NAME, TRANSACTION_SHEET_NAME } from './CONSTANTS';

export function logDailyUsage(reportData) {
  try {
    const { date, meal, people, cookedItems, wasteItems } = reportData;
    if (!date || !meal || !people) throw new Error("Incomplete report data provided.");

    const timestamp = new Date();

    const ss = SpreadsheetApp.getActiveSpreadsheet();

    let usageSheet = SS.getSheetByName(DAILY_USAGE_SHEET_NAME);
    if (!usageSheet) {
      usageSheet = SS.insertSheet(DAILY_USAGE_SHEET_NAME);
      usageSheet.appendRow(['Timestamp', 'Date', 'MealType', 'PeopleServed', 'ItemName', 'Quantity', 'Unit', 'Type']);
    }
    let transactionSheet = SS.getSheetByName(TRANSACTION_SHEET_NAME);
    if (!transactionSheet) {
        transactionSheet = SS.insertSheet(TRANSACTION_SHEET_NAME);
        transactionSheet.appendRow(['Timestamp', 'Item Name', 'Type', 'Quantity']);
    }
    
    const usageRows = [];
    const transactionRows = [];

    // Process cooked menu items (for reporting only)
    cookedItems.forEach(item => {
      usageRows.push([timestamp, date, meal, people, item.name, item.servings, 'servings', 'Usage']);
    });

    // Process raw waste items (for reporting AND inventory deduction)
    wasteItems.forEach(item => {
      usageRows.push([timestamp, date, meal, people, item.name, item.quantity, item.unit, 'Waste']);
      transactionRows.push([timestamp, item.name, 'OUT', item.quantity]);
    });

    if (usageRows.length > 0) {
      usageSheet.getRange(usageSheet.getLastRow() + 1, 1, usageRows.length, usageRows[0].length).setValues(usageRows);
    }
    if (transactionRows.length > 0) {
      transactionSheet.getRange(transactionSheet.getLastRow() + 1, 1, transactionRows.length, transactionRows[0].length).setValues(transactionRows);
    }

    return "Report logged successfully.";

  } catch (e) {
    Logger.log(`Error in logDailyUsage: ${e.message}`);
    throw new Error(`Could not log daily report. Details: ${e.message}`);
  }
}

