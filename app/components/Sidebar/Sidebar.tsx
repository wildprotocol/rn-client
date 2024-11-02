import { useCallback } from "react"
import { LayoutAnimation, View, ViewStyle } from "react-native"

import { DrawerContentComponentProps } from "@react-navigation/drawer"

import { ThemedStyle } from "@/theme"
import { useAppTheme } from "@/utils"

import { Screen } from "../Screen"
import { Switch } from "../Toggle"

export const Sidebar: React.FC<DrawerContentComponentProps> = () => {
  const {
    themed,
    theme: { isDark },
    themeContext,
    setThemeContextOverride,
  } = useAppTheme()

  const toggleTheme = useCallback(async () => {
    const themeValue = themeContext === "dark" ? "light" : "dark"
    LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut)
    setThemeContextOverride(themeValue)
  }, [themeContext, setThemeContextOverride])

  return (
    <Screen
      safeAreaEdges={["top"]}
      ScrollViewProps={{ showsVerticalScrollIndicator: false }}
      preset="scroll"
      contentContainerStyle={themed($root)}
    >
      <View style={$switchContainer}>
        <Switch value={isDark} onValueChange={toggleTheme} />
      </View>
    </Screen>
  )
}

const $root: ThemedStyle<ViewStyle> = ({ colors, spacing }) => ({
  padding: spacing.md,
  backgroundColor: colors.background,
})

const $switchContainer: ViewStyle = {
  alignSelf: "flex-end",
}
