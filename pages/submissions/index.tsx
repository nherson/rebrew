import { Grid, Typography, Box } from "@material-ui/core";
import { useSubmissions } from "../../lib/api";
import _ from "lodash";
import SubmissionCard from "../../components/submissioncard";
import { FullScreenErrorUnexpected } from "../../components/fullScreenErrorUnexpected";
import { FullScreenLoading } from "../../components/fullScreenLoading";
import { FullScreenError } from "../../components/fullScreenError";

const Submissions = () => {
  const { submissions, loading, error } = useSubmissions({
    userOnly: true,
  });

  if (error) {
    return <FullScreenErrorUnexpected />;
  } else if (loading) {
    return <FullScreenLoading />;
  } else if (!_.isNil(submissions) && submissions.length === 0) {
    return (
      <FullScreenError
        text="You currently have no submitted beers available for review 🤔"
        backButton
      />
    );
  }

  return (
    <Grid container>
      <Grid item xs={12}>
        <Typography align="center" variant="h6">
          My Submissions
        </Typography>
      </Grid>
      {_.map(submissions, (s, i) => (
        <Grid item xs={12} key={i}>
          <Box display="flex" margin="10px">
            <SubmissionCard
              key={i}
              submission={s}
              selectText="See Reviews"
              link={"/submissions/" + s.id + "/reviews"}
            />
          </Box>
        </Grid>
      ))}
    </Grid>
  );
};

export default Submissions;
