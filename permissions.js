const { GetPolicyCommand, AttachRolePolicyCommand, ListAttachedUserPoliciesCommand } = require("@aws-sdk/client-iam");
const { iamClient } = require("./aws-conlig-client");

const getPoliciesAttached = async () => {
    const data = await iamClient.send(new ListAttachedUserPoliciesCommand({ UserName: "manoj" })).then((data) => {
        return data.AttachedPolicies.map((policy) => policy.PolicyName)
    })
    return data;
}

