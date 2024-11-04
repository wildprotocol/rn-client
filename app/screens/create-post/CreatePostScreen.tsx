import { FC, useCallback, useEffect, useMemo, useState } from "react"
import { Pressable, TextInput, TextStyle, View, ViewStyle } from "react-native"

import * as ImagePicker from "expo-image-picker"
import { debounce } from "lodash"
import { CaretDown, Image, Link, PlayCircle, X } from "phosphor-react-native"
import FastImage, { ImageStyle } from "react-native-fast-image"

import { Button, Screen, Text } from "@/components"
import { ConfirmationModal } from "@/components/ConfirmationModal"
import { TabScreenProps } from "@/navigators"
import { useCreatePostStore } from "@/store/RootStore"
import { $styles, ThemedStyle } from "@/theme"
import { useAppTheme } from "@/utils"

import { useUrlPreview } from "./hooks/useUrlPreview"

interface CreatePostScreenProps extends TabScreenProps<"CreatePost"> {
  selectedSubCategory?: {
    id: string
    name: string
    imageUrl: string
  }
}

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

  const {
    title,
    body,
    selectedSubCategory,
    urlPreviewImage,
    setTitle,
    setBody,
    setUrlPreviewImage,
    reset,
  } = useCreatePostStore()

  const [showUrlInput, setShowUrlInput] = useState(false)
  const [showDiscardModal, setShowDiscardModal] = useState(false)

  useEffect(() => {
    if (urlPreviewData) {
      setTitle(urlPreviewData.title || "")
      setBody(urlPreviewData.description || "")
      setUrlPreviewImage(urlPreviewData.image || "")
    }
  }, [urlPreviewData, setTitle, setBody, setUrlPreviewImage])

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
      selectionLimit: 1,
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

  const isNextDisabled = !title.trim()
  const showPostButton = !!selectedSubCategory
  const buttonText = showPostButton ? "Post" : "Next"

  useEffect(() => {
    return () => {
      // Only reset if navigating away from the create post flow
      if (navigation.getState().routes.length === 1) {
        reset()
      }
    }
  }, [reset, navigation])

  const handleSubCategoryPress = () => {
    navigation.navigate("PostTo")
  }

  const handleBackPress = useCallback(() => {
    const hasContent = !!(title.trim() || body.trim() || urlPreviewImage)

    if (hasContent) {
      setShowDiscardModal(true)
    } else {
      navigation.goBack()
    }
  }, [title, body, navigation, urlPreviewImage])

  const handleDiscard = useCallback(() => {
    reset()
    setShowDiscardModal(false)
    navigation.goBack()
  }, [reset, navigation])

  return (
    <Screen contentContainerStyle={themed($root)} safeAreaEdges={["bottom", "top"]}>
      <ConfirmationModal
        cancelText="Cancel"
        confirmText="Discard"
        message="Are you sure you want to discard your post?"
        onCancel={() => setShowDiscardModal(false)}
        onConfirm={handleDiscard}
        title="Discard post?"
        visible={showDiscardModal}
      />
      <View style={themed($header)}>
        <Pressable onPress={handleBackPress}>
          <X color={colors.text} size={24} weight="bold" />
        </Pressable>
        <Button
          text={buttonText}
          disabled={isNextDisabled}
          onPress={() => {
            if (showPostButton) {
              console.log("Creating post...")
            } else {
              navigation.navigate("PostTo")
            }
          }}
          style={isNextDisabled ? themed($nextButtonDisabled) : themed($nextButton)}
        />
      </View>

      {selectedSubCategory ? (
        <Pressable onPress={handleSubCategoryPress} style={themed($subCategoryContainer)}>
          <View style={themed($subCategory)}>
            <FastImage
              source={{
                uri: selectedSubCategory.imageUrl,
              }}
              style={themed($subCategoryImage)}
            />
            <Text text={selectedSubCategory.name} />
            <CaretDown color={colors.text} size={14} />
          </View>
          <Text size="xxs" text="RULES" />
        </Pressable>
      ) : null}

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

const $subCategoryContainer: ThemedStyle<ViewStyle> = ({ spacing }) => ({
  ...$styles.rowBetween,
  paddingTop: spacing.md,
  paddingHorizontal: spacing.md,
})

const $subCategory: ThemedStyle<ViewStyle> = () => ({
  ...$styles.rowCenter,
  gap: 4,
})

const $subCategoryImage: ThemedStyle<ImageStyle> = () => ({
  height: 20,
  width: 20,
  borderRadius: 10,
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
