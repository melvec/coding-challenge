const fs = require("fs");
const path = require("path");

// Function to load JSON data
const loadData = () => {
  const filePath = path.join(__dirname, "../data.json");
  try {
    const jsonData = fs.readFileSync(filePath, "utf8");
    return JSON.parse(jsonData);
  } catch (err) {
    console.error("Error reading data.json:", err);
    throw new Error("Failed to load data");
  }
};

module.exports = { loadData };
