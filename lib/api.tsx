import { useEffect, useState, Dispatch } from "react";
import Review from "./models/review";
import axios from "axios";
import Submission from "./models/submission";
import _ from "lodash";
import Meeting from "./models/meetings";

interface UseReviewsConfig {
  submissionId: string;
}
export function useReviews(cfg: UseReviewsConfig) {
  const [loading, setLoading] = useState(true);
  const [reviews, setReviews]: [Array<Review>, Dispatch<Array<Review>>] =
    useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const resp = await axios(
          "/api/submissions/" + cfg.submissionId + "/reviews"
        );
        setReviews(resp.data);
      } catch (e) {
        setError(e);
      }
      setLoading(false);
    };
    if (!_.isNil(cfg.submissionId)) {
      fetchData();
    }
  }, [cfg.submissionId]);

  return { reviews, loading, error };
}

interface UseSubmissionsConfig {
  userOnly: boolean;
}
export function useSubmissions(cfg: UseSubmissionsConfig) {
  const suffix = cfg.userOnly ? "" : "?all=1";
  const [loading, setLoading] = useState(true);
  const [submissions, setSubmissions]: [
    Array<Submission>,
    Dispatch<Array<Submission>>
  ] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const resp = await axios("/api/submissions" + suffix);
        setSubmissions(resp.data);
      } catch (e) {
        setError(e);
      }
      setLoading(false);
    };
    fetchData();
  }, []);

  return { submissions, loading, error };
}

export function useSubmission(id: string) {
  const [loading, setLoading] = useState(true);
  const [submission, setSubmission]: [Submission, Dispatch<Submission>] =
    useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const resp = await axios("/api/submissions/" + id);
        setSubmission(resp.data);
      } catch (e) {
        setError(e);
      }
      setLoading(false);
    };
    if (!_.isNil(id)) {
      fetchData();
    }
  }, [id]);

  return { submission, loading, error };
}
