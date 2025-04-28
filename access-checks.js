const permissions = require("./permission-policies.json");

const checkAccessOf = (deploymentType) => {
    var accessPermissions = [];
    switch (deploymentType) {
        case "Ec2Deployment":
            accessPermissions = permissions["aws-ec2-git-deployment"].permissions;
            break;
        case "Ec2S3Deployment":
            accessPermissions = permissions["aws-ec2-s3-deployment"].permissions;
            break;
        default:
            throw new Error("Please provide the deployment type");
    }
    return function (policiesAttached = []) {
        return accessPermissions.some((policies) => {
            return policies.every((policy) => policiesAttached.includes(policy));
        })
    }
}

module.exports = { checkAccessOf }