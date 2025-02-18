const { error } = require("console");
const { createKeyPair, deleteKeyPair, listInstances, startEc2Instance, createInstance, terminateInstance } = require("./aws-ec2-operations");
const { getAmiId } = require("./utils");
const fs = require("fs");
const { connectToSsh } = require("./ssh");
const loading = require('loading-cli');

// startEc2Instance("i-06871799f50b4974a"); 
createInstance("InstanceFromSDK", getAmiId("Amazon Linux 2023 AMI"), "t2.micro");

// console.log(getAmiId("Amazon Linux 2023 AMI"));
// deleteKeyPair("InstanceFromSDK");
// const privatekeyFile = `${__dirname}/InstanceFromSDK.pem`
// const privateKey = require('fs').readFileSync(privatekeyFile);
// connectToSsh("3.86.195.206", privateKey);

// listInstances();

// terminateInstance('i-070529eb9d9685a31');
// startEc2Instance("i-070529eb9d9685a31")



