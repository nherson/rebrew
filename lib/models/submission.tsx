import Review from "./review";

class Submission {
  id: string;
  name: string;
  style: string;
  notes: string;
  email: string;
  reviews?: Review[];
}

export default Submission;
