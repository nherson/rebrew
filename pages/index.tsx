import Head from "next/head";
import Link from "next/link";
import Layout from "../components/layout";
import { Typography } from "@material-ui/core";
import React from "react";
import { useFetchUser, useRequiredLogin } from "../lib/user";
import Router from "next/router";

export default function Home() {
  const { user, loading } = useRequiredLogin();

  return (
    <>
      <Typography
        variant="h4"
        align="center"
        component="h1"
        color="textPrimary"
      >
        Create a <a href="/reviews/new">review!</a>
      </Typography>
      {user && !loading ? <p>hey its {user.email}</p> : <p> you're nobody!</p>}
    </>
  );
}
