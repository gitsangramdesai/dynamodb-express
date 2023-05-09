var AWS = require('aws-sdk');

AWS.config.update({
    region: "local",
    endpoint: "http://localhost:8001"
});

const db = new AWS.DynamoDB.DocumentClient({ convertEmptyValues: true });
const DynamoDB = new AWS.DynamoDB();

function createTable() {
    const params = {
        TableName: "Users",
        KeySchema: [
            {
                AttributeName: "UserID",
                KeyType: "HASH"
            },
            {
                AttributeName: 'UserName',
                KeyType: 'RANGE'
            }
        ],
        AttributeDefinitions: [
            { AttributeName: "UserID", AttributeType: "S" },
            { AttributeName: "UserName", AttributeType: "S" }
        ],
        ProvisionedThroughput: {
            ReadCapacityUnits: 10,
            WriteCapacityUnits: 10,
        },
    };

    DynamoDB.createTable(params, function (err, data) {
        if (err) {
            console.error("Unable to create table", err);
        } else {
            console.log("Created table", data);
        }
    });
}

createTable()

module.exports = db;