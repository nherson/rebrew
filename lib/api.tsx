import { useEffect, useState, Dispatch } from "react";
import Review from "./models/review";
import axios from "axios";

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
