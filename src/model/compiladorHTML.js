// compiladorHTML.js

const fs = require("fs").promises;

async function compiladorHTML(filePath, data) {
  try {
    let htmlContent = await fs.readFile(filePath, "utf-8");

    // Replace placeholders with actual values
    for (const [key, value] of Object.entries(data)) {
      const placeholder = new RegExp(`{{${key}}}`, "g");
      htmlContent = htmlContent.replace(placeholder, value);
    }

    return htmlContent;
  } catch (error) {
    throw new Error(`Error reading or compiling HTML template: ${error.message}`);
  }
}

module.exports = compiladorHTML;
