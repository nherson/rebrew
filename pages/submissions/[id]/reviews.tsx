import { Grid, Typography, Box, Paper } from "@material-ui/core";
import _ from "lodash";
import { useRouter } from "next/router";
import { useReviews, useSubmission } from "../../../lib/api";
import Review from "../../../components/review";
import { styles } from "../../../lib/bjcp";
import { FullScreenLoading } from "../../../components/fullScreenLoading";
import { FullScreenError } from "../../../components/fullScreenError";
import { FullScreenErrorUnexpected } from "../../../components/fullScreenErrorUnexpected";

const Reviews = () => {
  const router = useRouter();
  const { id } = router.query;

  const { submission, loading, error } = useSubmission(id as string);

  if (error) {
    return <FullScreenErrorUnexpected />;
  } else if (loading) {
    return <FullScreenLoading />;
  } else if (
    _.isNil(_.get(submission, "reviews", null)) ||
    submission.reviews.length === 0
  ) {
    return (
      <FullScreenError
        text={`${submission.name} has not received any reviews yet 🥺`}
        backButton
      />
    );
  }

  return (
    <Grid container>
      <Grid item xs={12}>
        <Typography align="center" variant="h6">
          Reviews for: {submission.name}
        </Typography>
        <Typography align="center" variant="subtitle1">
          {submission.style} - {styles[submission.style]}
        </Typography>
      </Grid>
      {_.map(submission.reviews, (r, i) => (
        <Grid item xs={12}>
          <Box display="flex" margin="10px">
            <Paper>
              <Box display="flex" margin="10px">
                <Review review={r} />
              </Box>
            </Paper>
          </Box>
        </Grid>
      ))}
    </Grid>
  );
};

export default Reviews;
