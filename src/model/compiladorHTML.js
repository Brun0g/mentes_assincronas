const fs = require("fs").promises;

async function compiladorHTML() {
  try {
    const filePath = "../Email.html";
    const fileContent = await fs.readFile(filePath, "utf8");
    console.log(fileContent);
  } catch (error) {
    console.error("Error reading the file:", error);
  }
}

module.exports = compiladorHTML;
