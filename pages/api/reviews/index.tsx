import { NextApiRequest, NextApiResponse } from "next";
import Review from "../../../lib/models/review";
import uuid from "../../../lib/uuid";
import { getSession, withApiAuthRequired } from "@auth0/nextjs-auth0";
import { CreateReview } from "../../../lib/dynamo";

export default withApiAuthRequired(
  async (req: NextApiRequest, res: NextApiResponse) => {
    if (req.method === "POST") {
      await post(req, res);
    } else {
      res.status(404).json({ error: "not found" });
    }
  }
);

const post = async (req: NextApiRequest, res: NextApiResponse) => {
  const session = getSession(req, res);
  const review: Review = {
    id: uuid(),
    email: session.user.email,
    ...req.body,
  };

  // TODO: re-implement validation
  try {
    await CreateReview(review);
    res.status(200).json(review);
  } catch (e) {
    console.log(e);
    res.status(500).json({ errors: ["internal server error"] });
  }
};
