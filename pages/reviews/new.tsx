import Head from "next/head";
import Link from "next/link";
import Router from "next/router";
import {
  Box,
  Typography,
  Grid,
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
import fetch from "../../lib/fetch";
import { useRequiredLogin } from "../../lib/user";
import { useSubmissions } from "../../lib/api";
import useDescriptors from "../../lib/descriptors";
import { anyNil } from "../../lib/helpers";
import { styles } from "../../lib/bjcp";
import Review from "../../components/review";
import SubmissionCard from "../../components/submissioncard";

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
  const { submissions, loading, error } = useSubmissions({
    userOnly: false,
  });
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

  // State for distinct sensory descriptors detected
  const descriptors = useDescriptors();

  // State for reviewer comments
  const [comments, setComments] = useState("");
  const handleCommentsChange = (event) => setComments(event.target.value);

  const review = _.merge(
    {
      aromaScore: aroma,
      appearanceScore: appearance,
      flavorScore: flavor,
      mouthfeelScore: mouthfeel,
      styleScore: styleAccuracy,
      submissionId: _.isNil(submission) ? "" : submission.id,
      comments: comments,
    },
    _.mapValues(descriptors, (d) => d.detected)
  );

  const submit = function () {
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
            <SubmissionCard
              submission={s}
              selectText="Review"
              callback={handleSelectSubmission}
            />
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

  const DescriptorPanel = (): JSX.Element => (
    <Grid container>
      <Grid item xs={12}>
        <Typography align="center" variant="h6">
          Sensory Descriptors
        </Typography>
      </Grid>
      {_.map(descriptors, (d) => (
        <Grid item xs={6} key={"descriptor-option-" + d.key}>
          <Box
            margin="5px"
            paddingTop="15%"
            paddingBottom="15%"
            borderRadius={8}
            borderColor={d.detected ? "success.dark" : "primary.light"}
            bgcolor={d.detected ? "action.selected" : "background.default"}
            border={d.detected ? 4 : 2}
            onClick={() => d.setDetected(!d.detected)}
          >
            <Typography align="center">{d.displayName}</Typography>
            <Typography align="center">{d.emoji}</Typography>
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
              {submission.style} - {styles[submission.style]}
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
        <Review review={review} />
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
            Submit
          </Button>
        </Box>
      </Grid>
    </Grid>
  );

  const stages = [
    <SubmissionSelect />,
    <ScoreCard />,
    <DescriptorPanel />,
    <Comments
      onChange={handleCommentsChange}
      forward={handleForward}
      backward={handleBack}
      current={comments}
    />,
    <Confirmation />,
  ];

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
