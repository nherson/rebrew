import { Grid, Typography, Box } from "@material-ui/core";
import { useSubmissions } from "../../lib/api";
import _ from "lodash";
import SubmissionCard from "../../components/submissioncard";

const Submissions = () => {
  const { submissions, loading, error } = useSubmissions({
    userOnly: true,
  });
  //   if (loading) {
  //     return (
  //       <Grid item xs={12}>
  //         <Typography align="center" variant="h6">
  //           Loading
  //         </Typography>
  //       </Grid>
  //     );
  //   }
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
