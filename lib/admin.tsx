import _ from "lodash";
import { createContext, useEffect, useState } from "react";
import { AdminResponseBody } from "../pages/api/auth/admin";

const adminEmails: string[] = _.split(process.env.ADMIN_EMAILS, ",");

export const IsAdmin = (email: string): boolean => {
  return _.includes(adminEmails, email);
};

interface UserAuthorization {
  isLoading: boolean;
  isAdmin: boolean;
  error: Error | null;
}

export const useIsAdmin = (): UserAuthorization => {
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
        setIsLoading(false);
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

export const AdminContext = createContext<UserAuthorization>({
  isAdmin: false,
  isLoading: false,
  error: null,
});

export const AdminProvider = ({ children }) => {
  const userAuthorization = useIsAdmin();
  return (
    <AdminContext.Provider value={userAuthorization}>
      {children}
    </AdminContext.Provider>
  );
};
