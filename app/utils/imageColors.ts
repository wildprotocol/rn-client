import ImageColors from "react-native-image-colors"

export const shouldUseLightText = (backgroundColor: string): boolean => {
  const hex = backgroundColor.replace("#", "")

  const r = parseInt(hex.substring(0, 2), 16)
  const g = parseInt(hex.substring(2, 4), 16)
  const b = parseInt(hex.substring(4, 6), 16)

  const luminance = (0.299 * r + 0.587 * g + 0.114 * b) / 255

  return luminance < 0.5
}

export const getImageDominantColor = async (imageUrl: string): Promise<string> => {
  try {
    const result = await ImageColors.getColors(imageUrl, {
      fallback: "#000000",
      cache: true,
      key: imageUrl,
    })

    if (result.platform === "android") {
      return result.dominant || result.average || "#000000"
    } else if (result.platform === "ios") {
      return result.primary || result.background || "#000000"
    } else {
      return "#000000"
    }
  } catch (error) {
    console.error("Error extracting color:", error)
    return "#000000"
  }
}
