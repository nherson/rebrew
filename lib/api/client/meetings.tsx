import axios from "axios";
import { Dispatch, useEffect, useState } from "react";
import Meeting from "../../models/meetings";

export function useMeetings() {
  const [loading, setLoading] = useState(true);
  const [meetings, setMeetings]: [Array<Meeting>, Dispatch<Array<Meeting>>] =
    useState(new Array<Meeting>());
  const [error, setError] = useState(null);
  const [refreshToggle, setRefreshToggle] = useState(false);

  const refresh = () => {
    setRefreshToggle(!refreshToggle);
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const resp = await axios("/api/meetings");
        setMeetings(resp.data);
      } catch (e) {
        setError(e);
      }
      setLoading(false);
    };
    fetchData();
  }, [refreshToggle]);

  return { meetings, loading, error, refresh };
}

// Returns a promise to create a meeting
export const CreateMeeting = async (meeting: Meeting) => {
  await fetch("/api/meetings", {
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
    },
    method: "POST",
    body: JSON.stringify(meeting),
  });
};
