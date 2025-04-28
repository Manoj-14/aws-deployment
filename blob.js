const crypto = require("crypto")

const blob = new Blob(["Hello World Heloo world"], { type: "text/plain" });
// console.log((async () => {
//     return await blob.text();
// }));
// blob.text().then(data => {
//     console.log(data);

// })
// blob.arrayBuffer().then((data) => console.log(data));
const data = crypto.createHash("sha256", "abcdefg").update("48 65 6c 6c 6f 20 57 6f 72 6c 64 20 48 65 6c 6f 6f 20 77 6f 72 6c 64").digest("hex")
console.log(data);
