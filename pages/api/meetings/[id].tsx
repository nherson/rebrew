import { NextApiRequest, NextApiResponse } from "next";
import Submission from "../../../lib/models/submission";
import uuid from "../../../lib/uuid";
import _ from "lodash";
import { getSession, withApiAuthRequired } from "@auth0/nextjs-auth0";
import {
  CreateSubmission,
  ListAllSubmissions,
  ListUserSubmissions,
} from "../../../lib/dynamo";
import Meeting, { IMeeting } from "../../../lib/models/meetings";
import {
  CreateMeeting,
  DeleteMeeting,
  GetMeetings,
  UpdateMeeting,
} from "../../../lib/s3/s3";
import { IsAdmin } from "../../../lib/admin";

export default withApiAuthRequired(
  async (req: NextApiRequest, res: NextApiResponse) => {
    if (req.method === "DELETE") {
      await del(req, res);
    } else if (req.method === "PUT") {
      await put(req, res);
    } else {
      res.status(404).json({ error: "not found" });
    }
  }
);

const del = async (req: NextApiRequest, res: NextApiResponse) => {
  const session = getSession(req, res);
  if (!IsAdmin(session.user.email)) {
    res.status(403).json({ errors: ["access denied"] });
    return;
  }
  const meetingId = req.query.id as string;

  try {
    await DeleteMeeting(meetingId);
    res.status(200).send("");
  } catch (e) {
    console.log(e);
    res.status(500).json({ errors: ["internal server error"] });
  }
  return;
};

const put = async (req: NextApiRequest, res: NextApiResponse) => {
  const session = getSession(req, res);
  if (!IsAdmin(session.user.email)) {
    res.status(403).json({ errors: ["access denied"] });
    return;
  }
  const meetingId = req.query.id as string;

  const meeting: IMeeting = {
    ...req.body,
  };

  console.log(meeting);

  if (meeting.id !== meetingId) {
    res
      .status(400)
      .json({ errors: ["meeting id in url must match http body"] });
    return;
  }

  try {
    await UpdateMeeting(meeting);
    res.status(200).json(meeting);
  } catch (e) {
    console.log(e);
    res.status(500).json({ errors: ["internal server error"] });
  }

  return;
};
