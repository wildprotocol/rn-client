import { ViewStyle } from "react-native"

import { createBottomTabNavigator } from "@react-navigation/bottom-tabs"
import { useSafeAreaInsets } from "react-native-safe-area-context"

import { RouteName, TAB_ROUTES } from "@/constants"
import { Theme, ThemedStyle } from "@/theme"
import { useAppTheme } from "@/utils"

import { TabParamList } from "./types"

const Tab = createBottomTabNavigator<TabParamList>()

// TODO: Can be maintained to list all the components [#issue]
// const TABS = [...TAB_ROUTES]

// if (__DEV__) {
//   TABS.push({
//     routeName: "Storybook",
//     component: StorybookScreen,
//     translationKey: "tabNavigator.storybook",
//     icon: BookIcon,
//   })
// }

const renderTabs = (theme: Theme) => {
  const { colors } = theme
  return TAB_ROUTES.map((route) => {
    const { name: routeName, component, icon: Icon } = route
    return (
      <Tab.Screen
        component={component}
        key={routeName}
        name={routeName}
        options={{
          tabBarShowLabel: false,
          tabBarIcon: ({ focused }) => (
            <Icon color={focused ? colors.primary : colors.text} size={24} />
          ),
          unmountOnBlur: routeName === RouteName.CreatePost,
        }}
      />
    )
  })
}

/**
 * This is the main navigator for the screens with a bottom tab bar.
 * Each tab is a stack navigator with its own set of screens.
 *
 * More info: https://reactnavigation.org/docs/bottom-tab-navigator/
 * @returns {JSX.Element} The rendered `TabNavigator`.
 */
export function TabNavigator() {
  const { bottom } = useSafeAreaInsets()
  const { themed, theme } = useAppTheme()
  const { colors } = theme

  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        headerShown: false,
        tabBarHideOnKeyboard: true,
        tabBarActiveTintColor: colors.text,
        tabBarInactiveTintColor: colors.text,
        tabBarItemStyle: themed($tabBarItem),
        tabBarStyle: {
          ...themed([$tabBar, { height: bottom + 48 }]),
          display: route.name === RouteName.CreatePost ? "none" : "flex",
        },
      })}
    >
      {renderTabs(theme)}
    </Tab.Navigator>
  )
}
const $tabBar: ThemedStyle<ViewStyle> = ({ colors }) => ({
  backgroundColor: colors.background,
  borderTopColor: colors.border,
})

const $tabBarItem: ThemedStyle<ViewStyle> = ({ spacing }) => ({
  paddingTop: spacing.md,
})
