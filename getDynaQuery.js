var AWS = require("aws-sdk");

AWS.config.update({
  region: "us-east-1",
  endpoint: "https://3on5w1788k.execute-api.us-east-1.amazonaws.com/latest"
});

var docClient = new AWS.DynamoDB.DocumentClient();

console.log("Querying for movies from 1985.");

var params = {
    TableName : "dynasorDb",
    KeyConditionExpression: "#sp = :spcs",
    ExpressionAttributeNames:{
        "#sp": "species"
    },
    ExpressionAttributeValues: {
        ":spcs": "apex predator"
    }
};

docClient.query(params, function(err, data) {
    if (err) {
        console.error("Unable to query. Error:", JSON.stringify(err, null, 2));
    } else {
        console.log("Query succeeded.");
        data.Items.forEach(function(item) {
            console.log(" -", item.name + ": " + item.description);
        });
    }
});