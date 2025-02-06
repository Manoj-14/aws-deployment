const fs = require("fs");
const path = require("path");

const directoryPath = __dirname;

try {
  const files = fs.readdirSync(directoryPath);
  files.forEach((files) => {
    console.log(files);
  });
} catch (error) {
  console.log(error);
}
