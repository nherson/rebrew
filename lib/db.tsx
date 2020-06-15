import { Sequelize } from "sequelize-typescript";
import { NextApiResponse, NextApiRequest } from "next";
import Submission from "./models/submission";
import Review from "./models/review";

let sequelize: Sequelize;
if (process.env.ENVIRONMENT === "production") {
  sequelize = new Sequelize(process.env.DATABASE_URL);
} else {
  console.log("using in memory database for storage");
  sequelize = new Sequelize("sqlite://development.db?cache=shared", {
    models: [Review, Submission],
  });
}

sequelize.sync().then(() => console.log(sequelize.models));

export interface IApiRoute {
  (req: NextApiRequest, res: NextApiResponse): Promise<void>;
}

// Middleware to load model definitions for called API functions
export function withDB(inner: IApiRoute): IApiRoute {
  return (req, res): Promise<void> => {
    return sequelize.sync().then(() => {
      inner(req, res);
    });
  };
}

export default sequelize;
