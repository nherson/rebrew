import { Grid, Box } from "@material-ui/core";

const p = {
  backgroundColor: "red",
  padding: 20,
};

export default function playground({ children }) {
  return (
    <Grid container spacing={4} style={{ padding: "20px" }}>
      <Grid item spacing={4} xs={12}>
        <Box style={p}>hi</Box>
      </Grid>
      <Grid item xs={12} style={p}>
        there
      </Grid>
    </Grid>
  );
}
