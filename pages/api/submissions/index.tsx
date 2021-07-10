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
  const session = getSession(req, res);
  let submissions: Submission[];
  try {
    if (_.isNil(req.query.all)) {
      submissions = await ListUserSubmissions(session.user.email);
    } else {
      submissions = await ListAllSubmissions();
    }
  } catch (e) {
    console.log(e);
    res.status(500).json({ error: "internal server error" });
    return;
  }

  res.status(200).json(submissions);
};

const post = async (req: NextApiRequest, res: NextApiResponse) => {
  const session = getSession(req, res);
  const submission: Submission = {
    ...req.body,
  };

  submission.id = uuid();
  submission.email = session.user.email;

  try {
    await CreateSubmission(submission);
    res.status(200).json(submission);
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
