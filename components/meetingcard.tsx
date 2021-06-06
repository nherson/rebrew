import {
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
}
const MeetingCard = ({ meeting }: MeetingCardProps) => {
  return (
    <Card style={{ width: "100%" }} raised>
      <CardContent>
        <Typography variant="h6">{meeting.name}</Typography>
        <Typography>{meeting.location}</Typography>
        <Typography color="textSecondary" gutterBottom>
          {formatMeetingDate(meeting.date)}
        </Typography>
      </CardContent>
      <CardActions>
        <Button color="secondary">Done</Button>
        <Button>Open</Button>
        <Button>Archive</Button>
      </CardActions>
    </Card>
  );
};

const formatMeetingDate = (d: Date): string => {
  return "Mon June 7 2021, 7pm";
};

export default MeetingCard;
