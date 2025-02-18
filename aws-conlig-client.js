require("dotenv").config();
const { EC2Client } = require("@aws-sdk/client-ec2")


const awsConfig = {
    region: process.env.AWS_REGION,
    credentials: {
        accessKeyId: process.env.AWS_ACCESS_KEY_ID,
        secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
    },
}

const ec2Client = new EC2Client(awsConfig);
module.exports = { ec2Client };