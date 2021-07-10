import axios from "axios";
import { Dispatch, useEffect, useState } from "react";
import { useSubmissions } from "../../api";
import { IMeeting } from "../../models/meetings";
import Submission from "../../models/submission";
import { useMeetings } from "./meetings";

// Fetches all submissions which belong to meetings that are marked 'openToReview: true'
export function useSubmissionsOpenToReviews() {
  const {
    meetings,
    loading: meetingsLoading,
    error: meetingsError,
  } = useMeetings();

  const {
    submissions: allSubmissions,
    loading: submissionsLoading,
    error: submissionsError,
  } = useSubmissions({ userOnly: false });

  const [loading, setLoading] = useState(true);
  const [submissions, setSubmissions]: [
    Array<Submission>,
    Dispatch<Array<Submission>>
  ] = useState(null);

  useEffect(() => {
    if (!meetingsLoading && !submissionsLoading) {
      // Build a fast lookup map by meeting ID
      var meetingMap: { [key: string]: IMeeting } = {};
      for (var i = 0; i < meetings.length; i++) {
        meetingMap[meetings[i].id] = meetings[i];
      }

      const submissionsOpenToReviews = new Array<Submission>();
      for (var i = 0; i < allSubmissions.length; i++) {
        const s = allSubmissions[i];
        const m = meetingMap[s.meetingId];
        if (m && m.openToReviews) {
          submissionsOpenToReviews.push(s);
        }
        setSubmissions(submissionsOpenToReviews);
        setLoading(false);
      }
    }
  }, [meetingsLoading, submissionsLoading]);

  return {
    loading: meetingsLoading || submissionsLoading,
    error: meetingsError ? meetingsError : submissionsError,
    submissions,
  };
}
