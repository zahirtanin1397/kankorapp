/**
 * @type {import('@types/aws-lambda').APIGatewayProxyHandler}
 */
const { DynamoDBClient, PutItemCommand } = require("@aws-sdk/client-dynamodb");
const dynamoDbClient  = new DynamoDBClient({ region : "ap-south-1"});
const tablename = process.env.MYUSERTABLE;

exports.handler = async (event) => {
  if (!event?.request?.userAttributes?.sub) {
    console.log("no sub provided");
    return;
  }

  const now = new Date();
  const timeStump = now.getTime();

  const userItem = {
    __typename: { S: "User" },
    _lastChangedAt: { N: timeStump.toString() },
    _version: { N: "1" },
    createdAt: { S: now.toISOString() },
    updatedAt: { S: now.toISOString() },
    id: { S: event.request.userAttributes.sub },
    name: { S: event.request.userAttributes.name },
  };

  const params = {
    Item: userItem,
    TableName: tablename,
  };

  try {
    await dynamoDbClient.send(new PutItemCommand(params));
    console.log("success");
  } catch (error) {
    console.log("Can not create", error);
  }


  return event;
};
