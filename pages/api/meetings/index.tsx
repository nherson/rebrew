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
import Meeting from "../../../lib/models/meetings";
import { CreateMeeting, GetMeetings } from "../../../lib/s3/s3";
import { IsAdmin } from "../../../lib/admin";

// export default withApiAuthRequired(
//   async (req: NextApiRequest, res: NextApiResponse) => {
//     if (req.method === "GET") {
//       await get(req, res);
//     } else if (req.method === "POST") {
//       await post(req, res);
//     } else {
//       res.status(404).json({ error: "not found" });
//     }
//   }
// );

export default withApiAuthRequired(
  async (req: NextApiRequest, res: NextApiResponse) => {
    if (req.method === "GET") {
      await get(req, res);
    } else if (req.method === "POST") {
      await post(req, res);
    } else {
      res.status(404).json({ error: "not found" });
    }
  }
);

const get = async (req: NextApiRequest, res: NextApiResponse) => {
  let meetings: Meeting[];
  try {
    meetings = await GetMeetings();
  } catch (e) {
    console.log(e);
    res.status(500).json({ error: "internal server error" });
    return;
  }

  res.status(200).json(meetings);
};

const post = async (req: NextApiRequest, res: NextApiResponse) => {
  const session = getSession(req, res);
  if (!IsAdmin(session.user.email)) {
    res.status(403).json({ errors: ["access denied"] });
    return;
  }
  const meeting: Meeting = {
    id: uuid(),
    ...req.body,
  };

  try {
    await CreateMeeting(meeting);
    res.status(200).json(meeting);
  } catch (e) {
    console.log(e);
    res.status(500).json({ errors: ["internal server error"] });
    return;
  }

  // TODO: REIMPLEMENT VALIDATION
  // submission
  //   .save()
  //   .then((submission) => res.status(200).json(submission))
  //   .catch((err) => {
  //     if (err instanceof ValidationError) {
  //       res.status(400).json({ errors: formatValidationError(err) });
  //     } else {
  //       // unknown error
  //       console.log(err);
  //       res.status(500).json({ errors: ["internal server error"] });
  //     }
  //   });
};
