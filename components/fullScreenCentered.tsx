import { Grid, Typography, Button } from "@material-ui/core";

export const FullScreenCentered = ({ children }) => (
  <Grid
    container
    spacing={0}
    direction="column"
    alignItems="center"
    justify="center"
    style={{ minHeight: "80vh" }}
  >
    {children}
  </Grid>
);
