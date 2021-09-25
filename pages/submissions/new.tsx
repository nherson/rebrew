import Router from "next/router";
import {
  Box,
  Button,
  Checkbox,
  Grid,
  FormControl,
  Select,
  InputLabel,
  MenuItem,
  FormHelperText,
  TextField,
  Link,
  FormControlLabel,
} from "@material-ui/core";
import React, { useState } from "react";
import _ from "lodash";
import { useRequiredLogin } from "../../lib/user";
import { styles } from "../../lib/bjcp";
import {
  useMeetings,
  useMeetingsOpenToSubmissions,
} from "../../lib/api/client/meetings";
import { FullScreenLoading } from "../../components/fullScreenLoading";
import { FullScreenError } from "../../components/fullScreenError";
import Meeting from "../../lib/models/meetings";

const NewSubmission = () => {
  useRequiredLogin();

  const [meetingId, setMeetingId] = useState("");
  const [name, setName] = useState("");
  const [style, setStyle] = useState("");
  const [quantityAck, setQuantityAck] = useState(false);
  const [notes, setNotes] = useState("");

  const { meetings, loading, error } = useMeetingsOpenToSubmissions();
  if (loading) {
    return <FullScreenLoading />;
  } else if (error) {
    return <FullScreenError text={error.message} />;
  } else if (meetings.length === 0) {
    return (
      <FullScreenError
        text="No meetings currently available to register a submission for."
        backButton
      />
    );
  } else if (meetingId === "") {
    setMeetingId(meetings[0].id);
  }

  const canSubmit =
    meetingId !== "" && name !== "" && style !== "" && quantityAck;

  // TODO: move meat of this to api module
  const submit = function () {
    const submission = {
      name: name,
      style: style,
      notes: notes,
      meetingId: meetingId,
    };
    fetch("/api/submissions", {
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      method: "POST",
      body: JSON.stringify(submission),
    })
      .then(() => Router.push("/"))
      .catch();
    // TODO: handle errors
  };

  const handleMeetingIdChange = (event) => {
    setMeetingId(event.target.value);
  };

  const handleNameChange = (event) => {
    setName(event.target.value);
  };

  const handleStyleChange = (event) => {
    setStyle(event.target.value);
  };

  const handleNotesChange = (event) => {
    setNotes(event.target.value);
  };

  const handleQuantityAckChange = () => {
    setQuantityAck(!quantityAck);
  };

  return (
    <Grid container direction="column" style={{ minHeight: "80vh" }}>
      <Grid item>
        <Box paddingY={1}></Box>
        {/* Hack for a touch of vertical spacing */}
      </Grid>
      <Grid item>
        <FormControl fullWidth>
          <InputLabel htmlFor="meeting-id">Meeting</InputLabel>
          <Select
            labelId="select-meeting-id"
            id="select-meeting-id"
            value={meetingId}
            onChange={handleMeetingIdChange}
            fullWidth
            required
          >
            {_.map(meetings, (meeting, i) => {
              return (
                <MenuItem value={meeting.id} key={"meeting-" + i}>
                  {meeting.name}
                </MenuItem>
              );
            })}
          </Select>
        </FormControl>
      </Grid>
      <Grid item>
        <FormControl fullWidth>
          <TextField
            onChange={handleNameChange}
            label="Beer Name"
            id="beer-name"
            fullWidth
            required
          />
          <FormHelperText>
            e.g. "Plinky the Middle Child" or "Hop Soup!" (not your name!)
          </FormHelperText>
        </FormControl>
      </Grid>
      <Grid item>
        <FormControl fullWidth>
          <InputLabel htmlFor="beer-style">Style</InputLabel>
          <Select
            labelId="select-beer-style"
            id="select-beer-style"
            value={style}
            onChange={handleStyleChange}
            fullWidth
            required
          >
            {_.map(_.keys(styles), (style, i) => {
              return (
                <MenuItem value={style} key={"style-" + i}>
                  {style} - {styles[style]}
                </MenuItem>
              );
            })}
          </Select>
          <FormHelperText>What this beer most closely resembles</FormHelperText>
        </FormControl>
      </Grid>
      <Grid item>
        <FormControlLabel
          control={<Checkbox />}
          label="I can bring 64oz of my homebrew"
          onChange={handleQuantityAckChange}
        />
      </Grid>
      <Grid item>
        <FormControl fullWidth>
          <TextField
            multiline
            rows={4}
            rowsMax={8}
            onChange={handleNotesChange}
            label="Notes"
            id="beer-notes"
            fullWidth
          />
          <FormHelperText>
            Additional information, e.g. adjuncts used, allergy warnings, etc.
            This will be provided to reviewers.
          </FormHelperText>
        </FormControl>
      </Grid>
      <Grid
        item
        style={{ marginTop: "auto", marginLeft: "auto", marginRight: "auto" }}
      >
        <Box>
          <Button color="primary">
            <Link href="/">Cancel</Link>
          </Button>
          <Button
            color="primary"
            disabled={!canSubmit}
            onClick={submit}
            variant="contained"
          >
            Submit
          </Button>
        </Box>
      </Grid>
    </Grid>
  );
};

export default NewSubmission;
