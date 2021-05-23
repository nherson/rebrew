import { DynamoDBClient } from "@aws-sdk/client-dynamodb";
import { DynamoDBDocument } from "@aws-sdk/lib-dynamodb";
import _ from "lodash";

export const SUBMISSIONS_TABLE_NAME =
  process.env.DYNAMODB_SUBMISSIONS_TABLE_NAME;
export const REVIEWS_TABLE_NAME = process.env.DYNAMODB_REVIEWS_TABLE_NAME;

export const client = DynamoDBDocument.from(
  new DynamoDBClient({
    credentials: {
      accessKeyId: process.env.AWS_ACCESS_KEY_ID,
      secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
    },
    region: process.env.AWS_DEFAULT_REGION || "us-west-2",
  })
);
