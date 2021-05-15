import { NextApiRequest, NextApiResponse } from "next";
import Review from "../../../lib/models/review";
import uuid from "../../../lib/uuid";
import { ValidationError } from "sequelize";
import { formatValidationError } from "../../../lib/errors";
import { withDB } from "../../../lib/db";
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
  Review.findAll().then((reviews) => res.status(200).json(reviews));
};

const post = async (req: NextApiRequest, res: NextApiResponse) => {
  const session = getSession(req, res);
  const review = new Review({
    id: uuid(),
    email: session.user.email,
    ...req.body,
  });
  review
    .save()
    .then((review) => res.status(200).json(review))
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
