import { NextApiRequest, NextApiResponse } from "next";
import Submission from "../../../../lib/models/submission";
import _ from "lodash";
import { getSession, withApiAuthRequired } from "@auth0/nextjs-auth0";
import {
  GetSubmission,
  GetSubmissionWithReviews,
} from "../../../../lib/dynamo";

export default withApiAuthRequired(
  async (req: NextApiRequest, res: NextApiResponse) => {
    if (req.method === "GET") {
      await get(req, res);
    } else {
      res.status(404).json({ error: "not found" });
    }
  }
);

const get = async (req: NextApiRequest, res: NextApiResponse) => {
  const session = getSession(req, res);
  const id = req.query.id as string;

  let submission: Submission;
  try {
    submission = await GetSubmissionWithReviews(id);
    if (_.isNil(submission) || submission.email !== session.user.email) {
      res.status(404).json({ error: "not found" });
      return;
    }
  } catch (e) {
    res.status(500).json({ error: "internal server error" });
    return;
  }

  res.status(200).json(submission);
};
