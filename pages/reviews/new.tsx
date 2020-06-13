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
} from "@material-ui/core";
import Button from "@material-ui/core/Button";
import React, { useState } from "react";
import _ from "lodash";
import ScoreCard from "../../components/scorecard";
import fetch from "../../lib/fetch";
import { useRequiredLogin } from "../../lib/user";

const AROMA_STAGE = 0;
const APPEARANCE_STAGE = 1;
const FLAVOR_STAGE = 2;
const MOUTHFEEL_STAGE = 3;
const STYLE_ACCURACY_STAGE = 4;
const CONFIRMATION_STAGE = 5;

function ReviewPage() {
  useRequiredLogin();

  const [aroma, setAroma] = useState(null);
  const [appearance, setAppearance] = useState(null);
  const [flavor, setFlavor] = useState(null);
  const [mouthfeel, setMouthfeel] = useState(null);
  const [styleAccuracy, setStyleAccuracy] = useState(null);
  const [comments, setComments] = useState("");

  // use a lookup array to determine if the "Next" button should be disabled
  const scores = [aroma, appearance, flavor, mouthfeel, styleAccuracy];

  const [stage, setStage] = useState(0);

  const submit = function () {
    const review = {
      aromaScore: aroma,
      appearanceScore: appearance,
      flavorScore: flavor,
      mouthfeelScore: mouthfeel,
      styleScore: styleAccuracy,
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

  const stageViews = [
    <ScoreCard callback={setAroma} category="aroma" selected={aroma} />,
    <ScoreCard
      callback={setAppearance}
      category="appearance"
      selected={appearance}
    />,
    <ScoreCard callback={setFlavor} category="flavor" selected={flavor} />,
    <ScoreCard
      callback={setMouthfeel}
      category="mouthfeel"
      selected={mouthfeel}
    />,
    <ScoreCard
      callback={setStyleAccuracy}
      category="style accuracy"
      selected={styleAccuracy}
    />,
    <Typography>
      {JSON.stringify({
        aroma,
        appearance,
        flavor,
        mouthfeel,
        styleAccuracy,
      })}
    </Typography>,
  ];

  return (
    <Grid
      container
      spacing={0}
      direction="column"
      alignItems="center"
      justify="space-between"
      style={{ minHeight: "80vh" }}
    >
      {stageViews[stage]}
      <Box flex={1} flexDirection="row" justifyContent="stretch">
        {stage === AROMA_STAGE ? (
          <Button color="primary">
            <Link href="/">
              <a>Cancel</a>
            </Link>
          </Button>
        ) : (
          <Button
            color="primary"
            onClick={() => {
              setStage(stage - 1);
            }}
          >
            Back
          </Button>
        )}
        {stage === CONFIRMATION_STAGE ? (
          <Button color="primary" variant="contained" onClick={submit}>
            Submit
          </Button>
        ) : (
          <Button
            color="primary"
            variant="contained"
            onClick={() => {
              setStage(stage + 1);
            }}
            disabled={_.isNil(_.get(scores, stage))}
          >
            Next
          </Button>
        )}
      </Box>
    </Grid>
  );
}

export default ReviewPage;
