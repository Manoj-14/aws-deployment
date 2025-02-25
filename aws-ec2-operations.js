const { DescribeInstancesCommand, CreateKeyPairCommand, DeleteKeyPairCommand, StartInstancesCommand, RunInstancesCommand, TerminateInstancesCommand } = require("@aws-sdk/client-ec2");
const { ec2Client } = require("./aws-conlig-client");
const { writeFile, chmod, readFileSync, unlink } = require("fs");
const loading = require('loading-cli');
const { pingAndTestSite, pingAndTestSiteInfinite, checkAvailablity, siteAvailabilityCheck } = require("./service-test");

const getLoader = (message = '') => {
    const load = loading(message);
    load.frame(["◰", "◳", "◲", "◱"]);
    return load;
}
const listInstances = async () => {
    const load = getLoader()
    try {
        load.start();
        load.text = "Fetching Instances"
        const params = {}; // You can pass parameters if you want to filter instances
        const data = await ec2Client.send(new DescribeInstancesCommand({}));

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
        load.fail("Listing Instance failed");
    } finally {
        ec2Client.destroy();
        load.stop();
    }
}

const createKeyPair = async (keyPairname) => {
    try {
        const params = { KeyName: keyPairname }
        const data = await ec2Client.send(new CreateKeyPairCommand(params)).then((resp) => {
            console.log(`${keyPairname} keypair created`);
            return resp;
        });
        const filename = `./${keyPairname}.pem`;
        const privateKey = data.KeyMaterial;
        writeFile(filename, privateKey, (err) => {
            if (err) {
                console.log("Error in creating .pem file: ", err);
            } else {
                chmod(filename, 0o400, (error) => {
                    if (error) {
                        console.log("Error in setting file permission:", error);
                    } else {
                        console.log(`Permissions set: Read-only for owner`);
                    }
                })
            }
        })
        return data.KeyName;
    } catch (error) {
        console.log("Error in creating Key pair: ", error);
    } finally {
        ec2Client.destroy();
    }
}

const deleteKeyPair = async (keyPairname) => {
    const filename = `./${keyPairname}.pem`;
    try {
        const params = { KeyName: keyPairname }
        const data = await ec2Client.send(new DeleteKeyPairCommand(params)).then((resp) => {
            console.log(`${keyPairname} keypair delete completed`);
            unlink(filename, (err) => {
                if (err) {
                    console.error(`Error deleting file: ${err}`);
                } else {
                    console.log(`File deleted successfully: ${filename}`);
                }
            })
            return resp;
        })
    } catch (error) {
        console.log("Error in deleting keypair:", error);
    } finally {
        ec2Client.destroy();
    }
}
const startEc2Instance = async (instanceId) => {
    const params = {
        InstanceIds: [instanceId],
        DryRun: false
    }
    try {
        const data = await ec2Client.send(new StartInstancesCommand(params)).then(resp => {
            console.log(params.InstanceIds[0], " start completed");
            return resp;
        })
        console.log(data);
    } catch (error) {
        console.log(`Error in starting ${params.InstanceIds[0]}:`, error);
    } finally {
        ec2Client.destroy();
    }
}

const createInstance = async (instanceName, amiId, instanceType) => {
    const encodeduserData = readFileSync("./initial-user-data.sh").toString("base64");
    const keyPairName = await createKeyPair(instanceName);
    params = {
        ImageId: amiId,
        InstanceType: instanceType,
        MinCount: 1,
        MaxCount: 1,
        KeyName: keyPairName,
        UserData: encodeduserData,
        TagSpecifications: [
            {
                ResourceType: "instance",
                Tags: [
                    {
                        Key: "Name",
                        Value: instanceName,
                    },
                ]
            }
        ]
    }
    try {
        // const data = await ec2Client.send(new RunInstancesCommand(params)).then(resp => {
        //     console.log(`${instanceName} instance of type ${instanceType} has created:${resp}`);
        //     return resp.Instances[0];
        // })
        // const instance_pubic_id = await getPublicIpAddress(data.InstanceId);
        // console.log(instance_pubic_id);
        // pingAndTestSite(`${instance_pubic_id}:80`, 50)
        return await ec2Client.send(new RunInstancesCommand(params)).then(async resp => {
            console.log(`${instanceName} instance of type ${instanceType} has created:${resp}`);
            const data = resp.Instances[0];
            const instance_pubic_id = await getPublicIpAddress(data.InstanceId);
            console.log(instance_pubic_id);
            // pingAndTestSite(`${instance_pubic_id}:80`, 50)
            // checkAvailablity(`http://${instance_pubic_id}:80`);
            const isNginxAvailable = siteAvailabilityCheck(`http://${instance_pubic_id}:80`, 3000, 50);
            return instance_pubic_id; // Return the public IP address
        })
    } catch (error) {
        console.log("Error in creating instance", error);
    } finally {
        ec2Client.destroy();
    }

}

const terminateInstance = (instanceid) => {
    const params = {
        InstanceIds: [instanceid]
    }
    try {
        const data = ec2Client.send(new TerminateInstancesCommand(params)).then((resp) => {
            console.log("Instance terminalated", resp);

            return resp;
        })

    } catch (error) {
        console.log("Error in terminalating instance");
    }

}

const getPublicIpAddress = async (instanceId) => {
    const params = {
        InstanceIds: [instanceId],
    };
    try {
        const data = await ec2Client.send(new DescribeInstancesCommand(params)).then((data) => {
            console.log(`${instanceId} fetched successfully`);
            return data;
        })
        const publicIp = data.Reservations[0].Instances[0].PublicIpAddress;
        return publicIp;
    } catch (error) {
        console.log("Got errror while fetching instance ", instanceId)
        console.log(error);
    } finally {
        ec2Client.destroy();
    }
}

module.exports = { listInstances, createKeyPair, deleteKeyPair, startEc2Instance, createInstance, getPublicIpAddress };