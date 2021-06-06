import {
  Box,
  Button,
  Card,
  CardActions,
  CardContent,
  Typography,
} from "@material-ui/core";
import _ from "lodash";
import React from "react";
import Meeting from "../lib/models/meetings";

interface MeetingCardProps {
  meeting: Meeting;
  onDelete: () => void;
}
const MeetingCard = ({ meeting, onDelete }: MeetingCardProps) => {
  return (
    <Card style={{ width: "100%" }} raised>
      <CardContent>
        <Typography variant="h6">{meeting.name}</Typography>
        <Typography>{meeting.location}</Typography>
        <Typography color="textSecondary" gutterBottom>
          {formatMeetingDate(new Date(meeting.date))}
        </Typography>
        <Box paddingY={0.5}>
          <Button>Open to Submissions</Button>
        </Box>
        <Box paddingY={0.5}>
          <Button>Open to Reviews</Button>
        </Box>
        <Box paddingY={0.5}>
          <Button color="secondary">Complete Meeting</Button>
        </Box>
        <Box paddingY={0.5}>
          <Button onClick={onDelete}>
            <Typography variant="button" color="error">
              Delete Meeting
            </Typography>
          </Button>
        </Box>
      </CardContent>
      <CardActions></CardActions>
    </Card>
  );
};

const formatMeetingDate = (d: Date): string => {
  return d.toLocaleDateString("en", {
    weekday: "short",
    year: "numeric",
    month: "long",
    day: "numeric",
    hour: "numeric",
    minute: "numeric",
  });
};

export default MeetingCard;
