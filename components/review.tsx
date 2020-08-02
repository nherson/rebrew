import { Grid, Typography, Box, Chip } from "@material-ui/core";
import _ from "lodash";
import { descriptors } from "../lib/descriptors";

const Review = ({ review }) => (
  <Grid container>
    <Grid item xs={12}>
      <Typography variant="subtitle1">Scores</Typography>
    </Grid>
    <Grid item xs={6}>
      <Box marginLeft="20%">
        <Typography variant="subtitle2">
          Aroma:{" "}
          <Typography display="inline" variant="body2">
            {review.aromaScore}
          </Typography>
        </Typography>
      </Box>
    </Grid>
    <Grid item xs={6}>
      <Box>
        <Typography variant="subtitle2">
          Appearance:{" "}
          <Typography display="inline" variant="body2">
            {review.appearanceScore}
          </Typography>
        </Typography>
      </Box>
    </Grid>
    <Grid item xs={6}>
      <Box marginLeft="20%">
        <Typography variant="subtitle2">
          Flavor:{" "}
          <Typography display="inline" variant="body2">
            {review.flavorScore}
          </Typography>
        </Typography>
      </Box>
    </Grid>
    <Grid item xs={6}>
      <Box>
        <Typography variant="subtitle2">
          Mouthfeel:{" "}
          <Typography display="inline" variant="body2">
            {review.mouthfeelScore}
          </Typography>
        </Typography>
      </Box>
    </Grid>
    <Grid item xs={6}>
      <Box marginLeft="20%">
        <Typography variant="subtitle2">
          Style Accuracy:{" "}
          <Typography display="inline" variant="body2">
            {review.styleScore}
          </Typography>
        </Typography>
      </Box>
    </Grid>
    <Grid item xs={12} style={{ paddingTop: "10px" }}>
      <Typography variant="subtitle1">Descriptors</Typography>
    </Grid>
    {_.size(getDescriptors(review)) === 0 ? (
      <Box marginX="10%">
        <Typography variant="caption" color="textSecondary">
          N/A
        </Typography>
      </Box>
    ) : (
      _.map(_.toPairs(getDescriptors(review)), ([key, toggled], i) => (
        <Grid item xs={6}>
          <Box
            key={"descriptor-detected-" + i}
            padding={0.5}
            display="flex"
            justifyContent="center"
          >
            <Chip
              className="descriptor-chip"
              label={
                descriptors[key].displayName + " " + descriptors[key].emoji
              }
            ></Chip>
          </Box>
        </Grid>
      ))
    )}
    <Grid item xs={12} style={{ paddingTop: "10px" }}>
      <Typography variant="subtitle1">Comments</Typography>
    </Grid>
    <Grid item xs={12}>
      <Box marginX="10%">
        {_.map(
          _.split(review.comments === "" ? "N/A" : review.comments, "\n"),
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
  </Grid>
);

const getDescriptors = (review) => _.pickBy(review, (v) => v === true);

export default Review;
