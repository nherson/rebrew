import { NextApiRequest, NextApiResponse } from "next";
import Submission from "../../../lib/models/submission";
import uuid from "../../../lib/uuid";
import { ValidationError } from "sequelize";
import { formatValidationError } from "../../../lib/errors";
import auth0 from "../../../lib/auth";
import { withDB } from "../../../lib/db";
import _ from "lodash";

export default withDB(
  auth0.requireAuthentication(
    async (req: NextApiRequest, res: NextApiResponse) => {
      if (req.method === "GET") {
        await get(req, res);
      } else if (req.method === "POST") {
        await post(req, res);
      } else {
        res.status(404).json({ error: "not found" });
      }
    }
  )
);

const get = async (req: NextApiRequest, res: NextApiResponse) => {
  const session = await auth0.getSession(req);
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
  const session = await auth0.getSession(req);
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
