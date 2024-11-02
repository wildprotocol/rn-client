const palette = {
  // neutral900: "#FFFFFF",
  // neutral800: "#F4F2F1",
  // neutral700: "#D7CEC9",
  // neutral600: "#B6ACA6",
  // neutral500: "#978F8A",
  // neutral400: "#564E4A",
  // neutral300: "#3C3836",
  // neutral200: "#191015",
  // neutral100: "#000000",

  // secondary500: "#DCDDE9",
  // secondary400: "#BCC0D6",
  // secondary300: "#9196B9",
  // secondary200: "#626894",
  // secondary100: "#41476E",

  // accent500: "#FFEED4",
  // accent400: "#FFE1B2",
  // accent300: "#FDD495",
  // accent200: "#FBC878",
  // accent100: "#FFBB50",

  // overlay20: "rgba(25, 16, 21, 0.2)",
  // overlay50: "rgba(25, 16, 21, 0.5)",

  // TODO: Discuss which one do we like better?? @maxsorto
  primary100: "#B4F6A5",
  primary200: "#548C47",
  primary300: "#0C953A",
  primary400: "#4CAF50",

  chineseBlack: "#0F141A",
  chineseWhite: "#E0E0E0",
  charcoal: "#3A4A5A",
  brightGray: "#ECECEC",
  menthol: "#6DC75F",
  black: "#000000",
  mayGreen: "#548C47",
  white: "#FFFFFF",
  fireOpal: "#E95844",
}

export const colors = {
  palette,
  transparent: "rgba(0, 0, 0, 0)",
  overlay: "rgba(0, 0, 0, 0.5)",
  border: "rgba(128, 128, 128, 0.356)",
  primary: palette.menthol,
  secondary: palette.mayGreen,
  black: palette.chineseBlack,
  white: palette.white,
  text: palette.chineseBlack,
  textDim: palette.charcoal,
  background: palette.brightGray,
  backgroundDim: palette.chineseWhite,
  button: palette.chineseWhite,
  error: palette.fireOpal,
}
