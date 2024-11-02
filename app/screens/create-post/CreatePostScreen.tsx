import { FC, useCallback, useEffect, useMemo, useState } from "react"
import { Pressable, TextInput, TextStyle, View, ViewStyle } from "react-native"

import * as ImagePicker from "expo-image-picker"
import { debounce } from "lodash"
import { Image, Link, PlayCircle, X } from "phosphor-react-native"
import FastImage, { ImageStyle } from "react-native-fast-image"

import { Button, Screen } from "@/components"
import { TabScreenProps } from "@/navigators"
import { $styles, ThemedStyle } from "@/theme"
import { useAppTheme } from "@/utils"

import { useUrlPreview } from "./hooks/useUrlPreview"

interface CreatePostScreenProps extends TabScreenProps<"CreatePost"> {}

const MAX_TITLE_LENGTH = 200

const PressableIcon = ({
  icon: Icon,
  onPress,
}: {
  icon: React.ElementType
  onPress: () => void
}) => {
  const {
    theme: { colors },
  } = useAppTheme()

  return (
    <Pressable onPress={onPress}>
      <Icon color={colors.text} size={24} />
    </Pressable>
  )
}

export const CreatePostScreen: FC<CreatePostScreenProps> = function CreatePostScreen({
  navigation,
}) {
  const { themed } = useAppTheme()
  const {
    theme: { colors },
  } = useAppTheme()
  const { urlPreviewData, fetchUrlPreview } = useUrlPreview()

  const [showUrlInput, setShowUrlInput] = useState(false)
  const [title, setTitle] = useState("")
  const [body, setBody] = useState("")
  const [urlPreviewImage, setUrlPreviewImage] = useState("")

  const isNextDisabled = !title?.trim()

  useEffect(() => {
    if (urlPreviewData) {
      setTitle(urlPreviewData.title || "")
      setBody(urlPreviewData.description || "")
      setUrlPreviewImage(urlPreviewData.image || "")
    }
  }, [urlPreviewData])

  const handleImagePress = useCallback(async () => {
    console.log("image pressed")
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsMultipleSelection: true,
      // selectionLimit: allowedMedia - framesLength, // TODO: Add this post store fix
      // allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    })
    console.log("imageResult", result)
  }, [])

  const handleVideoPress = useCallback(async () => {
    console.log("video pressed")
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Videos,
      allowsMultipleSelection: false,
      // selectionLimit: allowedMedia - framesLength, // TODO: Add this post store fix
      allowsEditing: false,
      aspect: [4, 3],
      quality: 1,
    })
    console.log("imageResult", result)
  }, [])

  const handleUrlChange = useMemo(
    () =>
      debounce(async (text: string) => {
        await fetchUrlPreview(text)
      }, 350),
    [fetchUrlPreview],
  )

  const handleUrlInputClose = () => {
    setShowUrlInput(false)
    setTitle("")
    setBody("")
    setUrlPreviewImage("")
  }

  return (
    <Screen contentContainerStyle={themed($root)} safeAreaEdges={["bottom", "top"]}>
      <View style={themed($header)}>
        <Pressable onPress={() => navigation.goBack()}>
          <X color={colors.text} size={24} weight="bold" />
        </Pressable>
        <Button
          text="Next"
          disabled={!title}
          onPress={() => {
            navigation.navigate("PostTo")
          }}
          style={isNextDisabled ? themed($nextButtonDisabled) : themed($nextButton)}
        />
      </View>

      <TextInput
        placeholder="Title"
        placeholderTextColor={colors.textDim}
        style={themed($title)}
        value={title}
        onChangeText={setTitle}
        maxLength={MAX_TITLE_LENGTH}
        multiline
      />
      {showUrlInput && (
        <View style={themed($urlInputContainer)}>
          {urlPreviewImage ? (
            <View style={themed($imageContainer)}>
              <FastImage source={{ uri: urlPreviewImage }} style={themed($previewImage)} />
              <Pressable onPress={handleUrlInputClose} style={themed($removeImageButton)}>
                <X color={colors.text} size={20} weight="bold" />
              </Pressable>
            </View>
          ) : (
            <>
              <TextInput
                placeholder="Enter link"
                placeholderTextColor={colors.textDim}
                style={themed($body)}
                onChangeText={handleUrlChange}
              />
              <Pressable onPress={handleUrlInputClose} style={themed($closeUrlInput)}>
                <X color={colors.text} size={20} />
              </Pressable>
            </>
          )}
        </View>
      )}

      <TextInput
        placeholder="body text (optional)"
        placeholderTextColor={colors.textDim}
        style={themed($body)}
        multiline
        value={body}
        onChangeText={setBody}
      />

      <View style={themed($footer)}>
        <PressableIcon icon={Link} onPress={() => setShowUrlInput(!showUrlInput)} />
        <PressableIcon icon={Image} onPress={handleImagePress} />
        <PressableIcon icon={PlayCircle} onPress={handleVideoPress} />
        {/* <PressableIcon icon={AlignLeft} onPress={() => {}} /> */}
      </View>
    </Screen>
  )
}

const $root: ThemedStyle<ViewStyle> = () => ({
  flex: 1,
})

const $header: ThemedStyle<ViewStyle> = ({ colors, spacing }) => ({
  flexDirection: "row",
  justifyContent: "space-between",
  alignItems: "center",
  gap: spacing.md,
  paddingBottom: spacing.md,
  paddingHorizontal: spacing.md,
  borderBottomWidth: 1,
  borderBottomColor: colors.border,
})

const $nextButtonDisabled: ThemedStyle<ViewStyle> = ({ colors, spacing }) => ({
  backgroundColor: colors.backgroundDim,
  paddingHorizontal: spacing.xl,
})

const $nextButton: ThemedStyle<ViewStyle> = ({ colors, spacing }) => ({
  backgroundColor: colors.primary,
  paddingHorizontal: spacing.xl,
})

const $title: ThemedStyle<TextStyle> = ({ colors, spacing }) => ({
  fontSize: 24,
  fontWeight: "bold",
  color: colors.text,
  padding: spacing.md,
})

const $urlInputContainer: ThemedStyle<ViewStyle> = ({ spacing }) => ({
  ...$styles.rowBetween,
  marginBottom: spacing.sm,
})

const $closeUrlInput: ThemedStyle<ViewStyle> = ({ colors, spacing }) => ({
  backgroundColor: colors.backgroundDim,
  borderRadius: 20,
  marginRight: spacing.md,
  padding: spacing.xs,
})

const $body: ThemedStyle<TextStyle> = ({ colors, spacing }) => ({
  fontSize: 16,
  color: colors.text,
  paddingHorizontal: spacing.md,
  flex: 1,
})

const $footer: ThemedStyle<ViewStyle> = ({ spacing }) => ({
  padding: spacing.md,
  flexDirection: "row",
  alignItems: "center",
  gap: spacing.md,
})

const $imageContainer: ThemedStyle<ViewStyle> = () => ({
  position: "relative",
  width: "100%",
})

const $previewImage: ThemedStyle<ImageStyle> = ({ spacing }) => ({
  height: 200,
  width: "100%",
  marginHorizontal: spacing.md,
})

const $removeImageButton: ThemedStyle<ViewStyle> = ({ colors, spacing }) => ({
  position: "absolute",
  top: spacing.xs,
  right: spacing.lg,
  backgroundColor: colors.backgroundDim,
  borderRadius: 20,
  padding: spacing.xs,
})
