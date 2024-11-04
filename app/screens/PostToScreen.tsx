import { FC, memo } from "react"
import { Pressable, View, ViewStyle } from "react-native"

import FastImage, { ImageStyle } from "@d11/react-native-fast-image"

import { Header, ListView, Screen, Text } from "@/components"
import { SUBCATEGORIES_API_RESPONSE } from "@/data/dummyData"
import { AppStackScreenProps } from "@/navigators"
import { useCreatePostStore } from "@/store"
import { ThemedStyle } from "@/theme"
import { useAppTheme } from "@/utils"

interface PostToScreenProps extends AppStackScreenProps<"PostTo"> {}

const SubCategory = memo(
  ({
    title,
    uri,
    onlineCount,
    onPress,
  }: {
    title: string
    uri: string
    onlineCount: number
    onPress: () => void
  }) => {
    const { themed } = useAppTheme()
    return (
      <Pressable onPress={onPress} style={$subCategory}>
        <FastImage source={{ uri }} style={themed($image)} />
        <View>
          <Text text={`sc/${title}`} />
          {!!onlineCount && <Text size="xxs" text={`${onlineCount} online`} />}
        </View>
      </Pressable>
    )
  },
)

export const PostToScreen: FC<PostToScreenProps> = function PostToScreen({ navigation }) {
  const { themed } = useAppTheme()
  const { setSelectedSubCategory } = useCreatePostStore()

  const handleSelectSubCategory = (item: (typeof SUBCATEGORIES_API_RESPONSE)[0]) => {
    setSelectedSubCategory({
      id: item.title,
      name: item.title,
      imageUrl: item.uri,
    })
    navigation.goBack()
  }

  return (
    <Screen preset="auto" style={$root}>
      <Header title="Post To" leftIcon="x" onLeftPress={() => navigation.goBack()} />
      <ListView
        contentContainerStyle={themed($contentContainer)}
        estimatedItemSize={10}
        data={SUBCATEGORIES_API_RESPONSE}
        renderItem={({ item }) => (
          <SubCategory
            title={item.title}
            uri={item.uri}
            onlineCount={item.onlineCount}
            onPress={() => handleSelectSubCategory(item)}
          />
        )}
      />
    </Screen>
  )
}

SubCategory.displayName = "SubCategory"

const $root: ViewStyle = {
  flex: 1,
}

const $contentContainer: ThemedStyle<ViewStyle> = ({ spacing }) => ({
  padding: spacing.md,
})

const $subCategory: ViewStyle = {
  flexDirection: "row",
  alignItems: "center",
  gap: 16,
}

const $image: ThemedStyle<ImageStyle> = ({ spacing }) => ({
  width: spacing.xl,
  height: spacing.xl,
  borderRadius: spacing.md,
})
