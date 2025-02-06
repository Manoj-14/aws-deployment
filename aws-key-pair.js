const aws = require("aws-sdk");
const fs = require("fs");
aws.config.update({
  accessKeyId: "AKIAQFC27KQ45JKUFV4M",
  secretAccessKey: "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",
  region: "us-east-1",
});

const ec2 = new aws.EC2();

const keyPairname = "my-key-pair";

const params = { KeyName: keyPairname };

ec2.createKeyPair(params, (err, data) => {
  if (err) {
    console.log("error in creating key pair:", err);
  } else {
    console.log("Key pair created:", data.KeyName);
    const privatekey = data.KeyMaterial;
    const filepath = `./${keyPairname}.pem`;
    fs.writeFile(filepath, privatekey, (writeErr) => {
      if (writeErr) {
        console.error("Error saving .pem file:", writeErr);
      } else {
        console.log(`Private key saved as ${filepath}`);
        fs.chmod(filepath, 0o400, (chmodErr) => {
          if (chmodErr) {
            console.error("Error setting permissions:", chmodErr);
          } else {
            console.log(`Permissions set: Read-only for owner`);
          }
        });
      }
    });
  }
});

ec2.deleteKeyPair(params, (err, data) => {
  if (err) {
    console.error("Error deleting key pair:", err);
  } else {
    console.log(`Key Pair "${keyPairname}" deleted successfully from AWS.`);
  }
});
