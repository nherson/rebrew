import Review from "../../../../lib/models/review";
import { NextApiRequest, NextApiResponse } from "next";
import { withDB } from "../../../../lib/db";
import Submission from "../../../../lib/models/submission";
import _ from "lodash";
import { getSession, withApiAuthRequired } from "@auth0/nextjs-auth0";

export default withApiAuthRequired(
  withDB(async (req: NextApiRequest, res: NextApiResponse) => {
    if (req.method === "GET") {
      await get(req, res);
    } else {
      res.status(404).json({ error: "not found" });
    }
  })
);

const get = async (req: NextApiRequest, res: NextApiResponse) => {
  const session = getSession(req, res);
  const id = req.query.id as string;
  const submission: Submission = await Submission.findByPk(id);
  if (
    _.isNil(submission) ||
    submission.getDataValue("email") !== session.user.email
  ) {
    res.status(404).json({ error: "not found" });
    return;
  }
  const reviews = await Review.findAll({
    where: {
      submissionId: req.query.id,
    },
  });
  res.status(200).json(reviews);
};
