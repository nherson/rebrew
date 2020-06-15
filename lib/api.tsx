import { useEffect, useState, Dispatch } from "react";
import Review from "./models/review";
import axios from "axios";
import Submission from "./models/submission";
import { NextApiResponse, NextApiRequest } from "next";

export function useReviews() {
  const [loading, setLoading] = useState(true);
  const [reviews, setReviews]: [
    Array<Review>,
    Dispatch<Array<Review>>
  ] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const resp = await axios("/api/reviews");
        setReviews(resp.data);
      } catch (e) {
        setError(e);
      }
      setLoading(false);
    };
    fetchData();
  }, []);

  return { reviews, loading, error };
}

export function useSubmissions() {
  const [loading, setLoading] = useState(true);
  const [submissions, setSubmissions]: [
    Array<Submission>,
    Dispatch<Array<Submission>>
  ] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const resp = await axios("/api/submissions");
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
