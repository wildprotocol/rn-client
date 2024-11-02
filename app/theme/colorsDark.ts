const palette = {
  // TODO: Discuss which one do we like better?? @maxsorto
  primary100: "#B4F6A5",
  primary200: "#548C47",
  primary300: "#0C953A",
  primary400: "#4CAF50",

  chineseBlack: "#121212",
  chineseWhite: "#E0E0E0",
  charcoal: "#666666",
  brightGray: "#ECECEC",
  menthol: "#6DC75F",
  black: "#000000",
  chineseBlackII: "#3F4043",
  mayGreen: "#548C47",
  white: "#FFFFFF",
  fireOpal: "#E95844",
}

export const colors = {
  palette,
  transparent: "rgba(0, 0, 0, 0)",
  overlay: "rgba(0, 0, 0, 0.5)",
  border: "rgba(255, 255, 255, 0.12)",
  primary: palette.menthol,
  secondary: palette.mayGreen,
  black: palette.chineseBlack,
  white: palette.white,
  text: palette.chineseWhite,
  textDim: palette.charcoal,
  background: palette.chineseBlack,
  backgroundDim: palette.chineseBlackII,
  button: palette.chineseWhite,
  error: palette.fireOpal,
}
