import Head from "next/head";
import Link from "next/link";
import Layout from "../components/layout";
import { Typography } from "@material-ui/core";
import React from "react";
import { useFetchUser } from "../lib/user";
import Router from "next/router";

export default function Home() {
  const { user, loading } = useFetchUser();

  if (!user && !loading) {
    Router.replace("/login");
  }

  return (
    <>
      <Head>
        <title>Create Next App</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <Layout>
        <Typography
          variant="h4"
          align="center"
          component="h1"
          color="textPrimary"
        >
          Create a <a href="/reviews/new">review!</a>
        </Typography>
      </Layout>
      {user && !loading ? <p>hey its {user.email}</p> : <p> you're nobody!</p>}
    </>
  );
}
