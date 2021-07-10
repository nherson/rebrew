import {
  Box,
  Button,
  Card,
  CardActions,
  CardContent,
  Switch,
  Typography,
} from "@material-ui/core";
import _ from "lodash";
import React from "react";
import Meeting, { IMeeting } from "../lib/models/meetings";

interface MeetingCardProps {
  meeting: IMeeting;
  onDelete: () => void;
  onToggleOpenToReviews: () => void;
  onToggleOpenToSubmissions: () => void;
}
const MeetingCard = ({
  meeting,
  onDelete,
  onToggleOpenToReviews,
  onToggleOpenToSubmissions,
}: MeetingCardProps) => {
  return (
    <Card style={{ width: "100%" }} raised>
      <CardContent>
        <Typography variant="h6">{meeting.name}</Typography>
        <Typography>{meeting.location}</Typography>
        <Typography color="textSecondary" gutterBottom>
          {new Meeting(meeting).formatDate()}
        </Typography>
        <Box
          paddingY={0.5}
          display="flex"
          flexDirection="row"
          alignItems="center"
        >
          <Box>
            <Switch
              checked={meeting.openToSubmissions}
              value={meeting.openToSubmissions}
              onClick={onToggleOpenToSubmissions}
            />
          </Box>
          <Box>
            <Typography>Open to submissions</Typography>
          </Box>
        </Box>
        <Box
          paddingY={0.5}
          display="flex"
          flexDirection="row"
          alignItems="center"
        >
          <Box>
            <Switch
              checked={meeting.openToReviews}
              value={meeting.openToReviews}
              onClick={onToggleOpenToReviews}
            />
          </Box>
          <Box>
            <Typography>Open to reviews</Typography>
          </Box>
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

export default MeetingCard;
