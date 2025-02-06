const aws = require("aws-sdk");

aws.config.update({
  accessKeyId: "AKIAQFC27KQ45JKUFV4M",
  secretAccessKey: "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",
  region: "us-east-1",
});

const ec2 = new aws.EC2();

// Function to describe instances
async function listInstances() {
  try {
    const params = {}; // You can pass parameters if you want to filter instances
    const data = await ec2.describeInstances(params).promise();

    // Access the list of reservations (which contain instances)
    const instances = data.Reservations.map(
      (reservation) => reservation.Instances
    ).flat();

    if (instances.length === 0) {
      console.log("No instances found.");
    } else {
      instances.forEach((instance) => {
        console.log(`Instance ID: ${instance.InstanceId}`);
        console.log(`Instance Type: ${instance.InstanceType}`);
        console.log(`State: ${instance.State.Name}`);
        console.log(`Public IP: ${instance.PublicIpAddress}`);
        console.log("---");
      });
    }
  } catch (error) {
    console.error("Error fetching instances:", error);
  }
}

// Run the function
listInstances();
