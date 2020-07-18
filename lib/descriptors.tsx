import { useState } from "react";
import _ from "lodash";

export const descriptors = {
  acetaldehyde: {
    displayName: "Acetaldehyde",
    emoji: "🍏",
  },
  alcoholic: {
    displayName: "Alcoholic",
    emoji: "🥃",
  },
  astringent: {
    displayName: "Astringent",
    emoji: "🍵",
  },
  diacetyl: {
    displayName: "Diacetyl",
    emoji: "🧈",
  },
  dimethylSulfide: {
    displayName: "Dimethyl Sulfide",
    emoji: "🌽",
  },
  estery: {
    displayName: "Estery",
    emoji: "🍌",
  },
  grassy: {
    displayName: "Grassy",
    emoji: "🌱",
  },
  lightStruck: {
    displayName: "Light-Struck",
    emoji: "🌞",
  },
  metallic: {
    displayName: "Metallic",
    emoji: "🔧",
  },
  musty: {
    displayName: "Musty",
    emoji: "🍄",
  },
  oxidized: {
    displayName: "Oxidized",
    emoji: "📦",
  },
  phenolic: {
    displayName: "Phenolic",
    emoji: "💊",
  },
  solvent: {
    displayName: "Solvent",
    emoji: "🧪",
  },
  sourAcidic: {
    displayName: "Sour/Acidic",
    emoji: "🍋",
  },
  sulfur: {
    displayName: "Sulfur",
    emoji: "🥚",
  },
  vegetal: {
    displayName: "Vegetal",
    emoji: "🥦",
  },
  yeasty: {
    displayName: "Yeasty",
    emoji: "🍞",
  },
};

export default function useDescriptors() {
  return _.mapValues(descriptors, (d) => {
    const [detected, setDetected] = useState(false);
    return {
      key: _.camelCase(d.displayName),
      displayName: d.displayName,
      emoji: d.emoji,
      detected: detected,
      setDetected: setDetected,
    };
  });
}

export const filterDetected = (descriptors) => {
  return _.pickBy(descriptors, (d) => d.detected);
};
