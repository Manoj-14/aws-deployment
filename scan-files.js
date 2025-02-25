const fs = require("fs");
const path = require("path");
const { json } = require("stream/consumers");

const directoryPath = __dirname;

try {
  const files = fs.readdirSync(directoryPath);
  files.forEach((file) => {
    console.log(file);
    if (file === "package.json") {
      const data = fs.readFileSync(`${__dirname}/${file}`);
      const fileData = JSON.parse(data.toString());
      console.log("Application Name: " + fileData.name);
    }
  });
} catch (error) {
  console.log(error);
}
