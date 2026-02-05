import { state } from "./state.js";

export const PRESETS = {
    button: {
      small: { font: 13, paddingX: 10, paddingY: 6 },
      medium: { font: 16, paddingX: 14, paddingY: 10 },
      large: { font: 20, paddingX: 20, paddingY: 14 },
    },
    card: {
      small: { font: 14, paddingX: 8, paddingY: 8 },
      medium: { font: 16, paddingX: 16, paddingY: 16 },
      large: { font: 18, paddingX: 24, paddingY: 24 },
    },
    header: {
      small: { font: 16, paddingX: 8, paddingY: 8 },
      medium: { font: 20, paddingX: 12, paddingY: 12 },
      large: { font: 26, paddingX: 16, paddingY: 16 },
    },
    badge: {
      small: { font: 12, paddingX: 6, paddingY: 6 },
      medium: { font: 14, paddingX: 8, paddingY: 8 },
      large: { font: 16, paddingX: 10, paddingY: 10 },
    },
    alert: {
      small: { font: 14, paddingX: 10, paddingY: 10 },
      medium: { font: 16, paddingX: 14, paddingY: 14 },
      large: { font: 18, paddingX: 18, paddingY: 18 },
    },
    input: {
      small: { font: 13, paddingX: 8, paddingY: 6 },
      medium: { font: 14, paddingX: 10, paddingY: 8 },
      large: { font: 16, paddingX: 12, paddingY: 10 },
    },
    modal: {
      small: { font: 14, paddingX: 10, paddingY: 10 },
      medium: { font: 16, paddingX: 12, paddingY: 12 },
      large: { font: 18, paddingX: 16, paddingY: 16 },
    },
  };

  export function getPreset(component, size) {
      const tokenPreset = state.tokens.sizes[size];
      return tokenPreset ?? PRESETS[component][size];
    }
