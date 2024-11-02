import { useCallback, useEffect, useState } from "react"
import {
  StyleProp,
  TextInput,
  TextInputProps,
  TextStyle,
  TouchableOpacity,
  View,
  ViewStyle,
} from "react-native"

import { FlashList, ListRenderItem } from "@shopify/flash-list"
import { debounce } from "lodash"
import FastImage, { ImageStyle } from "react-native-fast-image"

import { ThemedStyle } from "@/theme"
import { useAppTheme } from "@/utils"

import { searchGifs } from "./service"

interface GifPickerProps {
  /** Custom Render item for the GIF list */
  customRenderItem?: ListRenderItem<any>
  /** Callback to handle GIF selection */
  onSelect: (gif: string) => void
  /** Number of columns for the GIF list */
  numColumns?: number
  /** Placeholder text for the GIF search input */
  placeholderText?: string
  /** Style for the GIF list */
  style?: StyleProp<ViewStyle>
  /** Additional props for the TextInput */
  textInputProps?: TextInputProps
}

/**
 * Custom hook that manages the state and logic for the GIF picker functionality.
 * It handles the search query state, GIF results, and debounced search functionality.
 * @returns {{searchQuery: string, gifResults: Array, onSearchChange: Function}} - The search query, GIF results, and the `onSearchChange` function.
 */
const useGifPicker = () => {
  const [searchQuery, setSearchQuery] = useState("")
  const [gifResults, setGifResults] = useState([])

  const debouncedSearchChange = useCallback(
    debounce(async (text: string) => {
      const results = await searchGifs(text)
      setGifResults(results)
    }, 500),
    [],
  )

  const onSearchChange = (text: string) => {
    setSearchQuery(text)
    debouncedSearchChange(text)
  }

  useEffect(() => {
    const fetchGifs = async () => {
      const results = await searchGifs()
      setGifResults(results)
    }
    fetchGifs()
  }, [])

  return {
    searchQuery,
    gifResults,
    onSearchChange,
  }
}

/**
 * Represents a GIF picker component that allows users to search and select GIFs.
 * The `GifPicker` component provides customizable rendering, selection handling, and styling options.
 * It can be used to integrate GIF selection functionality into various parts of the application.
 * @param {GifPickerProps} props - The props for the `GifPicker` component.
 * @returns {JSX.Element} The rendered `GifPicker` component.
 */
export const GifPicker = (props: GifPickerProps) => {
  const {
    customRenderItem,
    numColumns = 2,
    onSelect,
    placeholderText = "Search GIFs...",
    textInputProps,
    style: $styleOverride,
  } = props

  const { searchQuery, gifResults, onSearchChange } = useGifPicker()
  const {
    themed,
    theme: { colors },
  } = useAppTheme()

  const renderItem = useCallback(
    ({ item }: { item: any }) => {
      return (
        <TouchableOpacity style={$itemContainer} onPress={() => onSelect(item)}>
          <FastImage
            source={{ uri: item.media_formats.tinygif.url }}
            style={$image}
            resizeMode="cover"
          />
        </TouchableOpacity>
      )
    },
    [onSelect],
  )

  return (
    <View style={[$container, $styleOverride]}>
      <View style={$searchContainer}>
        <TextInput
          style={themed($textInput)}
          placeholder={placeholderText}
          placeholderTextColor={colors.textDim}
          value={searchQuery}
          onChangeText={onSearchChange}
          {...textInputProps}
        />
      </View>
      <FlashList
        data={gifResults}
        numColumns={numColumns}
        estimatedItemSize={20}
        renderItem={customRenderItem || renderItem}
        showsVerticalScrollIndicator={false}
      />
    </View>
  )
}

const $container: ViewStyle = {
  flex: 1,
  padding: 8,
}

const $searchContainer: ViewStyle = {
  flexDirection: "row",
  alignItems: "center",
  marginBottom: 16,
}

const $textInput: ThemedStyle<TextStyle> = ({ colors, spacing, typography }) => ({
  flex: 1,
  borderRadius: 20,
  paddingHorizontal: spacing.md,
  paddingVertical: spacing.sm,
  fontSize: 16,
  fontFamily: typography.primary.normal,
  backgroundColor: colors.backgroundDim,
  color: colors.text,
})

const $itemContainer: ViewStyle = {
  flex: 1,
  padding: 8,
}

const $image: ImageStyle = {
  width: "100%",
  height: 128,
  borderRadius: 8,
}
