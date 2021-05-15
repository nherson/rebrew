import Review from "../../../../lib/models/review";
import { NextApiRequest, NextApiResponse } from "next";
import { withDB } from "../../../../lib/db";
import auth0 from "../../../../lib/auth";
import Submission from "../../../../lib/models/submission";
import _ from "lodash";

export default withDB(
  auth0.requireAuthentication(
    async (req: NextApiRequest, res: NextApiResponse) => {
      if (req.method === "GET") {
        await get(req, res);
      } else {
        res.status(404).json({ error: "not found" });
      }
    }
  )
);

const get = async (req: NextApiRequest, res: NextApiResponse) => {
  const session = await auth0.getSession(req);
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
