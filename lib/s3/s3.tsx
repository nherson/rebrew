import {
  GetObjectCommand,
  PutObjectCommand,
  PutObjectCommandInput,
  S3Client,
} from "@aws-sdk/client-s3";
import { getSignedUrl } from "@aws-sdk/s3-request-presigner";
import _ from "lodash";
import Meeting from "../models/meetings";

const client = new S3Client({
  credentials: {
    accessKeyId: process.env.AWS_ACCESS_KEY_ID,
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
  },
  region: process.env.AWS_DEFAULT_REGION || "us-west-2",
});

export const CreateMeeting = async (meeting: Meeting) => {
  const existingMeetings = await GetMeetings();
  existingMeetings.push(meeting);
  const newSortedMeetings = _.sortBy(existingMeetings, "date");

  const command = new PutObjectCommand({
    Bucket: process.env.S3_MEETINGS_BUCKET_NAME,
    Key: "meetings.json",
    Body: JSON.stringify(newSortedMeetings),
  });

  return await client.send(command);
};

export const GetMeetings = async (): Promise<Meeting[]> => {
  const command = new GetObjectCommand({
    Bucket: process.env.S3_MEETINGS_BUCKET_NAME,
    Key: "meetings.json",
  });

  const url = await getSignedUrl(client, command);

  const resp = await fetch(url);

  const meetings: Meeting[] = JSON.parse(await resp.text());

  return _.sortBy(meetings, "date");

  // return meetings;
};

export const DeleteMeeting = async (id: string) => {
  const meetings = await GetMeetings();

  console.log(meetings);
  console.log(id);

  const meeting = _.find(meetings, (m) => m.id === id);

  if (!meeting) {
    throw new Error("meeting not found");
  }

  const filteredMeetings = _.filter(meetings, (m) => m.id !== id);

  const command = new PutObjectCommand({
    Bucket: process.env.S3_MEETINGS_BUCKET_NAME,
    Key: "meetings.json",
    Body: JSON.stringify(filteredMeetings),
  });

  await client.send(command);
};
