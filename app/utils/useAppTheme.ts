import { createContext, useCallback, useContext, useEffect, useMemo, useState } from "react"
import { StyleProp, useColorScheme } from "react-native"

import { DarkTheme, DefaultTheme, useTheme as useNavTheme } from "@react-navigation/native"
import * as SystemUI from "expo-system-ui"
import { merge } from "lodash"

import {
  type Theme,
  type ThemeContexts,
  type ThemedStyle,
  type ThemedStyleArray,
  darkTheme,
  lightTheme,
} from "@/theme"

import { loadString, saveString } from "./storage"

type ThemeContextType = {
  themeScheme: ThemeContexts
  setThemeContextOverride: (newTheme: ThemeContexts) => void
  setPrimaryColor: (color: string) => void
}

// create a React context and provider for the current theme
export const ThemeContext = createContext<ThemeContextType>({
  themeScheme: undefined, // default to the system theme
  setThemeContextOverride: (_newTheme: ThemeContexts) => {
    console.error("Tried to call setThemeContextOverride before the ThemeProvider was initialized")
  },
  setPrimaryColor: (_color: string) => {
    console.error("Tried to call setPrimaryColor before the ThemeProvider was initialized")
  },
})

const themeContextToTheme = (themeContext: ThemeContexts): Theme =>
  themeContext === "dark" ? darkTheme : lightTheme

const setImperativeTheming = (theme: Theme) => {
  SystemUI.setBackgroundColorAsync(theme.colors.background)
}

export const useThemeProvider = (initialTheme: ThemeContexts = undefined) => {
  const colorScheme = useColorScheme()
  const [overrideTheme, setTheme] = useState<ThemeContexts>(initialTheme)
  const [primaryColor, setPrimaryColorState] = useState<string | undefined>(undefined)
  useEffect(() => {
    const loadThemeFromStorage = () => {
      const storedTheme = loadString("theme")
      if (storedTheme) {
        setTheme(storedTheme as ThemeContexts)
      } else {
        setTheme(initialTheme || "dark")
      }
    }
    loadThemeFromStorage()
  }, [initialTheme])

  const setThemeContextOverride = useCallback(async (newTheme: ThemeContexts) => {
    setTheme(newTheme)
    if (newTheme) {
      saveString("theme", newTheme) // stores the theme in async storage
    }
  }, [])

  const setPrimaryColor = useCallback((color: string) => {
    setPrimaryColorState(color)
  }, [])

  const themeScheme = overrideTheme || colorScheme || "dark"
  const navigationTheme = themeScheme === "dark" ? DarkTheme : DefaultTheme

  const theme = useMemo(() => {
    const baseTheme = themeContextToTheme(themeScheme)
    if (primaryColor) {
      return merge(baseTheme, { colors: { primary: primaryColor } })
    }
    return baseTheme
  }, [themeScheme, primaryColor])

  useEffect(() => {
    setImperativeTheming(theme)
  }, [theme])

  return {
    themeScheme,
    navigationTheme,
    setThemeContextOverride,
    setPrimaryColor,
    ThemeProvider: ThemeContext.Provider,
    theme,
  }
}

interface UseAppThemeValue {
  /** The theme object from react-navigation */
  navTheme: typeof DefaultTheme
  /** A function to set the theme context override (for switching modes) */
  setThemeContextOverride: (newTheme: ThemeContexts) => void
  /** The current theme object */
  theme: Theme
  /** The current theme context "light" | "dark" */
  themeContext: ThemeContexts
  /**
   * A function to apply the theme to a style object.
   * See examples in the components directory or read the docs here:
   * https://docs.infinite.red/ignite-cli/boilerplate/app/utils/
   */
  themed: <T>(styleOrStyleFn: ThemedStyle<T> | StyleProp<T> | ThemedStyleArray<T>) => T
  /** A function to set the primary color of the application */
  setPrimaryColor: (color: string) => void
}

/**
 * Custom hook that provides the app theme and utility functions for theming.
 *
 * @returns {UseAppThemeReturn} An object containing various theming values and utilities.
 * @throws {Error} If used outside of a ThemeProvider.
 */
export const useAppTheme = (): UseAppThemeValue => {
  const navTheme = useNavTheme()
  const context = useContext(ThemeContext)
  if (!context) {
    throw new Error("useTheme must be used within a ThemeProvider")
  }

  const { themeScheme: overrideTheme, setThemeContextOverride, setPrimaryColor } = context

  const themeContext: ThemeContexts = useMemo(
    () => overrideTheme || (navTheme.dark ? "dark" : "light"),
    [overrideTheme, navTheme],
  )

  const themeVariant: Theme = useMemo(() => themeContextToTheme(themeContext), [themeContext])

  const themed = useCallback(
    <T>(styleOrStyleFn: ThemedStyle<T> | StyleProp<T> | ThemedStyleArray<T>) => {
      const flatStyles = [styleOrStyleFn].flat(3)
      const stylesArray = flatStyles.map((f) => {
        if (typeof f === "function") {
          return (f as ThemedStyle<T>)(themeVariant)
        } else {
          return f
        }
      })

      // Flatten the array of styles into a single object
      return Object.assign({}, ...stylesArray) as T
    },
    [themeVariant],
  )

  return {
    navTheme,
    setThemeContextOverride,
    setPrimaryColor,
    theme: themeVariant,
    themeContext,
    themed,
  }
}
