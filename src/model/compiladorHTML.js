const fs = require("fs").promises;

async function compiladorHTML() {
  try {
    const filePath = "./src/Email.html";
    const fileContent = await fs.readFile(filePath, "utf8");
    return fileContent;
  } catch (error) {
    console.error("Error reading the file:", error);
  }
}

module.exports = compiladorHTML;