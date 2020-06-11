import { Typography, Grid, Button } from "@material-ui/core";

export default function Login(): JSX.Element {
  return (
    <Grid
      container
      spacing={0}
      direction="column"
      alignItems="center"
      justify="center"
      style={{ minHeight: "80vh" }}
    >
      <Typography variant="h5">Login to get to tasting! 🍻</Typography>
      <Button variant="contained" color="primary">
        <a href="/api/auth/login">Login</a>
      </Button>
    </Grid>
  );
}
