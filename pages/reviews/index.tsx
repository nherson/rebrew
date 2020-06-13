import { Typography } from "@material-ui/core";
import Router from "next/router";
import { useFetchUser } from "../../lib/user";

export default function Reviews() {
  const { user, loading } = useFetchUser();

  if (!user && !loading) {
    Router.replace("/login");
  }
  return <Typography variant="h4">Hello</Typography>;
}
