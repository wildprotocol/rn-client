import { Platform } from "react-native"

export const customFontsToLoad = {
  outfit: require("../../assets/fonts/Outfit-Regular.ttf"),
  outfitMedium: require("../../assets/fonts/Outfit-Medium.ttf"),
  outfitSemiBold: require("../../assets/fonts/Outfit-SemiBold.ttf"),
  outfitBold: require("../../assets/fonts/Outfit-Bold.ttf"),
  bungee: require("../../assets/fonts/Bungee-Regular.ttf"),
}

const fonts = {
  outfit: {
    normal: "Outfit-Regular",
    medium: "Outfit-Medium",
    semiBold: "Outfit-SemiBold",
    bold: "Outfit-Bold",
  },
  bungee: {
    normal: "Bungee-Regular",
  },
  sf: Platform.select({
    ios: {
      thin: "SF Pro Display Thin",
      ultraLight: "SF Pro Display Ultralight",
      light: "SF Pro Display Light",
      regular: "SF Pro Display Regular",
      medium: "SF Pro Display Medium",
      semibold: "SF Pro Display Semibold",
      bold: "SF Pro Display Bold",
      heavy: "SF Pro Display Heavy",
      black: "SF Pro Display Black",
    },
    android: {
      // Fallback to system font on Android
      thin: "sans-serif-thin",
      ultraLight: "sans-serif-light",
      light: "sans-serif-light",
      regular: "sans-serif",
      medium: "sans-serif-medium",
      semibold: "sans-serif-medium",
      bold: "sans-serif-bold",
      heavy: "sans-serif-black",
      black: "sans-serif-black",
    },
  }),
}

export const typography = {
  fonts,
  primary: fonts.outfit,
  secondary: fonts.bungee,
  sf: fonts.sf,
}
