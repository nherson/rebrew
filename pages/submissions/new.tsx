import Head from "next/head";
import Link from "next/link";
import Router from "next/router";
import Layout from "../../components/layout";
import {
  Container,
  Box,
  Typography,
  ButtonGroup,
  Grid,
  FormControl,
  Select,
  InputLabel,
  MenuItem,
  FormHelperText,
  TextField,
  TextareaAutosize,
} from "@material-ui/core";
import Button from "@material-ui/core/Button";
import React, { useState } from "react";
import _ from "lodash";
import fetch from "../../lib/fetch";
import { useRequiredLogin } from "../../lib/user";
import Submission from "../../lib/models/submission";
import { styles } from "../../lib/bjcp";

function NewSubmission() {
  useRequiredLogin();

  const [name, setName] = useState("");
  const [style, setStyle] = useState("");
  const [notes, setNotes] = useState("");

  // TODO: move meat of this to api module
  const submit = function () {
    const submission = {
      name: name,
      style: style,
      notes: notes,
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

  const handleStyleChange = (event) => {
    setStyle(event.target.value);
  };

  const handleNameChange = (event) => {
    setName(event.target.value);
  };

  const handleNotesChange = (event) => {
    setNotes(event.target.value);
  };

  return (
    <Grid container direction="column" style={{ minHeight: "80vh" }}>
      <Grid item>
        <FormControl fullWidth>
          <TextField
            onChange={handleNameChange}
            label="Name"
            id="beer-name"
            fullWidth
            required
          />
          <FormHelperText>
            e.g. "Plinky the Middle Child" or "Hop Soup!"
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
            <Link href="/">
              <a>Cancel</a>
            </Link>
          </Button>
          <Button color="primary" onClick={submit} variant="contained">
            Submit
          </Button>
        </Box>
      </Grid>
    </Grid>
  );
}

export default NewSubmission;
