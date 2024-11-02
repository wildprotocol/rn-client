import { useCallback } from "react"
import { StatusBar } from "react-native"

import { createDrawerNavigator } from "@react-navigation/drawer"
import { useNavigationState } from "@react-navigation/native"
import { useSafeAreaInsets } from "react-native-safe-area-context"

import { LeftSidebar } from "@/components/Sidebar/LeftSidebar"
import { RightSidebar } from "@/components/Sidebar/RightSidebar"
import { IS_ANDROID } from "@/constants"
import { useAppTheme } from "@/utils"

import { TabNavigator } from "./TabNavigator"

const LeftDrawer = createDrawerNavigator()
const RightDrawer = createDrawerNavigator()

const RightDrawerScreen = () => {
  const {
    theme: { colors },
  } = useAppTheme()
  const insets = useSafeAreaInsets()

  const isRightDrawerOpen = useNavigationState(
    useCallback((state) => state?.routes[0]?.state?.history?.length === 2, []),
  )

  return (
    <RightDrawer.Navigator
      screenOptions={{
        headerShown: false,
        drawerStyle: {
          backgroundColor: colors.background,
          width: "70%",
          paddingTop: IS_ANDROID ? StatusBar.currentHeight : 0,
        },
        drawerType: "front",
        drawerPosition: "right",
        drawerContentContainerStyle: {
          paddingTop: insets.top,
          paddingBottom: insets.bottom,
        },
        swipeEdgeWidth: 100,
        swipeEnabled: isRightDrawerOpen,
      }}
      drawerContent={(props) => <RightSidebar {...props} />}
    >
      <RightDrawer.Screen name="BottomTabs" component={TabNavigator} />
    </RightDrawer.Navigator>
  )
}

export const DrawerNavigator = () => {
  const {
    theme: { colors },
  } = useAppTheme()
  const insets = useSafeAreaInsets()

  const isLeftDrawerOpen = useNavigationState(
    useCallback((state) => state?.routes[0]?.state?.history?.length === 2, []),
  )

  return (
    <LeftDrawer.Navigator
      screenOptions={{
        headerShown: false,
        drawerStyle: {
          backgroundColor: colors.background,
          width: "80%",
          paddingTop: IS_ANDROID ? StatusBar.currentHeight : 0,
        },
        drawerType: "front",
        drawerContentContainerStyle: {
          paddingTop: insets.top,
          paddingBottom: insets.bottom,
        },
        swipeEdgeWidth: 100,
        swipeEnabled: isLeftDrawerOpen,
      }}
      drawerContent={(props) => <LeftSidebar {...props} />}
    >
      <LeftDrawer.Screen name="RightDrawer" component={RightDrawerScreen} />
    </LeftDrawer.Navigator>
  )
}
