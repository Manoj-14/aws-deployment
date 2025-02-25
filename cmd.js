#!/usr/bin/env node

const { spawn } = require("child_process");
const fs = require("fs");

console.log("Hello, this is custom CLI tool!");

const args = process.argv.slice(2);

if (args.length !== 1) {
  console.log("Please mention the file name to run");
  process.exit(1);
} sw

const filename = args[0];
if (!fs.existsSync(filename)) {
  console.log("File not exists in current dir");
  process.exit(1);
}

const child = spawn("node", [filename]);

child.stdout.on("data", (data) => {
  console.log(`stdout.${data}`);
});

child.stderr.on("data", (error) => {
  console.log(`stderr: ${error}`);
});

child.on("close", (code) => {
  console.log(`child terminated with code: ${code}`);
});
