import { NextApiRequest, NextApiResponse } from "next";
import Submission from "../../../lib/models/submission";
import uuid from "../../../lib/uuid";
import { ValidationError } from "sequelize";
import { formatValidationError } from "../../../lib/errors";
import { withDB } from "../../../lib/db";
import _ from "lodash";
import { getSession, withApiAuthRequired } from "@auth0/nextjs-auth0";

export default withApiAuthRequired(
  withDB(async (req: NextApiRequest, res: NextApiResponse) => {
    if (req.method === "GET") {
      await get(req, res);
    } else if (req.method === "POST") {
      await post(req, res);
    } else {
      res.status(404).json({ error: "not found" });
    }
  })
);

const get = async (req: NextApiRequest, res: NextApiResponse) => {
  const session = getSession(req, res);
  let submissions: Submission[];
  if (_.isNil(req.query.all)) {
    // Only provide the user's submissions by default
    submissions = await Submission.findAll({
      where: {
        email: session.user.email,
      },
    });
  } else {
    // Give all the submissions available but redact the email field (so it's anonymous)
    submissions = await Submission.findAll({
      attributes: {
        exclude: ["email"],
      },
    });
  }

  res.status(200).json(submissions);
};

const post = async (req: NextApiRequest, res: NextApiResponse) => {
  const session = getSession(req, res);
  const submission = new Submission({
    id: uuid(),
    email: session.user.email,
    ...req.body,
  });
  submission
    .save()
    .then((submission) => res.status(200).json(submission))
    .catch((err) => {
      if (err instanceof ValidationError) {
        res.status(400).json({ errors: formatValidationError(err) });
      } else {
        // unknown error
        console.log(err);
        res.status(500).json({ errors: ["internal server error"] });
      }
    });
};
