/**
 * The app navigator (formerly "AppNavigator" and "MainNavigator") is used for the primary
 * navigation flows of your app.
 * Generally speaking, it will contain an auth flow (registration, login, forgot password)
 * and a "main" flow which the user will use once logged in.
 */
import { ComponentProps } from "react"

import { NavigationContainer } from "@react-navigation/native"
import { createNativeStackNavigator } from "@react-navigation/native-stack"

import * as Screens from "@/screens"
import { ProfileScreen } from "@/screens/ProfileScreen"
import { useAuthenticationStore } from "@/store"
import { useAppTheme, useThemeProvider } from "@/utils/useAppTheme"

import Config from "../config"
import { AuthNavigator } from "./AuthNavigator"
import { DrawerNavigator } from "./DrawerNavigator"
import { navigationRef, useBackButtonHandler } from "./navigationUtilities"
import { AppStackParamList } from "./types"

/**
 * This is a list of all the route names that will exit the app if the back button
 * is pressed while in that screen. Only affects Android.
 */
const exitRoutes = Config.exitRoutes

// Documentation: https://reactnavigation.org/docs/stack-navigator/
const Stack = createNativeStackNavigator<AppStackParamList>()

const AppStack = function AppStack() {
  const {
    theme: { colors },
  } = useAppTheme()

  return (
    <Stack.Navigator
      initialRouteName="DrawerNavigator"
      screenOptions={{
        headerShown: false,
        navigationBarColor: colors.background,
        contentStyle: {
          backgroundColor: colors.background,
        },
      }}
    >
      <Stack.Screen name="Welcome" component={Screens.WelcomeScreen} />
      {/** 🔥 Your screens go here */}
      <Stack.Screen
        name="CreateCast"
        component={Screens.CreateCastScreen}
        options={{
          animation: "slide_from_bottom",
          gestureEnabled: false, // TODO handle back press and gesture with a listener in the screen directly
          customAnimationOnGesture: true,
          animationDuration: 200,
        }}
      />
      <Stack.Screen name="DrawerNavigator" component={DrawerNavigator} />
      <Stack.Screen name="Drafts" component={Screens.DraftsScreen} />
      <Stack.Screen name="Scheduled" component={Screens.ScheduledScreen} />
      <Stack.Screen name="GifPicker" component={Screens.GifScreen} />
      <Stack.Screen name="PostTo" component={Screens.PostToScreen} />
      <Stack.Screen
        name="PostDetails"
        component={Screens.PostDetailsScreen}
        options={{
          animation: "slide_from_bottom",
          customAnimationOnGesture: true,
          animationDuration: 200,
        }}
      />
      <Stack.Screen name="Profile" component={ProfileScreen} />
    </Stack.Navigator>
  )
}

export interface AppNavigationProps extends Partial<ComponentProps<typeof NavigationContainer>> {}

export const AppNavigator = function AppNavigator(props: AppNavigationProps) {
  const { themeScheme, setPrimaryColor, navigationTheme, setThemeContextOverride, ThemeProvider } =
    useThemeProvider()
  const { isAuthenticated } = useAuthenticationStore()

  useBackButtonHandler((routeName) => exitRoutes.includes(routeName))

  return (
    <ThemeProvider value={{ themeScheme, setPrimaryColor, setThemeContextOverride }}>
      <NavigationContainer ref={navigationRef} theme={navigationTheme} {...props}>
        {isAuthenticated ? <AppStack /> : <AuthNavigator />}
      </NavigationContainer>
    </ThemeProvider>
  )
}
