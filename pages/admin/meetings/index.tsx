import Link from "next/link";
import { Typography, Grid, Box, Button, Paper } from "@material-ui/core";
import React, { useContext } from "react";
import { FullScreenLoading } from "../../../components/fullScreenLoading";
import { withPageAuthRequired } from "@auth0/nextjs-auth0";
import { AdminContext } from "../../../lib/admin";
import { FullScreenForbidden } from "../../../components/fullScreenForbidden";
import { useMeetings } from "../../../lib/api";
import { FullScreenError } from "../../../components/fullScreenError";
import _ from "lodash";
import MeetingCard from "../../../components/meetingcard";

const Home = function () {
  const userAuth = useContext(AdminContext);

  if (userAuth.isLoading) {
    return <FullScreenLoading />;
  } else if (!userAuth.isLoading && !userAuth.isAdmin) {
    return (
      <FullScreenForbidden text="I think you've had enough to drink tonight, you're lost!" />
    );
  }

  const meetingData = useMeetings();
  if (meetingData.loading) {
    return <FullScreenLoading />;
  } else if (meetingData.error) {
    return <FullScreenError text="Unable to fetch meetings information" />;
  }

  return (
    <Grid container>
      <Grid item xs={12}>
        <Box paddingY={2} justifyContent="center" display="flex">
          <Typography variant="h6">Meetings</Typography>
        </Box>
      </Grid>

      {_.map(meetingData.meetings, (m) => (
        <Grid item xs={12}>
          <Box paddingY={2} justifyContent="center" display="flex">
            <MeetingCard meeting={m} />
          </Box>
        </Grid>
      ))}
    </Grid>
  );
};

export default withPageAuthRequired(Home);
