import { Typography, Box, Button } from "@material-ui/core";
import _ from "lodash";

export default function SubmissionSelect({ submissions, callback }) {
  console.log("RENDER", submissions);
  return (
    <Box>
      {_.map(submissions, (s) => {
        return (
          <Button
            onClick={() => {
              callback(s.id);
            }}
          >
            {s.style} - {s.name} asdasd
          </Button>
        );
      })}
    </Box>
  );
}
