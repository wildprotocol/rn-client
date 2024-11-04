import { FC, useState } from "react"
import { Pressable, ScrollView, TextStyle, View, ViewStyle } from "react-native"

import { NativeStackScreenProps } from "@react-navigation/native-stack"

import { Header, PostCard, Screen, Text } from "@/components"
import { ListView } from "@/components/ListView"
import { dummyPosts } from "@/data/dummyData"
import { HomeTabParamList } from "@/navigators"
import { ThemedStyle } from "@/theme"
import { useAppTheme } from "@/utils"

// Temporary dummy data - Replace with actual data later
const DUMMY_SUBCATEGORY = {
  id: "programming",
  name: "Programming",
  description: "A community for programming enthusiasts to share knowledge and experiences.",
  members: 245000,
  online: 1234,
  icon: "https://picsum.photos/200", // Replace with actual icon
}

const FILTER_OPTIONS = [
  { id: "hot", label: "Hot" },
  { id: "new", label: "New" },
  { id: "top", label: "Top" },
  { id: "rising", label: "Rising" },
]

type SubCategoryScreenProps = NativeStackScreenProps<HomeTabParamList, "SubCategory">

export const SubCategoryScreen: FC<SubCategoryScreenProps> = function SubCategoryScreen({
  navigation,
  route,
}: SubCategoryScreenProps) {
  const { themed } = useAppTheme()
  const { title } = route?.params
  const [selectedFilter, setSelectedFilter] = useState("hot")

  const renderPost = ({ item }: { item: (typeof dummyPosts)[0] }) => {
    return <PostCard {...item} />
  }

  return (
    <>
      <Header leftIcon="caretLeft" onLeftPress={() => navigation.goBack()} title={title} />
      <Screen style={$root} preset="auto">
        {/* Custom Header */}
        {/* <View style={themed($header)}>
        <Pressable onPress={() => navigation.goBack()} style={$headerButton}>
          <CaretDown color={theme.colors.text} size={24} />
        </Pressable>
        <View style={$titleContainer}>
          <Image source={{ uri: DUMMY_SUBCATEGORY.icon }} style={$subcategoryIcon} />
          <Text text={`sc/${title}`} />
        </View>
        <View style={$headerActions}>
          <Pressable style={$headerButton}>
            <Bell size={24} color={theme.colors.text} />
          </Pressable>
          <Pressable style={$headerButton}>
            <ShareFat size={24} color={theme.colors.text} />
          </Pressable>
          <Pressable style={$headerButton}>
            <DotsThree size={24} color={theme.colors.text} weight="bold" />
          </Pressable>
        </View>
      </View> */}

        <ListView
          ListHeaderComponent={() => (
            <>
              {/* About Section */}
              <View style={themed($aboutSection)}>
                <Text text="About Community" style={$sectionTitle} />
                <Text text={DUMMY_SUBCATEGORY.description} style={themed($description)} />
                <View style={$statsContainer}>
                  <View style={$stat}>
                    <Text text={DUMMY_SUBCATEGORY.members.toLocaleString()} />
                    <Text text="Members" style={themed($statLabel)} />
                  </View>
                  <View style={$stat}>
                    <Text text={DUMMY_SUBCATEGORY.online.toLocaleString()} />
                    <Text text="Online" style={themed($statLabel)} />
                  </View>
                </View>
              </View>

              {/* Filter Section */}
              <ScrollView
                horizontal
                showsHorizontalScrollIndicator={false}
                style={$filterScroll}
                contentContainerStyle={$filterContainer}
              >
                {FILTER_OPTIONS.map((filter) => (
                  <Pressable
                    key={filter.id}
                    style={[
                      themed($filterButton),
                      selectedFilter === filter.id && themed($filterButtonActive),
                    ]}
                    onPress={() => setSelectedFilter(filter.id)}
                  >
                    <Text
                      text={filter.label}
                      style={[
                        themed($filterText),
                        selectedFilter === filter.id && themed($filterTextActive),
                      ]}
                    />
                  </Pressable>
                ))}
              </ScrollView>
            </>
          )}
          data={dummyPosts.filter(
            (post) => post.type === "text" || post.type === "link" || post.type === "media",
          )}
          renderItem={renderPost}
          estimatedItemSize={100}
          contentContainerStyle={$listContent}
        />
      </Screen>
    </>
  )
}

const $root: ViewStyle = {
  flex: 1,
}

// const $header: ThemedStyle<ViewStyle> = ({ colors }) => ({
//   flexDirection: "row",
//   alignItems: "center",
//   justifyContent: "space-between",
//   paddingHorizontal: 16,
//   paddingVertical: 12,
//   borderBottomWidth: 1,
//   borderBottomColor: colors.border,
// })

// const $headerButton: ViewStyle = {
//   padding: 8,
// }

// const $headerActions: ViewStyle = {
//   flexDirection: "row",
//   alignItems: "center",
//   gap: 8,
// }

// const $titleContainer: ViewStyle = {
//   flexDirection: "row",
//   alignItems: "center",
//   gap: 8,
// }

// const $subcategoryIcon: ImageStyle = {
//   width: 32,
//   height: 32,
//   borderRadius: 16,
// }

const $aboutSection: ThemedStyle<ViewStyle> = ({ colors }) => ({
  padding: 16,
  backgroundColor: colors.background,
  borderBottomWidth: 1,
  borderBottomColor: colors.border,
})

const $sectionTitle: TextStyle = {
  marginBottom: 8,
}

const $description: ThemedStyle<TextStyle> = ({ colors }) => ({
  color: colors.textDim,
  marginBottom: 16,
})

const $statsContainer: ViewStyle = {
  flexDirection: "row",
  gap: 24,
}

const $stat: ViewStyle = {
  alignItems: "flex-start",
}

const $statLabel: ThemedStyle<TextStyle> = ({ colors }) => ({
  color: colors.textDim,
  fontSize: 12,
})

const $filterScroll: ViewStyle = {
  // borderBottomWidth: 1,
  // borderBottomColor: "#E5E5E5",
}

const $filterContainer: ViewStyle = {
  flexDirection: "row",
  padding: 12,
  gap: 8,
}

const $filterButton: ThemedStyle<ViewStyle> = ({ colors }) => ({
  paddingHorizontal: 16,
  paddingVertical: 8,
  borderRadius: 20,
  borderWidth: 1,
  borderColor: colors.border,
})

const $filterButtonActive: ThemedStyle<ViewStyle> = ({ colors }) => ({
  backgroundColor: colors.primary,
  borderColor: colors.primary,
})

const $filterText: ThemedStyle<TextStyle> = ({ colors }) => ({
  color: colors.text,
})

const $filterTextActive: ThemedStyle<TextStyle> = () => ({
  color: "#FFFFFF",
})

const $listContent: ViewStyle = {
  // padding: 16,
}
