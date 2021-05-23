import { getSession, withApiAuthRequired } from "@auth0/nextjs-auth0";
import { NextApiRequest, NextApiResponse } from "next";
import { IsAdmin } from "../../../lib/admin";

export interface AdminResponseBody {
  isAdmin: boolean;
}
export default withApiAuthRequired(
  async (req: NextApiRequest, res: NextApiResponse) => {
    if (req.method !== "POST") {
      res.status(404).json({ error: "not found" });
      return;
    }

    const session = getSession(req, res);
    let resp: AdminResponseBody;
    if (IsAdmin(session.user.email)) {
      resp = {
        isAdmin: true,
      };
    } else {
      resp = {
        isAdmin: false,
      };
    }
    res.status(200).json(resp);
  }
);
