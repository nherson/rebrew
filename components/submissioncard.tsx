import {
  Card,
  CardContent,
  Typography,
  CardActions,
  Button,
  Divider,
  Box,
  Icon,
} from "@material-ui/core";
import { styles } from "../lib/bjcp";
import Submission from "../lib/models/submission";
import _ from "lodash";
import Link from "next/link";
import React from "react";
import { Warning } from "@material-ui/icons";

interface SubmissionCardProps {
  submission: Submission;
  link?: string;
  callback?: (s: Submission) => void;
  selectText: string;
}
const SubmissionCard = ({
  submission,
  link,
  callback,
  selectText,
}: SubmissionCardProps) => {
  let button;
  if (!_.isNil(link)) {
    button = (
      <Button size="small" variant="contained" color="primary">
        <Link href={link}>{selectText}</Link>
      </Button>
    );
  } else if (!_.isNil(callback)) {
    button = (
      <Button
        size="small"
        variant="contained"
        color="primary"
        onClick={() => callback(submission)}
      >
        {selectText}
      </Button>
    );
  }

  return (
    <Card style={{ width: "100%" }} raised>
      <CardContent>
        <Box>
          <Typography variant="h6">{submission.name}</Typography>
          <Typography color="textSecondary" gutterBottom>
            {submission.style} - {styles[submission.style]}
          </Typography>
        </Box>

        {containsAllergen(submission) && (
          <>
            <Box marginY={2}>
              <Divider />
            </Box>
            <Box>
              <Box display="flex" flexDirection="right">
                <Box marginRight={1}>
                  <Warning color="error" />
                </Box>
                <Box>
                  <Typography>Allergen Warnings</Typography>
                </Box>
              </Box>
              {submission.containsNuts !== null && (
                <Box marginX={2} display="flex" flexDirection="right">
                  <Typography variant="body2">
                    <strong>Nuts:</strong>
                    {` ${submission.containsNuts}`}
                  </Typography>
                </Box>
              )}
              {submission.containsDairy !== null && (
                <Box marginX={2} display="flex" flexDirection="right">
                  <Typography variant="body2">
                    <strong>Dairy:</strong>
                    {` ${submission.containsDairy}`}
                  </Typography>
                </Box>
              )}
              {submission.containsFruit !== null && (
                <Box marginX={2} display="flex" flexDirection="right">
                  <Typography variant="body2">
                    <strong>Fruit:</strong>
                    {` ${submission.containsFruit}`}
                  </Typography>
                </Box>
              )}
            </Box>
          </>
        )}

        {submission.notes && (
          <>
            <Box marginY={2}>
              <Divider />
            </Box>
            <Box>
              <Typography>Notes</Typography>
              <Typography variant="body2" component="p">
                {submission.notes === "" ? "N/A" : submission.notes}
              </Typography>
            </Box>
          </>
        )}
      </CardContent>
      <CardActions>{button}</CardActions>
    </Card>
  );
};

const containsAllergen = (submission: Submission): boolean => {
  return (
    submission.containsNuts !== null ||
    submission.containsDairy !== null ||
    submission.containsFruit !== null
  );
};

export default SubmissionCard;
