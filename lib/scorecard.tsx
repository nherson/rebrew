import { useState } from "react";

export default function useScorecard() {
  const [aroma, setAroma] = useState(null);
  const [appearance, setAppearance] = useState(null);
  const [flavor, setFlavor] = useState(null);
  const [mouthFeel, setMouthFeel] = useState(null);
  const [styleAccuracy, setStyleAccuracy] = useState(null);
  const [comments, setComments] = useState("");

  return {
    aroma,
    setAroma,
    appearance,
    setAppearance,
    flavor,
    setFlavor,
    mouthFeel,
    setMouthFeel,
    styleAccuracy,
    setStyleAccuracy,
    comments,
    setComments,
  };
}
