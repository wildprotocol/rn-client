import { memo, useCallback } from "react"
import { Image, LayoutAnimation, Switch, TouchableOpacity, View, ViewStyle } from "react-native"

import { DrawerContentComponentProps, DrawerContentScrollView } from "@react-navigation/drawer"
import { useNavigation } from "@react-navigation/native"
import type { NativeStackNavigationProp } from "@react-navigation/native-stack"
import { Moon, Sun } from "phosphor-react-native"

import { dummyUser } from "@/data/dummyUser"
import { AppStackScreenProps } from "@/navigators"
import { $styles, ThemedStyle } from "@/theme"
import { useAppTheme } from "@/utils"

import { Text } from "../Text"
import { MENU_ITEMS } from "./sidebarConstants"

const ProfileSection: React.FC = memo(() => {
  const { themed } = useAppTheme()
  const navigation = useNavigation<NativeStackNavigationProp<AppStackScreenProps<"Profile">>>()

  const handleProfilePress = useCallback(() => {
    navigation.navigate("Profile")
  }, [navigation])

  return (
    <TouchableOpacity style={themed($profileSection)} onPress={handleProfilePress}>
      <View style={$styles.rowCenter}>
        <Image source={{ uri: dummyUser.avatar }} style={$avatar} />
        <View style={$userInfo}>
          <Text text={dummyUser.displayName} />
          <Text
            style={themed($tips)}
            text={`${dummyUser.stats.totalKarma.toLocaleString()} tips`}
          />
        </View>
      </View>
      <View style={$styles.rowCenter}>
        <View style={$onlineDot} />
        <Text style={$onlineStatusText} text="Online Status: On" />
      </View>
    </TouchableOpacity>
  )
})

const MenuSection: React.FC = memo(() => {
  const {
    themed,
    theme: { colors },
  } = useAppTheme()
  const navigation = useNavigation<NativeStackNavigationProp<AppStackScreenProps<"Profile">>>()

  const handleMenuPress = useCallback(
    (itemId: number) => {
      switch (itemId) {
        case 1: // Profile
          navigation.navigate("Profile")
          break
        // Add other cases for different menu items as needed
        default:
          break
      }
    },
    [navigation],
  )

  return (
    <>
      {MENU_ITEMS.map((item) => {
        const Icon = item.icon
        return (
          <TouchableOpacity
            key={item.id}
            style={themed($menuItem)}
            onPress={() => handleMenuPress(item.id)}
          >
            {Icon && <Icon size={24} color={colors.text} />}
            <Text style={$menuText} text={item.title} />
          </TouchableOpacity>
        )
      })}
    </>
  )
})

export const RightSidebar: React.FC<DrawerContentComponentProps> = memo((props) => {
  const {
    themed,
    theme: { colors, isDark },
    themeContext,
    setThemeContextOverride,
  } = useAppTheme()

  const toggleTheme = useCallback(async () => {
    const themeValue = themeContext === "dark" ? "light" : "dark"
    LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut)
    setThemeContextOverride(themeValue)
  }, [themeContext, setThemeContextOverride])

  return (
    <DrawerContentScrollView {...props} scrollEnabled={false}>
      <View style={themed($container)}>
        <ProfileSection />
        <View style={themed($toggleContainer)}>
          <Sun size={24} color={colors.text} />
          <Switch value={isDark} onValueChange={toggleTheme} />
          <Moon size={24} color={colors.text} />
        </View>
        <MenuSection />
      </View>
    </DrawerContentScrollView>
  )
})

RightSidebar.displayName = "RightSidebar"
ProfileSection.displayName = "ProfileSection"
MenuSection.displayName = "MenuSection"

const $container: ThemedStyle<ViewStyle> = ({ spacing }) => ({
  flex: 1,
  padding: spacing.md,
})

const $toggleContainer: ThemedStyle<ViewStyle> = ({ spacing }) => ({
  flexDirection: "row",
  alignItems: "center",
  gap: spacing.sm,
  paddingHorizontal: spacing.xs,
})

const $profileSection: ThemedStyle<ViewStyle> = ({ colors, spacing }) => ({
  backgroundColor: colors.background,
  borderRadius: spacing.xs,
  padding: spacing.sm,
})

const $avatar = {
  width: 40,
  height: 40,
  borderRadius: 20,
}

const $userInfo = {
  marginLeft: 12,
}

const $tips = {
  fontSize: 14,
  opacity: 0.8,
}

const $onlineDot = {
  width: 10,
  height: 10,
  borderRadius: 5,
  backgroundColor: "green",
  marginRight: 5,
}

const $onlineStatusText = {
  fontSize: 14,
}

const $menuItem: ThemedStyle<ViewStyle> = ({ spacing }) => ({
  flexDirection: "row",
  alignItems: "center",
  paddingVertical: spacing.sm,
  paddingHorizontal: spacing.xs,
})

const $menuText = {
  marginLeft: 12,
  fontSize: 16,
}
