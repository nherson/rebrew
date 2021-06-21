import Link from "next/link";
import {
  Typography,
  Grid,
  Box,
  Button,
  FormControl,
  FormHelperText,
  TextField,
} from "@material-ui/core";
import React, { useContext, useState } from "react";
import { FullScreenLoading } from "../../../components/fullScreenLoading";
import { withPageAuthRequired } from "@auth0/nextjs-auth0";
import { AdminContext } from "../../../lib/admin";
import { FullScreenForbidden } from "../../../components/fullScreenForbidden";
import _ from "lodash";
import { CreateMeeting } from "../../../lib/api/client/meetings";
import { FullScreenError } from "../../../components/fullScreenError";

const handleEvent =
  (cb: (_: string) => void) =>
  (event: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>) => {
    cb(event.target.value);
  };

const NewMeeting = function () {
  const userAuth = useContext(AdminContext);

  if (userAuth.isLoading) {
    return <FullScreenLoading />;
  } else if (!userAuth.isLoading && !userAuth.isAdmin) {
    return (
      <FullScreenForbidden text="I think you've had enough to drink tonight, you're lost!" />
    );
  }

  const [name, setName] = useState("");
  const [location, setLocation] = useState("");
  const [date, setDate] = useState("");
  const [time, setTime] = useState("");
  const [error, setError] = useState<Error | null>(null);

  if (error) {
    return <FullScreenError text={error.message} />;
  }

  const canSubmit =
    name !== "" && location !== "" && date !== "" && time !== "";

  const handleSubmit = async () => {
    try {
      await CreateMeeting({
        id: "",
        name: name,
        location: location,
        date: new Date(`${date}T${time}`).toISOString(),
        openToReviews: false,
        openToSubmissions: false,
      });
      Router.push("/meetings");
    } catch (e) {
      setError(e);
    }
  };

  return (
    <Grid container>
      <Grid item xs={12}>
        <Box paddingY={2} justifyContent="center" display="flex">
          <Typography variant="h6">New Meeting</Typography>
        </Box>
      </Grid>

      <Grid container direction="column" style={{ minHeight: "80vh" }}>
        <Grid item>
          <FormControl fullWidth>
            <TextField
              label="Name"
              id="meeting-name"
              onChange={handleEvent(setName)}
              fullWidth
              required
            />
            <FormHelperText>
              e.g. "Homebrew Club Monthly Meeting, June 2021"
            </FormHelperText>
          </FormControl>
        </Grid>

        <Grid item>
          <FormControl fullWidth>
            <TextField
              label="Location"
              id="meeting-location"
              onChange={handleEvent(setLocation)}
              fullWidth
              required
            />
            <FormHelperText>
              An address or recognizable venue for the meeting
            </FormHelperText>
          </FormControl>
        </Grid>

        <Grid item>
          <Box paddingY={2}>
            <FormControl fullWidth>
              <TextField
                label="Date"
                id="date"
                type="date"
                onChange={handleEvent(setDate)}
                InputLabelProps={{
                  shrink: true,
                }}
              />
            </FormControl>
          </Box>
        </Grid>

        <Grid item>
          <Box paddingY={2}>
            <FormControl fullWidth>
              <TextField
                id="time"
                label="Time"
                type="time"
                onChange={handleEvent(setTime)}
                InputLabelProps={{
                  shrink: true,
                }}
              />
            </FormControl>
          </Box>
        </Grid>

        <Grid
          item
          style={{ marginTop: "auto", marginLeft: "auto", marginRight: "auto" }}
        >
          <Box>
            <Button color="primary">
              <Link href="/">
                <a>Cancel</a>
              </Link>
            </Button>
            <Button
              color="primary"
              variant="contained"
              disabled={!canSubmit}
              onClick={handleSubmit}
            >
              Submit
            </Button>
          </Box>
        </Grid>
      </Grid>
    </Grid>
  );
};

export default withPageAuthRequired(NewMeeting);
