// import { Typography } from "@material-ui/core";
// import Router from "next/router";
// import { useRequiredLogin } from "../../lib/user";
// import { useEffect, useState } from "react";
// import axios from "axios";
// import { useReviews } from "../../lib/api";
// import _ from "lodash";

// export default function Reviews() {
//   useRequiredLogin();

//   const { reviews, loading, error } = useReviews();

//   if (loading) {
//     return <Typography variant="h4">Loading...</Typography>;
//   } else if (!_.isNil(error)) {
//     return <Typography variant="h4">Oh no, an error :(</Typography>;
//   }

//   return <Typography variant="h4">{JSON.stringify(reviews)}</Typography>;
// }

import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardHeader from "@material-ui/core/CardHeader";
import CardContent from "@material-ui/core/CardContent";
import Typography from "@material-ui/core/Typography";
import { useReviews } from "../../lib/api";
import _ from "lodash";
import { Box, Grid } from "@material-ui/core";

// see: https://material-ui.com/components/cards/

const useStyles = makeStyles((theme) => ({
  root: {
    padding: 10,
  },
}));

export default function Reviews() {
  const { reviews, loading, error } = useReviews();

  return (
    <Grid container direction="column">
      <Box mx="auto">
        <Typography>Reviews of your beers</Typography>
      </Box>
      {_.map(reviews, (review) => (
        <ReviewCard review={review} key={review.id} />
      ))}
    </Grid>
  );
}

export function ReviewCard({ review }) {
  const classes = useStyles();
  return (
    <Box className={classes.root}>
      <Card>
        <CardHeader title="Beer name" subheader="Beer style" />
        <CardContent>
          <Typography variant="body2" color="textSecondary" component="p">
            Review info here.
          </Typography>
        </CardContent>
      </Card>
    </Box>
  );
}
