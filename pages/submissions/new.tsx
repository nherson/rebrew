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
import { useMeetingsOpenToSubmissions } from "../../lib/api/client/meetings";
import { FullScreenLoading } from "../../components/fullScreenLoading";
import { FullScreenError } from "../../components/fullScreenError";

const NewSubmission = () => {
  useRequiredLogin();

  const [meetingId, setMeetingId] = useState("");
  const [name, setName] = useState("");
  const [style, setStyle] = useState("");
  const [quantityAck, setQuantityAck] = useState(false);

  const [allergensPresent, setAllergensPresent] = useState(false);

  // allergen toggles
  const [nutsPresent, setNutsPresent] = useState(false);
  const [dairyPresent, setDairyPresent] = useState(false);
  const [fruitPresent, setFruitPresent] = useState(false);

  // allergen specifics
  const [nuts, setNuts] = useState<string>("");
  const [dairy, setDairy] = useState<string>("");
  const [fruit, setFruit] = useState<string>("");

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
    meetingId !== "" &&
    name !== "" &&
    style !== "" &&
    quantityAck &&
    (!nutsPresent || nuts !== "") &&
    (!dairyPresent || dairy !== "") &&
    (!fruitPresent || fruit !== "");

  // TODO: move meat of this to api module
  const submit = function () {
    const submission = {
      name: name,
      style: style,
      notes: notes,
      meetingId: meetingId,
      containsNuts: null,
      containsDairy: null,
      containsFruit: null,
    };

    if (nutsPresent) {
      submission.containsNuts = nuts;
    }
    if (dairyPresent) {
      submission.containsDairy = dairy;
    }
    if (fruitPresent) {
      submission.containsFruit = fruit;
    }

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

  const handleAllergensPresentChange = () => {
    setAllergensPresent(!allergensPresent);
  };

  const handleNutsPresentChange = () => {
    setNutsPresent(!nutsPresent);
  };

  const handleDairyPresentChange = () => {
    setDairyPresent(!dairyPresent);
  };

  const handleFruitPresentChange = () => {
    setFruitPresent(!fruitPresent);
  };

  const handleNutsChange = (event) => {
    setNuts(event.target.value);
  };

  const handleDairyChange = (event) => {
    setDairy(event.target.value);
  };

  const handleFruitChange = (event) => {
    setFruit(event.target.value);
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
        <FormControlLabel
          control={<Checkbox />}
          label="This homebrew contains nuts, dairy, or fruit"
          onChange={handleAllergensPresentChange}
        />
      </Grid>
      {allergensPresent && (
        <Grid item>
          <Box marginX={2}>
            <Box marginY={1}>
              <AllergenCheckbox
                name="Nuts"
                present={nutsPresent}
                onToggle={handleNutsPresentChange}
                onSpecify={handleNutsChange}
              />
            </Box>
            <Box marginY={1}>
              <AllergenCheckbox
                name="Dairy"
                present={dairyPresent}
                onToggle={handleDairyPresentChange}
                onSpecify={handleDairyChange}
              />
            </Box>
            <Box marginY={1}>
              <AllergenCheckbox
                name="Fruit"
                present={fruitPresent}
                onToggle={handleFruitPresentChange}
                onSpecify={handleFruitChange}
              />
            </Box>
          </Box>
        </Grid>
      )}

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

interface AllergenCheckboxProps {
  name: string;
  present: boolean;
  onToggle: () => void;
  onSpecify: (event: any) => void;
}
const AllergenCheckbox = ({
  name,
  present,
  onSpecify,
  onToggle,
}: AllergenCheckboxProps) => {
  return (
    <Box display="flex" flexDirection="right" alignItems="top">
      <Box>
        <FormControlLabel
          control={<Checkbox />}
          label={name}
          onChange={onToggle}
        />
      </Box>
      {present && (
        <Box>
          <FormControl>
            <TextField
              onChange={onSpecify}
              label={`Specify ${name.toLowerCase()}`}
              id={`allergen-${name}`}
              required
            />
          </FormControl>
        </Box>
      )}
    </Box>
  );
};

export default NewSubmission;
