const { createKeyPair, deleteKeyPair, listInstances, startEc2Instance, createInstance, terminateInstance, getPublicIpAddress } = require("./aws-ec2-operations");
const fs = require("fs");
const { getAmiId } = require("./utils");
const { pingAndTestSiteInfinite, checkAvailablity } = require("./service-test");
const http = require("http");

// startEc2Instance("i-06871799f50b4974a"); 
createInstance("InstanceFromSDK-4", getAmiId("Amazon Linux 2023 AMI"), "t2.micro");

// console.log(getAmiId("Amazon Linux 2023 AMI"));
// deleteKeyPair("InstanceFromSDK");
// const privatekeyFile = `${__dirname}/InstanceFromSDK.pem`
// const privateKey = require('fs').readFileSync(privatekeyFile);
// connectToSsh("3.86.195.206", privateKey);

// listInstances();

// terminateInstance('i-070529eb9d9685a31');
// startEc2Instance("i-070529eb9d9685a31")


// const instanceId = 'i-0c19fa273190736af';
// getPublicIpAddress(instanceId).then((publicIp) => {
//     console.log(publicIp); // Should print the public IP address
// });
