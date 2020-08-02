import {
  Card,
  CardContent,
  Typography,
  CardActions,
  Button,
} from "@material-ui/core";
import { styles } from "../lib/bjcp";
import Submission from "../lib/models/submission";
import _ from "lodash";
import Link from "next/link";

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
        <Typography variant="h6">{submission.name}</Typography>
        <Typography color="textSecondary" gutterBottom>
          {submission.style} - {styles[submission.style]}
        </Typography>
        <Typography color="textSecondary">Notes</Typography>
        <Typography variant="body2" component="p">
          {submission.notes === "" ? "N/A" : submission.notes}
        </Typography>
      </CardContent>
      <CardActions>{button}</CardActions>
    </Card>
  );
};

export default SubmissionCard;
