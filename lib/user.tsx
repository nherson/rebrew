import Router from "next/router";
import { useUser } from "@auth0/nextjs-auth0";

export const useRequiredLogin = () => {
  const { user, isLoading } = useUser();

  if (!user && !isLoading) {
    Router.replace("/login");
  }

  return {
    user,
    isLoading,
  };
};
