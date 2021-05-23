import _ from "lodash";
import { useEffect, useState } from "react";
import { AdminResponseBody } from "../pages/api/auth/admin";

const adminEmails: string[] = _.split(process.env.ADMIN_EMAILS, ",");

export const IsAdmin = (email: string): boolean => {
  console.log("admins: ", adminEmails);
  console.log("current user", email);
  return _.includes(adminEmails, email);
};

interface admin {
  isLoading: boolean;
  isAdmin: boolean;
  error: Error | null;
}
export const useIsAdmin = (): admin => {
  const [isLoading, setIsLoading] = useState(true);
  const [isAdmin, setIsAdmin] = useState(false);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    const check = async () => {
      try {
        const resp = await fetch("/api/auth/admin", {
          headers: {
            "Content-Type": "application/json",
            Accept: "application/json",
          },
          method: "POST",
        });
        const data: AdminResponseBody = await resp.json();
        setIsAdmin(data.isAdmin);
      } catch (e) {
        console.log("failed to check admin status:", e);
        setError(e);
        setIsLoading(false);
      }
    };
    check();
  }, []);

  return { isAdmin, isLoading, error };
};
