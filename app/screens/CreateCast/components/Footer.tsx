import { useCallback } from "react"
import { Pressable, TextStyle, View, ViewStyle } from "react-native"

import { useNavigation } from "@react-navigation/native"
import * as ImagePicker from "expo-image-picker"
import { Gif, Image } from "phosphor-react-native"

import { Text } from "@/components"
import { ThemedStyle } from "@/theme"
import { useAppTheme } from "@/utils"

import { useCreatePostContext } from "../context/contextProvider"
import { ChannelPicker } from "./ChannelPicker"
import { CHANNELS_API_RESPONSE } from "./temp.constants"

export const Footer = () => {
  const {
    themed,
    theme: { colors },
  } = useAppTheme()
  const navigation = useNavigation<any>()

  const channelList = CHANNELS_API_RESPONSE.channels

  const { selectedChannel, setSelectedChannel } = useCreatePostContext()

  const handleSelectedChannel = (channel: any) => {
    setSelectedChannel(channel)
  }

  const handleDraftsPress = useCallback(() => {
    navigation.navigate("Drafts")
  }, [navigation])

  const handleScheduledPress = useCallback(() => {
    navigation.navigate("Scheduled")
  }, [navigation])

  const handleImagePress = useCallback(async () => {
    console.log("image pressed")
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsMultipleSelection: true,
      // selectionLimit: allowedMedia - framesLength, // TODO: Add this post store fix
      allowsEditing: false,
      aspect: [4, 3],
      quality: 1,
    })
    console.log("imageResult", result)
  }, [])

  const handleGifPress = useCallback(() => {
    navigation.navigate("GifPicker")
  }, [navigation])

  return (
    <>
      <View style={themed($channelPickerContainer)}>
        <ChannelPicker
          selectedChannel={selectedChannel}
          channels={channelList}
          handleSelectedChannel={handleSelectedChannel}
        />
      </View>
      <View style={themed($container)}>
        <View style={themed($subContainer)}>
          <Pressable onPress={handleImagePress}>
            <Image size={24} color={colors.text} />
          </Pressable>
          <Pressable onPress={handleGifPress}>
            <Gif size={24} color={colors.text} />
          </Pressable>
        </View>
        <View style={themed($subContainer)}>
          <Pressable onPress={handleDraftsPress}>
            <Text style={themed($text)} text="Drafts" />
          </Pressable>
          <Pressable onPress={handleScheduledPress}>
            <Text style={themed($text)} text="Scheduled" />
          </Pressable>
        </View>
      </View>
    </>
  )
}

const $channelPickerContainer: ThemedStyle<ViewStyle> = ({ spacing }) => ({
  marginBottom: spacing.md,
  paddingHorizontal: spacing.sm,
})

const $container: ThemedStyle<ViewStyle> = ({ colors }) => ({
  flexDirection: "row",
  justifyContent: "space-between",
  paddingHorizontal: 16,
  paddingVertical: 8,
  borderTopWidth: 1,
  borderColor: colors.border,
})

const $subContainer: ThemedStyle<ViewStyle> = () => ({
  flexDirection: "row",
  alignItems: "center",
  gap: 8,
})

const $text: ThemedStyle<TextStyle> = ({ colors }) => ({
  color: colors.primary,
})
