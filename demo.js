const fs = require("fs");

const writeEnvFile = (key, value) => {
    fs.appendFileSync("./.env", `\n${key}:${value}`, (err) => {
        console.log("Env updated");
        if (err) {
            console.log(err);
        }
    })
}

writeEnvFile("kjbnd", "dcsb");