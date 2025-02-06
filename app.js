const { spawn } = require("child_process");

const child = spawn("node", ["index.js"], {
  detached: true,
  stdio: "ignore",
});

child.unref();

child.on("spawn", (resp) => {
  console.log(child.pid);
});

child.on("disconnect", (resp) => {
  console.log("Disconnected");
});
