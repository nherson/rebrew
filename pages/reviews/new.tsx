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
  Paper,
  FormControl,
  FormLabel,
  RadioGroup,
  FormControlLabel,
  Radio,
  Card,
  CardContent,
  CardActions,
  Slide,
  TextField,
  FormHelperText,
  Divider,
  Chip,
} from "@material-ui/core";
import Button from "@material-ui/core/Button";
import React, { useState } from "react";
import _ from "lodash";
import ScoreCard from "../../components/scorecard";
import fetch from "../../lib/fetch";
import { useRequiredLogin } from "../../lib/user";
import { useSubmissions } from "../../lib/api";
import SubmissionSelect from "../../components/submissionselect";
import useSensoryPanel, { filterDetected } from "../../lib/sensorypanel";
import { anyNil } from "../../lib/helpers";

const aromaName = "aroma";
const appearanceName = "appearance";
const flavorName = "flavor";
const mouthfeelName = "mouthfeel";
const styleAccuracyName = "style accuracy";

const RIGHT = "right";
const LEFT = "left";

function ReviewPage() {
  useRequiredLogin();

  /*
   * Setup a 'slider' to move through sections of the form
   */
  const [direction, setDirection] = useState(LEFT);
  const [current, setCurrent] = useState(0);
  const [transitioning, setTransitioning] = useState(false);

  // transition current item out to the left (exit as if it entered from right)
  const handleForward = () => {
    setDirection(RIGHT);
    setTransitioning(true);
    setTimeout(() => {
      setDirection(LEFT);
      setCurrent(current + 1);
      setTransitioning(false);
    }, 300);
  };

  // transition current item out to the right (exit as if it entered from left)
  const handleBack = () => {
    setDirection(LEFT);
    setTransitioning(true);
    setTimeout(() => {
      setDirection(RIGHT);
      setCurrent(current - 1);
      setTransitioning(false);
    }, 300);
  };

  // State for choosing a submission to review
  const { submissions, loading, error } = useSubmissions();
  const [submission, setSubmission] = useState(null);
  const handleSelectSubmission = (s) => {
    setSubmission(s);
    handleForward();
  };

  // State for each sensory score
  const [aroma, setAroma] = useState(null);
  const [appearance, setAppearance] = useState(null);
  const [flavor, setFlavor] = useState(null);
  const [mouthfeel, setMouthfeel] = useState(null);
  const [styleAccuracy, setStyleAccuracy] = useState(null);

  // State for discrete sensory detections
  const sensoryOptions = useSensoryPanel();

  // State for reviewer comments
  const [comments, setComments] = useState("");
  const handleCommentsChange = (event) => setComments(event.target.value);

  const submit = function () {
    const review = {
      aromaScore: aroma,
      appearanceScore: appearance,
      flavorScore: flavor,
      mouthfeelScore: mouthfeel,
      styleScore: styleAccuracy,
      submissionId: submission.Id,
    };
    fetch("/api/reviews", {
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      method: "POST",
      body: JSON.stringify(review),
    })
      .then(() => Router.push("/"))
      .catch();
    // TODO: handle errors
  };

  const SubmissionSelect = () => (
    <Grid container>
      {_.map(submissions, (s) => (
        <Grid item xs={12} key={s.id}>
          <Box display="flex" margin="10px">
            <Card
              style={{ width: "100%" }}
              onClick={() => handleSelectSubmission(s)}
            >
              <CardContent>
                <Typography variant="h5" component="h2">
                  {s.name}
                </Typography>
                <Typography color="textSecondary" gutterBottom>
                  {s.style}
                </Typography>
                <Typography color="textSecondary">Notes</Typography>
                <Typography variant="body2" component="p">
                  {s.notes === "" ? "N/A" : s.notes}
                </Typography>
              </CardContent>
              <CardActions>
                <Button size="small" variant="contained" color="primary">
                  Review
                </Button>
              </CardActions>
            </Card>
          </Box>
        </Grid>
      ))}
    </Grid>
  );

  const ScoreCard = (): JSX.Element => (
    <Grid container>
      <Grid item xs={12}>
        <Typography align="center" variant="h6">
          Scores
        </Typography>
      </Grid>
      <Grid item xs={12}>
        <RatingPicker
          category={aromaName}
          onChange={setAroma}
          currentVal={aroma}
        />
        <Grid item xs={12}>
          <RatingPicker
            category={appearanceName}
            onChange={setAppearance}
            currentVal={appearance}
          />
        </Grid>
        <RatingPicker
          category={flavorName}
          onChange={setFlavor}
          currentVal={flavor}
        />
        <RatingPicker
          category={mouthfeelName}
          onChange={setMouthfeel}
          currentVal={mouthfeel}
        />
        <RatingPicker
          category={styleAccuracyName}
          onChange={setStyleAccuracy}
          currentVal={styleAccuracy}
        />
      </Grid>
      <Grid item xs={6}>
        <Box justifyContent="center" display="flex" margin="10px">
          <Button color="primary" onClick={handleBack}>
            Back
          </Button>
        </Box>
      </Grid>
      <Grid item xs={6}>
        <Box justifyContent="center" display="flex" margin="10px">
          <Button
            color="primary"
            variant="contained"
            onClick={handleForward}
            disabled={anyNil(
              aroma,
              appearance,
              flavor,
              mouthfeel,
              styleAccuracy
            )}
          >
            Next
          </Button>
        </Box>
      </Grid>
    </Grid>
  );

  const SensoryPanel = (): JSX.Element => (
    <Grid container>
      <Grid item xs={12}>
        <Typography align="center" variant="h6">
          Sensory Panel
        </Typography>
      </Grid>
      {_.map(sensoryOptions, (option) => (
        <Grid item xs={6} key={"sensory-option-" + option.key}>
          <Box
            margin="5px"
            paddingTop="15%"
            paddingBottom="15%"
            borderRadius={8}
            borderColor={option.sensed ? "success.dark" : "primary.light"}
            bgcolor={option.sensed ? "action.selected" : "background.default"}
            border={option.sensed ? 4 : 2}
            onClick={() => option.toggle(!option.sensed)}
          >
            <Typography align="center">{option.displayName}</Typography>
            <Typography align="center">{option.emoji}</Typography>
          </Box>
        </Grid>
      ))}
      <Grid item xs={6} />
      <Grid item xs={6}>
        <Box justifyContent="center" display="flex" margin="10px">
          <Button color="primary" onClick={handleBack}>
            Back
          </Button>
        </Box>
      </Grid>
      <Grid item xs={6}>
        <Box justifyContent="center" display="flex" margin="10px">
          <Button color="primary" variant="contained" onClick={handleForward}>
            Next
          </Button>
        </Box>
      </Grid>
    </Grid>
  );

  const Confirmation = () => (
    <Grid container>
      <Grid item xs={12}>
        <Typography align="center" variant="h6">
          Confirmation
        </Typography>
      </Grid>
      <Grid item xs={12}>
        <Typography variant="subtitle1">Submission</Typography>
      </Grid>
      <Grid item xs={12}>
        <Box marginX="10%">
          <Typography variant="subtitle2">
            Name:{" "}
            <Typography display="inline" variant="body2">
              {submission.name}
            </Typography>
          </Typography>
          <Typography variant="subtitle2">
            Style:{" "}
            <Typography display="inline" variant="body2">
              {submission.style}
            </Typography>
          </Typography>
        </Box>
      </Grid>
      <Grid item xs={12}>
        <Box marginY="10px">
          <Divider />
        </Box>
      </Grid>
      <Grid item xs={12}>
        <Typography variant="subtitle1">Scores</Typography>
      </Grid>
      <Grid item xs={6}>
        <Box marginLeft="20%">
          <Typography variant="subtitle2">
            Aroma:{" "}
            <Typography display="inline" variant="body2">
              {aroma}
            </Typography>
          </Typography>
        </Box>
      </Grid>
      <Grid item xs={6}>
        <Box>
          <Typography variant="subtitle2">
            Appearance:{" "}
            <Typography display="inline" variant="body2">
              {appearance}
            </Typography>
          </Typography>
        </Box>
      </Grid>
      <Grid item xs={6}>
        <Box marginLeft="20%">
          <Typography variant="subtitle2">
            Flavor:{" "}
            <Typography display="inline" variant="body2">
              {flavor}
            </Typography>
          </Typography>
        </Box>
      </Grid>
      <Grid item xs={6}>
        <Box>
          <Typography variant="subtitle2">
            Mouthfeel:{" "}
            <Typography display="inline" variant="body2">
              {mouthfeel}
            </Typography>
          </Typography>
        </Box>
      </Grid>
      <Grid item xs={6}>
        <Box marginLeft="20%">
          <Typography variant="subtitle2">
            Style Accuracy:{" "}
            <Typography display="inline" variant="body2">
              {styleAccuracy}
            </Typography>
          </Typography>
        </Box>
      </Grid>
      <Grid item xs={12} style={{ paddingTop: "10px" }}>
        <Typography variant="subtitle1">Descriptors</Typography>
      </Grid>
      {_.map(filterDetected(sensoryOptions), (descriptor) => (
        <Grid item xs={6}>
          <Box
            marginX="auto"
            marginY="2px"
            display="flex"
            justifyContent="center"
          >
            <Chip
              label={descriptor.displayName + " " + descriptor.emoji}
              variant="outlined"
            ></Chip>
          </Box>
        </Grid>
      ))}
      <Grid item xs={12} style={{ paddingTop: "10px" }}>
        <Typography variant="subtitle1">Comments</Typography>
      </Grid>
      <Grid item xs={12}>
        <Box marginX="10%">
          {_.map(
            _.split(comments === "" ? "N/A" : comments, "\n"),
            (line, i) => (
              <Box key={"comment-line-" + i}>
                <Typography variant="caption" color="textSecondary">
                  {line}
                </Typography>
              </Box>
            )
          )}
        </Box>
      </Grid>
      <Grid item xs={6} style={{ paddingTop: "20px" }}>
        <Box justifyContent="center" display="flex" margin="10px">
          <Button color="primary" onClick={handleBack}>
            Back
          </Button>
        </Box>
      </Grid>
      <Grid item xs={6} style={{ paddingTop: "20px" }}>
        <Box justifyContent="center" display="flex" margin="10px">
          <Button color="primary" variant="contained" onClick={submit}>
            Next
          </Button>
        </Box>
      </Grid>
    </Grid>
  );

  const stages = [
    <SubmissionSelect />,
    <ScoreCard />,
    <SensoryPanel />,
    <Comments
      onChange={handleCommentsChange}
      forward={handleForward}
      backward={handleBack}
      current={comments}
    />,
    <Confirmation />,
  ];

  // TODO: used to test individual panels, remove when done developing
  //   return <Confirmation />;

  return _.map(stages, (child, i) => (
    <Slide
      key={"slide-" + i}
      direction={direction as "left" | "right" | "up" | "down"}
      in={i === current && !transitioning}
      mountOnEnter
      unmountOnExit
    >
      <div>{child}</div>
    </Slide>
  ));
}

