import { PutCommandInput, QueryCommandInput } from "@aws-sdk/lib-dynamodb";
import _ from "lodash";
import Review from "../models/review";
import { client, REVIEWS_TABLE_NAME } from "./dynamo";

export const ListReviewsForSubmission = async (
  submissionId: string
): Promise<Review[]> => {
  const params: QueryCommandInput = {
    TableName: REVIEWS_TABLE_NAME,
    IndexName: "submissionId-id-index",
    KeyConditionExpression: "#sid = :sid",
    ExpressionAttributeValues: {
      ":sid": submissionId,
    },
    ExpressionAttributeNames: {
      "#sid": "submissionId",
    },
  };

  const output = await client.query(params);
  if (!output.Items) {
    return [];
  }

  return _.map(output.Items, (item) => reviewFromAttributeMap(item));
};

export const CreateReview = async (r: Review) => {
  const params: PutCommandInput = {
    TableName: REVIEWS_TABLE_NAME,
    Item: r,
  };

  return await client.put(params);
};

interface dynamoAttributeMap {
  [key: string]: any;
}
const reviewFromAttributeMap = (attrs: dynamoAttributeMap): Review => {
  return {
    id: attrs["id"] as string,
    aromaScore: attrs["aromaScore"] as number,
    appearanceScore: attrs["appearanceScore"] as number,
    flavorScore: attrs["flavorScore"] as number,
    mouthfeelScore: attrs["mouthfeelScore"] as number,
    styleScore: attrs["styleScore"] as number,
    comments: attrs["comments"] as string,
    submissionId: attrs["submissionId"] as string,
    acetaldehyde: attrs["acetaldehyde"] as boolean,
    alcoholic: attrs["alcoholic"] as boolean,
    astringent: attrs["astringent"] as boolean,
    diacetyl: attrs["diacetyl"] as boolean,
    dimethylSulfide: attrs["dimethylSulfide"] as boolean,
    estery: attrs["estery"] as boolean,
    grassy: attrs["grassy"] as boolean,
    lightStruck: attrs["lightStruck"] as boolean,
    metallic: attrs["metallic"] as boolean,
    musty: attrs["musty"] as boolean,
    oxidized: attrs["oxidized"] as boolean,
    phenolic: attrs["phenolic"] as boolean,
    solvent: attrs["solvent"] as boolean,
    sourAcidic: attrs["sourAcidic"] as boolean,
    sulfur: attrs["sulfur"] as boolean,
    vegetal: attrs["vegetal"] as boolean,
    yeasty: attrs["yeasty"] as boolean,
  };
};
