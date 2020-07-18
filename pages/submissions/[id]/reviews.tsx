import { Grid, Typography, Box, Paper } from "@material-ui/core";
import _ from "lodash";
import { useRouter } from "next/router";
import { useReviews, useSubmission } from "../../../lib/api";
import Review from "../../../components/review";
import { styles } from "../../../lib/bjcp";

const Reviews = () => {
  const router = useRouter();
  const { id } = router.query;

  const { submission, loading, error } = useSubmission(id as string);

  if (loading) {
    return <Typography>Loading</Typography>;
  } else if (error) {
    return <Typography>Error!</Typography>;
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
