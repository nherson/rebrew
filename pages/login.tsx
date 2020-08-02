import { Typography, Button, Box } from "@material-ui/core";
import { FullScreenCentered } from "../components/fullScreenCentered";

export default function Login(): JSX.Element {
  return (
    <FullScreenCentered>
      <Box paddingY={1}>
        <Typography align="center" variant="h5">
          Login to get to tasting! 🍻
        </Typography>
      </Box>

      <Button variant="contained" color="primary">
        <a href="/api/auth/login">Login</a>
      </Button>
    </FullScreenCentered>
  );
}
