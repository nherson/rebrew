import { NextApiRequest, NextApiResponse } from "next";
import uuid from "../../../lib/uuid";
import { ValidationError } from "sequelize";
import { formatValidationError } from "../../../lib/errors";
import auth0 from "../../../lib/auth";
import { prisma } from "../../../lib/db";
import { Review } from "@prisma/client";
import { setCreated } from "../../../lib/timestamp";

export default auth0.requireAuthentication(
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
  const reviews = await prisma.review.findMany();
  res.status(200).json(reviews);
};

const post = async (req: NextApiRequest, res: NextApiResponse) => {
  const session = await auth0.getSession(req);
  const review: Review = {
    id: uuid(),
    ...req.body,
  };
  setCreated(review);
  try {
    await prisma.review.create({ data: review });
    res.status(200).json(review);
  } catch (err) {
    if (err instanceof ValidationError) {
      res.status(400).json({ errors: formatValidationError(err) });
    } else {
      // unknown error
      console.log(err);
      res.status(500).json({ errors: ["internal server error"] });
    }
  }
};
