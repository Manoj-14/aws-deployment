const { checkAccessOf } = require("./access-checks");
const accessData = require("./permission-policies.json");
const { log } = require("console");
const fs = require("fs");

const arr1 = ['AmazonEC2FullAccess', 'IAMFullAccess', 'AmazonS3FullAccess'];  // User's policies
const arr2 = [
    ['AdministratorAccess'],                          // Group 1: The user needs all policies here (1 policy)
    ['AmazonEC2FullAccess', 'AmazonS3FullAccess']     // Group 2: The user needs both policies here
];

// Function to check if the user satisfies any group in arr2
function checkUserPolicies(userPolicies, policyGroups) {
    return policyGroups.some(group => {
        return group.every(policy => userPolicies.includes(policy));
    });
}


const checkPermissionOf = checkAccessOf("Ec2Deployment");
console.log(checkPermissionOf(arr1));

// fs.readFile("./.env", "utf-8", (err, data) => {
//     const lines = data.split("\n");
//     const updatedlines = lines.filter((line) => !line.includes("AWS_REGION"));
//     const updatedData = updatedlines.join("\n");

//     fs.writeFileSync("./.env", updatedData, (err, data) => {
//         if (!err) {
//             fs.readFile("./.env", "utf-8", (err, data) => {
//                 console.log(data);

//             })
//         }
//         else {
//             console.log(err);
//         }
//     })
// })





// const srray = [1, 2, 3, 4, 4];
// const result = srray.shift();
// log(result);
// console.log(srray);