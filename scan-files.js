const fs = require("fs");
const path = require("path");
const { json } = require("stream/consumers");

const directoryPath = __dirname;

try {
  const files = fs.readdirSync(directoryPath);
  files.forEach((file) => {
    if (file === "packae.json") {
      const data = fs.readFileSync(`${__dirname}/${file}`);
      const fileData = JSON.parse(data.toString());
      console.log("Application Name: " + fileData.name);
    } else {
      throw new Error("package.json Not found");
    }
  });
} catch (error) {
  console.log(error);
}
