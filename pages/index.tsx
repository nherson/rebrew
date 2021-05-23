import Link from "next/link";
import { Typography, Grid, Box, Button } from "@material-ui/core";
import React from "react";
import { FullScreenLoading } from "../components/fullScreenLoading";
import { useUser, withPageAuthRequired } from "@auth0/nextjs-auth0";
import { IsAdmin, useIsAdmin } from "../lib/admin";

const Home = function () {
  const { isAdmin, isLoading } = useIsAdmin();

  if (isLoading) {
    <FullScreenLoading />;
  }

  return (
    <Grid container>
      <Grid item xs={12}>
        <Box paddingY={2} justifyContent="center" display="flex">
          <Typography variant="h6">Getting Started</Typography>
        </Box>
      </Grid>
      <Grid item xs={12}>
        <Box paddingY={5} justifyContent="center" display="flex">
          <Button color="primary">
            <Link href="/reviews/new">Review a Beer</Link>
          </Button>
        </Box>
      </Grid>
      <Grid item xs={12}>
        <Box paddingY={5} justifyContent="center" display="flex">
          <Button color="primary">
            <Link href="/submissions/new">Submit a Beer for Review</Link>
          </Button>
        </Box>
      </Grid>
      <Grid item xs={12}>
        <Box paddingY={5} justifyContent="center" display="flex">
          <Button color="primary">
            <Link href="/submissions">See Reviews for My Beers</Link>
          </Button>
        </Box>
      </Grid>
    </Grid>
  );
};

export default withPageAuthRequired(Home);
