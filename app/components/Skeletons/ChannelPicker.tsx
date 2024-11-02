import { View, ViewStyle } from "react-native"

import { ThemedStyle, spacing } from "@/theme"
import { useAppTheme } from "@/utils"

interface ChannelPickerSkeletonProps {
  count?: number
}

export const ChannelPickerSkeleton: React.FC<ChannelPickerSkeletonProps> = ({ count = 5 }) => {
  const { themed } = useAppTheme()

  return Array(count)
    .fill(0)
    .map((_, index) => <View key={`skeleton-${index}`} style={themed($container)} />)
}

const $container: ThemedStyle<ViewStyle> = ({ colors }) => ({
  backgroundColor: colors.border,
  width: 120,
  height: spacing.xl,
  borderRadius: 18,
  opacity: 0.5,
})
