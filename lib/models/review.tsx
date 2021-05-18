import Submission from "./submission";

class Review {
  id: string;

  aromaScore: number;
  appearanceScore: number;
  flavorScore: number;
  mouthfeelScore: number;
  styleScore: number;

  comments: string;

  submissionId: string;
  submission?: Submission;

  /*
   * DESCRIPTOR BOOLEANS
   */
  acetaldehyde: boolean;
  alcoholic: boolean;
  astringent: boolean;
  diacetyl: boolean;
  dimethylSulfide: boolean;
  estery: boolean;
  grassy: boolean;
  lightStruck: boolean;
  metallic: boolean;
  musty: boolean;
  oxidized: boolean;
  phenolic: boolean;
  solvent: boolean;
  sourAcidic: boolean;
  sulfur: boolean;
  vegetal: boolean;
  yeasty: boolean;
}

export default Review;
