import { NextApiRequest, NextApiResponse } from "next";
import { prisma } from "../../../../lib/db";
import auth0 from "../../../../lib/auth";
import _ from "lodash";

export default auth0.requireAuthentication(
  async (req: NextApiRequest, res: NextApiResponse) => {
    if (req.method === "GET") {
      await get(req, res);
    } else {
      res.status(404).json({ error: "not found" });
    }
  }
);

const get = async (req: NextApiRequest, res: NextApiResponse) => {
  const session = await auth0.getSession(req);
  const id = req.query.id as string;

  try {
    const submission = await prisma.submission.findUnique({
      where: { id: id },
      include: { reviews: true },
    });
    if (_.isNil(submission) || submission.email !== session.user.email) {
      res.status(404).json({ error: "not found" });
      return;
    }
    const reviews = submission.reviews;
    res.status(200).json(reviews);
  } catch (err) {
    console.log(err);
    res.status(500).json({ errors: ["internal server error"] });
  }
};
