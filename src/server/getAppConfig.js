
/**
 * @description Gets the application configuration from the 'Config' sheet.
 * Creates the sheet with defaults if it doesn't exist.
 * @returns {Object} An object with key-value pairs from the config sheet.
 */

import { SS } from './CONSTANTS';

export function getAppConfig() {
  try {
    let sheet = SS.getSheetByName(CONFIG_SHEET_NAME);

    if (!sheet) {
      sheet = ss.insertSheet(CONFIG_SHEET_NAME);
      sheet.appendRow(['Key', 'Value']);
      sheet.appendRow(['AppName', 'Shree Swaminarayan Gurukul Nikol']);
      sheet.appendRow(['PrimaryColor', '#f97316']); // Default Orange
      SpreadsheetApp.flush(); 
    }

    const data = sheet.getDataRange().getValues();
    const config = {};
    for (let i = 1; i < data.length; i++) {
      if(data[i][0]) {
        config[data[i][0]] = data[i][1];
      }
    }
    return config;
  } catch(e) {
    Logger.log(`Error in getAppConfig: ${e.message}`);
    // Return defaults on error
    return { AppName: "Gurukul Inventory", PrimaryColor: "#f97316" };
  }
}

