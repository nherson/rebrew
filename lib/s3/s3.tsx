import {
  GetObjectCommand,
  PutObjectCommand,
  S3Client,
} from "@aws-sdk/client-s3";
import { getSignedUrl } from "@aws-sdk/s3-request-presigner";
import _, { remove } from "lodash";
import Meeting, { IMeeting, IMeetingMutable } from "../models/meetings";

const client = new S3Client({
  credentials: {
    accessKeyId: process.env.AWS_ACCESS_KEY_ID,
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
  },
  region: process.env.AWS_DEFAULT_REGION || "us-west-2",
});

export const CreateMeeting = async (meeting: IMeeting) => {
  const meetings = await GetMeetings();
  meetings.push(meeting);

  await doPutObject(meetings);
};

export const GetMeetings = async (): Promise<IMeeting[]> => {
  const command = new GetObjectCommand({
    Bucket: process.env.S3_MEETINGS_BUCKET_NAME,
    Key: "meetings.json",
  });

  const url = await getSignedUrl(client, command);

  const resp = await fetch(url);

  const meetings: IMeeting[] = JSON.parse(await resp.text());

  return _.sortBy(meetings, "date");
};

export const UpdateMeeting = async (meeting: IMeeting) => {
  const meetings = await GetMeetings();

  const removed = _.remove(meetings, { id: meeting.id });
  if (removed.length === 0) {
    throw new Error("meeting not found");
  }

  meetings.push(meeting);

  await doPutObject(meetings);
};

export const DeleteMeeting = async (id: string) => {
  const meetings = await GetMeetings();

  const meeting = _.find(meetings, (m) => m.id === id);

  if (!meeting) {
    throw new Error("meeting not found");
  }

  const filteredMeetings = _.filter(meetings, (m) => m.id !== id);

  await doPutObject(filteredMeetings);
};

const doPutObject = async (meetings: IMeeting[]) => {
  const command = new PutObjectCommand({
    Bucket: process.env.S3_MEETINGS_BUCKET_NAME,
    Key: "meetings.json",
    Body: JSON.stringify(meetings),
  });

  await client.send(command);
};
