import { useCallback } from "react"
import { Keyboard, Pressable, StyleProp, View, ViewStyle } from "react-native"

import { FlashList } from "@shopify/flash-list"
import { CaretDown } from "phosphor-react-native"
import FastImage, { ImageStyle } from "react-native-fast-image"

import { ChannelPickerSkeleton, Text } from "@/components"
// import { useDispatch } from "react-redux"
// import { ChannelPickerSkeleton, Text } from "@/components"
// import { AppDispatch } from "@/store"
// import { hideBottomSheet, showBottomSheet } from "@/store/slices/bottomSheetSlice"
import { ThemedStyle } from "@/theme"
import { transformImageUrl, useAppTheme } from "@/utils"

import { ChannelModal } from "./ChannelPickerModal"

interface ChannelPickerProps {
  /** The list of channels to display */
  channels: any[]
  /** Function to handle the selected channel */
  handleSelectedChannel: (channel: any) => void
  /** The currently selected channel */
  selectedChannel: any
}

export const ChannelPicker = (props: ChannelPickerProps) => {
  const { channels, handleSelectedChannel, selectedChannel } = props
  const {
    themed,
    theme: { colors },
  } = useAppTheme()

  // const dispatch = useDispatch<AppDispatch>()

  const selectedChannelImageUri = selectedChannel?.image_url
    ? transformImageUrl(selectedChannel.image_url, "rectcontain1")
    : undefined

  const handleModalSelectedChannel = (channel: any) => {
    handleSelectedChannel(channel)
    // dispatch(hideBottomSheet())
  }

  const handleShowChannels = useCallback(() => {
    Keyboard.dismiss()
    // dispatch(
    //   showBottomSheet({
    //     content: <ChannelModal channels={channels} onChannelSelect={handleModalSelectedChannel} />,
    //     snapPoints: ["50%", "70%"],
    //   }),
    // )
  }, [channels])

  const renderChannel = useCallback(
    ({ item }: { item: { id: string; image_url: string; name: string } }) => {
      const { image_url, name: channelName } = item || {}
      return (
        <Pressable onPress={() => handleSelectedChannel(item)} style={themed($channelContainer)}>
          <FastImage
            source={{ uri: image_url }}
            defaultSource={require("../../../../assets/images/global.png")}
            style={$icon}
          />
          <Text text={channelName} />
        </Pressable>
      )
    },
    [],
  )

  const renderViewAll = useCallback(() => {
    return channels && channels.length > 20 ? (
      <Pressable onPress={handleShowChannels} style={themed($channelContainer)}>
        <Text text={`View All (${channels.length})`} />
      </Pressable>
    ) : null
  }, [channels])

  const renderSelectedChannel = useCallback(() => {
    return (
      <Pressable onPress={handleShowChannels} style={themed($selectedChannelContainer)}>
        <FastImage
          source={{ uri: selectedChannelImageUri }}
          defaultSource={require("../../../../assets/images/global.png")}
          style={$selectedChannelIcon}
        />
        <Text size="xs" text={selectedChannel?.name || "Global"} />
        <CaretDown size={12} weight="bold" color={colors.text} />
      </Pressable>
    )
  }, [selectedChannel])

  return (
    <View style={$root}>
      {renderSelectedChannel()}
      <FlashList
        contentContainerStyle={themed($contentContainer)}
        data={channels.slice(0, 20)}
        estimatedItemSize={20}
        horizontal
        ItemSeparatorComponent={() => <View style={themed($itemSeparator)} />}
        ListEmptyComponent={<ChannelPickerSkeleton count={5} />}
        ListFooterComponent={renderViewAll}
        ListFooterComponentStyle={themed($listFooterComponent)}
        renderItem={renderChannel}
        showsHorizontalScrollIndicator={false}
      />
    </View>
  )
}

const $root: ViewStyle = {
  flexDirection: "row",
}

const $contentContainer: ThemedStyle<ViewStyle> = ({ spacing }) => ({
  paddingHorizontal: spacing.md,
  paddingRight: 100,
})

const $itemSeparator: ThemedStyle<ViewStyle> = ({ spacing }) => ({
  marginHorizontal: spacing.xs,
})

const $listFooterComponent: ThemedStyle<ViewStyle> = ({ spacing }) => ({
  marginLeft: spacing.md,
})

const $icon: StyleProp<ImageStyle> = {
  width: 24,
  height: 24,
  borderRadius: 12,
}

const $selectedChannelContainer: ThemedStyle<ViewStyle> = ({ colors, spacing }) => ({
  flexDirection: "row",
  alignItems: "center",
  gap: spacing.xs,
  backgroundColor: colors.secondary,
  padding: spacing.xs,
  borderRadius: spacing.xs,
})

const $selectedChannelIcon: StyleProp<ImageStyle> = {
  width: 16,
  height: 16,
  borderRadius: 8,
}

const $channelContainer: ThemedStyle<ViewStyle> = ({ colors, spacing }) => ({
  flexDirection: "row",
  alignItems: "center",
  gap: spacing.xs,
  backgroundColor: colors.backgroundDim,
  padding: spacing.xs,
  borderRadius: spacing.xs,
})
