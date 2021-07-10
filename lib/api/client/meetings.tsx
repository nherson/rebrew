import axios from "axios";
import _ from "lodash";
import { Dispatch, useEffect, useState } from "react";
import Meeting, { IMeeting } from "../../models/meetings";

export function useMeetings() {
  const [loading, setLoading] = useState(true);
  const [meetings, setMeetings]: [Array<IMeeting>, Dispatch<Array<IMeeting>>] =
    useState(new Array<IMeeting>());
  const [error, setError] = useState<Error | null>(null);
  const [refreshToggle, setRefreshToggle] = useState(false);

  const refresh = () => {
    setRefreshToggle(!refreshToggle);
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const resp = await axios("/api/meetings");
        setMeetings(_.map(resp.data as IMeeting[]));
      } catch (e) {
        setError(e);
      }
      setLoading(false);
    };
    fetchData();
  }, [refreshToggle]);

  return { meetings, loading, error, refresh };
}

export const useMeetingsOpenToSubmissions = () => {
  const { meetings, loading, error } = useMeetings();

  return {
    meetings: _.filter(meetings, (m) => m.openToSubmissions),
    loading,
    error,
  };
};

// Returns a promise to create a meeting
export const CreateMeeting = async (meeting: IMeeting) => {
  await fetch("/api/meetings", {
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
    },
    method: "POST",
    body: JSON.stringify(meeting),
  });
};
