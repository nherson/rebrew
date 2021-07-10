import { QueryCommandInput, ScanCommandInput } from "@aws-sdk/lib-dynamodb";
import { PutCommandInput, GetCommandInput } from "@aws-sdk/lib-dynamodb";
import _ from "lodash";
import { client, SUBMISSIONS_TABLE_NAME } from "./dynamo";
import Submission from "../models/submission";
import { ListReviewsForSubmission } from "./review";

export const CreateSubmission = async (s: Submission) => {
  const params: PutCommandInput = {
    TableName: SUBMISSIONS_TABLE_NAME,
    Item: s,
  };

  return await client.put(params);
};

export const ListUserSubmissions = async (
  email: string
): Promise<Submission[]> => {
  const params: QueryCommandInput = {
    TableName: SUBMISSIONS_TABLE_NAME,
    IndexName: "email-id-index",
    KeyConditionExpression: "email = :email",
    ExpressionAttributeValues: {
      ":email": email,
    },
  };

  const output = await client.query(params);
  if (!output.Items) {
    return [];
  }

  return _.map(output.Items, (item) => submissionFromAttributeMap(item));
};

export const ListAllSubmissions = async (): Promise<Submission[]> => {
  const params: ScanCommandInput = {
    TableName: SUBMISSIONS_TABLE_NAME,
    IndexName: "email-id-index",
  };

  const output = await client.scan(params);
  if (!output.Items) {
    return [];
  }

  return _.map(output.Items, (item) => {
    delete item.email;
    return submissionFromAttributeMap(item);
  });
};

export const GetSubmission = async (id: string): Promise<Submission> => {
  const params: GetCommandInput = {
    TableName: SUBMISSIONS_TABLE_NAME,
    Key: {
      id,
    },
  };

  const output = await client.get(params);
  return submissionFromAttributeMap(output.Item);
};

export const GetSubmissionWithReviews = async (
  id: string
): Promise<Submission> => {
  const submission = await GetSubmission(id);
  const reviews = await ListReviewsForSubmission(id);
  submission.reviews = reviews;
  return submission;
};

interface dynamoAttributeMap {
  [key: string]: any;
}
const submissionFromAttributeMap = (attrs: dynamoAttributeMap): Submission => {
  return {
    id: attrs["id"] as string,
    style: attrs["style"] as string,
    name: attrs["name"] as string,
    notes: attrs["notes"] as string,
    email: attrs["email"] as string,
    meetingId: attrs["meetingId"] as string,
  };
};
