import Link from "next/link";
import { Typography, Grid, Box, Button, Paper } from "@material-ui/core";
import React, { useContext } from "react";
import { FullScreenLoading } from "../../../components/fullScreenLoading";
import { withPageAuthRequired } from "@auth0/nextjs-auth0";
import { AdminContext } from "../../../lib/admin";
import { FullScreenForbidden } from "../../../components/fullScreenForbidden";
import { useMeetings } from "../../../lib/api/client/meetings";
import { FullScreenError } from "../../../components/fullScreenError";
import _ from "lodash";
import MeetingCard from "../../../components/meetingcard";
import Router from "next/router";
import Meeting, { IMeeting } from "../../../lib/models/meetings";

const MeetingsList = function () {
  const userAuth = useContext(AdminContext);
  const meetingData = useMeetings();

  if (meetingData.loading) {
    return <FullScreenLoading />;
  } else if (meetingData.error) {
    return <FullScreenError text="Unable to fetch meetings information" />;
  }

  if (userAuth.isLoading) {
    return <FullScreenLoading />;
  } else if (!userAuth.isLoading && !userAuth.isAdmin) {
    return (
      <FullScreenForbidden text="I think you've had enough to drink tonight, you're lost!" />
    );
  }

  const deleteHandler = (id: string) => {
    return async () => {
      await fetch(`/api/meetings/${id}`, {
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        method: "DELETE",
      });
      meetingData.refresh();
    };
  };

  const toggleOpenToReviewsHandler = (m: IMeeting) => {
    const newMeeting: IMeeting = {
      ...m,
      openToReviews: !m.openToReviews,
    };
    return async () => {
      await fetch(`/api/meetings/${m.id}`, {
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        method: "PUT",
        body: JSON.stringify(newMeeting),
      });
      meetingData.refresh();
    };
  };

  const toggleOpenToSubmissionsHandler = (m: IMeeting) => {
    const newMeeting: IMeeting = {
      ...m,
      openToSubmissions: !m.openToSubmissions,
    };
    return async () => {
      await fetch(`/api/meetings/${m.id}`, {
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        method: "PUT",
        body: JSON.stringify(newMeeting),
      });
      meetingData.refresh();
    };
  };

  const newMeetingHandler = () => {
    Router.push("/admin/meetings/new");
  };

  return (
    <Grid container>
      <Grid item xs={12}>
        <Box paddingY={2} justifyContent="center" display="flex">
          <Typography variant="h6">Meetings</Typography>
        </Box>
      </Grid>

      {_.map(meetingData.meetings, (m) => (
        <Grid item xs={12} key={`meeting-${m.id}`}>
          <Box paddingY={2} justifyContent="center" display="flex">
            <MeetingCard
              meeting={m}
              onDelete={deleteHandler(m.id)}
              onToggleOpenToReviews={toggleOpenToReviewsHandler(m)}
              onToggleOpenToSubmissions={toggleOpenToSubmissionsHandler(m)}
            />
          </Box>
        </Grid>
      ))}

      <Grid item xs={12}>
        <Box paddingY={2} justifyContent="center" display="flex">
          <Button
            variant="contained"
            color="primary"
            onClick={newMeetingHandler}
          >
            New Meeting
          </Button>
        </Box>
      </Grid>
    </Grid>
  );
};

export default withPageAuthRequired(MeetingsList);
