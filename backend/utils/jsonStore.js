const fs = require('fs');
const path = require('path');

const DATA_DIR = path.join(__dirname, '../data');

const getFilePath = (fileName) => path.join(DATA_DIR, fileName);

const readJSON = (fileName) => {
  try {
    const filePath = getFilePath(fileName);
    if (!fs.existsSync(filePath)) {
      fs.writeFileSync(filePath, JSON.stringify([], null, 2));
      return [];
    }
    const data = fs.readFileSync(filePath, 'utf8');
    return JSON.parse(data || '[]');
  } catch (error) {
    console.error(`Error reading ${fileName}:`, error);
    return [];
  }
};

const writeJSON = (fileName, data) => {
  try {
    const filePath = getFilePath(fileName);
    fs.writeFileSync(filePath, JSON.stringify(data, null, 2), 'utf8');
    return true;
  } catch (error) {
    console.error(`Error writing ${fileName}:`, error);
    return false;
  }
};

module.exports = {
  readJSON,
  writeJSON
};