// RatingPicker displays a small form with 5 buttons to select a rating
const RatingPicker = ({ category, onChange, currentVal }) => (
  <Box display="flex" margin="10px">
    <FormControl key={"score-" + category} fullWidth>
      <FormLabel>{_.capitalize(category)}</FormLabel>
      <Box display="flex" justifyContent="center">
        <RadioGroup row aria-label={category} name={category}>
          {_.map([1, 2, 3, 4, 5], (i) => (
            <FormControlLabel
              key={_.join(["score", category, i], "-")}
              style={{ marginLeft: "4px", marginRight: "4px" }}
              value={i}
              control={<Radio size="small" color="primary" />}
              label={i}
              labelPlacement="bottom"
              onChange={() => onChange(i)}
              checked={currentVal === i}
            />
          ))}
        </RadioGroup>
      </Box>
    </FormControl>
  </Box>
);

const Comments = ({ onChange, forward, backward, current }) => (
  <Grid container>
    <Grid item xs={12}>
      <Typography align="center" variant="h6">
        Additional Comments
      </Typography>
    </Grid>
    <Grid item xs={12}>
      <FormControl fullWidth>
        <Box padding="10px" bgcolor="action.selected" borderRadius={8}>
          <TextField
            multiline
            rows={12}
            rowsMax={12}
            defaultValue={current}
            onChange={onChange}
            id="comments"
            fullWidth
          />
        </Box>
        <FormHelperText>
          (optional) Additional feedback for the brewer. Suggestions, shout
          outs, overall impressions, etc.
        </FormHelperText>
      </FormControl>
    </Grid>
    <Grid item xs={6}>
      <Box justifyContent="center" display="flex" margin="10px">
        <Button color="primary" onClick={backward}>
          Back
        </Button>
      </Box>
    </Grid>
    <Grid item xs={6}>
      <Box justifyContent="center" display="flex" margin="10px">
        <Button color="primary" variant="contained" onClick={forward}>
          Next
        </Button>
      </Box>
    </Grid>
  </Grid>
);

export default ReviewPage;
