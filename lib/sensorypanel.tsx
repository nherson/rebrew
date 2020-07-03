import { useState } from "react";
import _ from "lodash";

const choices = [
  {
    displayName: "Acetaldehyde",
    emoji: "🍏",
  },
  {
    displayName: "Alcoholic",
    emoji: "🥃",
  },
  {
    displayName: "Astringent",
    emoji: "🍵",
  },
  {
    displayName: "Diacetyl",
    emoji: "🧈",
  },
  {
    displayName: "Dimethyl Sulfide",
    emoji: "🌽",
  },
  {
    displayName: "Estery",
    emoji: "🍌",
  },
  {
    displayName: "Grassy",
    emoji: "🌱",
  },
  {
    displayName: "Light-Struck",
    emoji: "🌞",
  },
  {
    displayName: "Metallic",
    emoji: "🔧",
  },
  {
    displayName: "Musty",
    emoji: "🍄",
  },
  {
    displayName: "Oxidized",
    emoji: "📦",
  },
  {
    displayName: "Phenolic",
    emoji: "💊",
  },
  {
    displayName: "Solvent",
    emoji: "🧪",
  },
  {
    displayName: "Sour/Acidic",
    emoji: "🍋",
  },
  {
    displayName: "Sulfur",
    emoji: "🥚",
  },
  {
    displayName: "Vegetal",
    emoji: "🥦",
  },
  {
    displayName: "Yeasty",
    emoji: "🍞",
  },
];

interface Descriptor {
  key: string;
  displayName: string;
  emoji: string;
  sensed: boolean;
  toggle: (b: boolean) => void;
}

export default function useSensoryPanel(): Descriptor[] {
  return _.map(choices, (sensoryChoice) => {
    const [sensed, setSensed] = useState(false);
    return {
      key: _.camelCase(sensoryChoice.displayName),
      displayName: sensoryChoice.displayName,
      emoji: sensoryChoice.emoji,
      sensed: sensed,
      toggle: setSensed,
    };
  });
}

export const filterDetected = (descriptors: Descriptor[]): Descriptor[] => {
  return _.filter(descriptors, (d) => d.sensed);
};
