export let state = {
  component: "button",
  variant: "primary",
  size: "medium",
  text: "",
  text2: "",
  fontSizeAdjust: 0,
  paddingXAdjust: 0,
  paddingYAdjust: 0,

  radius: 8,
  bgColor: "#4a78ff",
  textColor: "#ffffff",

  overrides: {
    radius: false,
    bgColor: false,
    textColor: false,
    fontSize: false,
    paddingX: false,
    paddingY: false,
  },

  fontFamily: "system-ui",
  animation: "none",

  tokens: {
    primary: "#4a78ff",
    secondary: "#335bef",
    text: "#ffffff",
    radius: 8,
    sizes: {
      small: { font: 13, paddingX: 6, paddingY: 6 },
      medium: { font: 16, paddingX: 10, paddingY: 10 },
      large: { font: 20, paddingX: 14, paddingY: 14 },
    },
  },
};