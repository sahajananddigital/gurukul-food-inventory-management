/**
 * @description Serves the HTML file of the web app.
 */
export function doGet() {
  return HtmlService.createHtmlOutputFromFile('index')
      .setTitle('Gurukul Inventory Management')
      .addMetaTag('viewport', 'width=device-width, initial-scale=1.0')
      .setXFrameOptionsMode(HtmlService.XFrameOptionsMode.ALLOWALL); // Or ALLOWORIGIN
}

