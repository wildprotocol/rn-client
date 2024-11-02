import { useCallback, useRef, useState } from "react"
import { Pressable, StyleProp, TextInput, TextStyle, View, ViewStyle } from "react-native"

import { FlashList } from "@shopify/flash-list"
import { debounce } from "lodash"
import FastImage, { ImageStyle } from "react-native-fast-image"

import { Text } from "@/components"
import { $styles, ThemedStyle } from "@/theme"
import { useAppTheme } from "@/utils"

interface ChannelModalProps {
  /** The list of channels to display */
  channels: any[]
  /** Function to handle the selected channel */
  onChannelSelect: (channel: any) => void
}

export const ChannelModal = (props: ChannelModalProps) => {
  const { channels, onChannelSelect } = props

  const searchInputRef = useRef<TextInput>(null)
  const [searchValue, setSearchValue] = useState("")

  const {
    themed,
    theme: { colors, isDark },
  } = useAppTheme()

  const handleSearch = debounce((value) => {
    setSearchValue(value)
  }, 300)

  const keyExtractor = useCallback((item: { channel: { id: string } }) => item.channel.id, [])

  const renderChannel = useCallback(
    ({ item }: { item: { channel: { id: string; image_url: string; name: string } } }) => {
      const { channel } = item
      const { image_url, name: channelName } = channel
      return (
        <Pressable onPress={() => onChannelSelect(channel)} style={themed($channelContainer)}>
          <FastImage source={{ uri: image_url }} style={$icon} />
          <Text text={channelName} />
        </Pressable>
      )
    },
    [],
  )

  return (
    <View style={$styles.flex1}>
      <TextInput
        ref={searchInputRef}
        keyboardAppearance={isDark ? "light" : "dark"}
        placeholder="Search channels..."
        placeholderTextColor={colors.textDim}
        accessibilityLabel="search channel"
        onChangeText={handleSearch}
        style={themed($searchInput)}
      />
      <FlashList
        numColumns={3}
        renderItem={renderChannel}
        keyExtractor={keyExtractor}
        data={channels}
        estimatedItemSize={20}
        ItemSeparatorComponent={() => <View style={themed($separator)} />}
        contentContainerStyle={themed($contentContainer)}
        showsVerticalScrollIndicator={false}
      />
    </View>
  )
}

const $searchInput: ThemedStyle<TextStyle> = ({ colors, spacing }) => ({
  padding: spacing.md,
  borderRadius: spacing.md,
  color: colors.text,
  backgroundColor: colors.backgroundDim,
})

const $contentContainer: ThemedStyle<ViewStyle> = ({ spacing }) => ({
  paddingVertical: spacing.md,
})

const $channelContainer: ThemedStyle<ViewStyle> = ({ colors, spacing }) => ({
  alignItems: "center",
  flex: 1,
})

const $separator: ThemedStyle<ViewStyle> = ({ spacing }) => ({
  height: spacing.md,
})

const $icon: StyleProp<ImageStyle> = {
  width: 48,
  height: 48,
  borderRadius: 24,
}
