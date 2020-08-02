import { FullScreenCentered } from "./fullScreenCentered";
import { Typography, Button, Box } from "@material-ui/core";
import _ from "lodash";
import { useRouter } from "next/router";

interface Props {
  text: string;
  backButton?: boolean;
}
export const FullScreenError = ({ text, backButton }: Props) => {
  const router = useRouter();
  const handleBack = () => {
    router.back();
  };
  return (
    <FullScreenCentered>
      <Box paddingX={4} paddingY={1}>
        <Typography align="center" color="textSecondary">
          {text}
        </Typography>
      </Box>
      {backButton && (
        <Button color="primary" onClick={handleBack}>
          Back
        </Button>
      )}
    </FullScreenCentered>
  );
};
