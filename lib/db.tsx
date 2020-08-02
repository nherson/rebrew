import { Sequelize } from "sequelize-typescript";
import { NextApiResponse, NextApiRequest } from "next";
import Submission from "./models/submission";
import Review from "./models/review";

const sequelize = new Sequelize(process.env.DATABASE_URL, {
  models: [Review, Submission],
});

sequelize.sync().then(() => console.log(sequelize.models));

export interface IApiRoute {
  (req: NextApiRequest, res: NextApiResponse): Promise<void>;
}

// Middleware to load model definitions for called API functions
export function withDB(inner: IApiRoute): IApiRoute {
  return (req, res): Promise<void> => {
    return inner(req, res);
  };
}

export default sequelize;
