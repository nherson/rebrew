import Review from "./review";

class Submission {
  id: string;
  name: string;
  style: string;
  notes: string;
  email: string;
  reviews?: Review[];
  meetingId: string;
  containsNuts?: string;
  containsDairy?: string;
  containsFruit?: string;
}

export default Submission;
