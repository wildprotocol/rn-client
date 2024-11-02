import { useEffect, useState } from "react"
import { Platform } from "react-native"

import { BottomSheetModalProvider } from "@gorhom/bottom-sheet"
import { PrivyProvider } from "@privy-io/expo"
import { QueryClient, QueryClientProvider } from "@tanstack/react-query"
import Constants from "expo-constants"
import { useFonts } from "expo-font"
import * as Linking from "expo-linking"
import { GestureHandlerRootView } from "react-native-gesture-handler"
import "react-native-get-random-values"
import { KeyboardProvider } from "react-native-keyboard-controller"
import { SafeAreaProvider, initialWindowMetrics } from "react-native-safe-area-context"
import "text-encoding-polyfill"

import { useStore } from "@/store"

import Config from "./config"
import { initI18n } from "./i18n"
import { AppNavigator, useNavigationPersistence } from "./navigators"
import { ErrorBoundary } from "./screens/ErrorScreen/ErrorBoundary"
import { customFontsToLoad } from "./theme"
import { loadDateFnsLocale } from "./utils/formatDate"
import "./utils/gestureHandler"
import "./utils/ignoreWarnings"
import * as storage from "./utils/storage"

/* eslint-disable import/first */
/**
 * Welcome to the main entry point of the app. In this file, we'll
 * be kicking off our app.
 *
 * Most of this file is boilerplate and you shouldn't need to modify
 * it very often. But take some time to look through and understand
 * what is going on here.
 *
 * The app navigation resides in ./app/navigators, so head over there
 * if you're interested in adding screens and navigators.
 */
if (__DEV__) {
  // Load Reactotron in development only.
  // Note that you must be using metro's `inlineRequires` for this to work.
  // If you turn it off in metro.config.js, you'll have to manually import it.
  require("./devtools/ReactotronConfig.ts")
}

export const NAVIGATION_PERSISTENCE_KEY = "NAVIGATION_STATE"

// Web linking configuration
const prefix = Linking.createURL("/")
const config = {
  screens: {
    Login: {
      path: "",
    },
    Welcome: "welcome",
  },
}

interface AppProps {
  hideSplashScreen: () => Promise<boolean>
}

/**
 * This is the root component of our app.
 * @param {AppProps} props - The props for the `App` component.
 * @returns {JSX.Element} The rendered `App` component.
 */
function App(props: AppProps) {
  const { hideSplashScreen } = props
  const { onNavigationStateChange, isRestored: isNavigationStateRestored } =
    useNavigationPersistence(storage, NAVIGATION_PERSISTENCE_KEY)

  const [areFontsLoaded, fontLoadError] = useFonts(customFontsToLoad)
  const [isI18nInitialized, setIsI18nInitialized] = useState(false)
  const hasHydrated = useStore((state) => state._hasHydrated)

  const queryClient = new QueryClient()

  useEffect(() => {
    initI18n()
      .then(() => setIsI18nInitialized(true))
      .then(() => loadDateFnsLocale())
  }, [])

  useEffect(() => {
    // This runs after the root store has been initialized and rehydrated.

    // If your initialization scripts run very fast, it's good to show the splash screen for just a bit longer to prevent flicker.
    // Slightly delaying splash screen hiding for better UX; can be customized or removed as needed,
    // Note: (vanilla Android) The splash-screen will not appear if you launch your app via the terminal or Android Studio. Kill the app and launch it normally by tapping on the launcher icon. https://stackoverflow.com/a/69831106
    // Note: (vanilla iOS) You might notice the splash-screen logo change size. This happens in debug/development mode. Try building the app for release.
    if (hasHydrated) {
      setTimeout(hideSplashScreen, 500)
    }
  }, [hasHydrated, hideSplashScreen])

  // Before we show the app, we have to wait for our state to be ready.
  // In the meantime, don't render anything. This will be the background
  // color set in native by rootView's background color.
  // In iOS: application:didFinishLaunchingWithOptions:
  // In Android: https://stackoverflow.com/a/45838109/204044
  // You can replace with your own loading component if you wish.

  if (
    !hasHydrated ||
    !isNavigationStateRestored ||
    !isI18nInitialized ||
    (!areFontsLoaded && !fontLoadError)
  ) {
    return null
  }

  const linking = {
    prefixes: [prefix],
    config,
  }

  const privyAppId = Constants.expoConfig?.extra?.privyAppId

  // otherwise, we're ready to render the app
  return (
    <SafeAreaProvider initialMetrics={initialWindowMetrics}>
      <ErrorBoundary catchErrors={Config.catchErrors}>
        <QueryClientProvider client={queryClient}>
          <GestureHandlerRootView>
            <BottomSheetModalProvider>
              <PrivyProvider
                appId={privyAppId}
                {...(Platform.OS === "ios" &&
                Constants.expoConfig?.ios?.bundleIdentifier === "lol.wildcard.ios"
                  ? { clientId: "client-WY2kRx7waPSccYvYZFsaq9uLYeyZ1zmZvPRz5EXh1qZdH" }
                  : {})}
              >
                <KeyboardProvider>
                  <AppNavigator
                    linking={linking}
                    // initialState={initialNavigationState}
                    onStateChange={onNavigationStateChange}
                  />
                </KeyboardProvider>
              </PrivyProvider>
            </BottomSheetModalProvider>
          </GestureHandlerRootView>
        </QueryClientProvider>
      </ErrorBoundary>
    </SafeAreaProvider>
  )
}

export default App
