import { FC } from "react"
import { Pressable, View, ViewStyle } from "react-native"

import { useNavigation } from "@react-navigation/native"
import { CaretDown, List, MagnifyingGlass, User } from "phosphor-react-native"

import { ListView, Screen, Text } from "@/components"
import { PostCard } from "@/components/PostCard"
import { dummyPosts } from "@/data/dummyData"
import { HomeTabScreenProps } from "@/navigators"
import { $styles, ThemedStyle } from "@/theme"
import { useAppTheme } from "@/utils"

interface FeedScreenProps extends HomeTabScreenProps<"Feed"> {}

export const FeedScreen: FC<FeedScreenProps> = function FeedScreen() {
  const { themed, theme } = useAppTheme()
  const navigation = useNavigation<any>()

  const openLeftDrawer = () => {
    navigation.getParent()?.getParent()?.getParent()?.openDrawer()
  }

  const openRightDrawer = () => {
    navigation.getParent()?.openDrawer()
  }

  /**
   * Renders an individual post item in the feed
   * Filters out unsupported post types and handles post rendering
   *
   * @param item - Post data from the data source
   * @returns PostCard component or null for unsupported post types
   */
  const renderPost = ({ item }: { item: (typeof dummyPosts)[0] }) => {
    // Only render supported post types
    if (!["text", "link", "media"].includes(item.type)) return null

    console.log("FeedScreen - Rendering post:", item.id)

    return <PostCard {...item} key={item.id} />
  }

  return (
    <Screen safeAreaEdges={["top"]} contentContainerStyle={$styles.flex1}>
      {/* Header Section: Navigation and Actions */}
      <View style={themed($header)}>
        <View style={$leftHeader}>
          <Pressable onPress={openLeftDrawer}>
            <List color={theme.colors.text} size={24} />
          </Pressable>
          <View style={$titleContainer}>
            <Text text="Popular" preset="subheading" />
            <CaretDown color={theme.colors.text} size={16} />
          </View>
        </View>
        <View style={$rightHeader}>
          <Pressable onPress={() => console.log("Search pressed")} style={$iconButton}>
            <MagnifyingGlass color={theme.colors.text} size={24} />
          </Pressable>
          <Pressable onPress={openRightDrawer} style={$iconButton}>
            <User color={theme.colors.text} size={24} />
          </Pressable>
        </View>
      </View>

      {/* Main Content: Post List */}
      <ListView
        data={dummyPosts.filter(
          (post) => post.type === "text" || post.type === "link" || post.type === "media",
        )}
        renderItem={renderPost}
        estimatedItemSize={100}
        contentContainerStyle={$listContent}
      />
    </Screen>
  )
}

const $header: ThemedStyle<ViewStyle> = ({ colors }) => ({
  flexDirection: "row",
  alignItems: "center",
  justifyContent: "space-between",
  padding: 12,
  borderBottomWidth: 1,
  borderBottomColor: colors.border,
})

const $leftHeader: ViewStyle = {
  flexDirection: "row",
  alignItems: "center",
}

const $titleContainer: ViewStyle = {
  flexDirection: "row",
  alignItems: "center",
  marginLeft: 16,
}

const $rightHeader: ViewStyle = {
  flexDirection: "row",
  alignItems: "center",
}

const $iconButton: ViewStyle = {
  marginLeft: 16,
}

const $listContent: ViewStyle = {
  paddingHorizontal: 16,
}
