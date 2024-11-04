import { memo, useCallback } from "react"
import { View, ViewStyle } from "react-native"

import { DrawerContentComponentProps, DrawerContentScrollView } from "@react-navigation/drawer"
import { useNavigation } from "@react-navigation/native"
import { FolderStar, Plus, PresentationChart } from "phosphor-react-native"

import { NavigationProps } from "@/navigators/types"
import { $styles, ThemedStyle } from "@/theme"
import { useAppTheme } from "@/utils"

import { Accordion } from "../Accordion"
import { ListView } from "../ListView"
import { Text } from "../Text"
import { SidebarItem } from "./SidebarItem"
import { COMMUNITIES, RECENTLY_VISITED } from "./sidebarConstants"

const RecentlyVisitedSection: React.FC = memo(() => {
  const { themed } = useAppTheme()
  const navigation = useNavigation<NavigationProps>()

  const renderItem = useCallback(
    ({ item }: { item: (typeof RECENTLY_VISITED)[0] }) => (
      <SidebarItem
        name={`sc/${item.name}`}
        uri={item.uri}
        onPress={() => {
          navigation.navigate("SubCategory", { subcategoryId: `sc/${item.name}`, title: item.name })
        }}
        isFavourite={false}
      />
    ),
    [navigation],
  )

  return (
    <View style={themed($paddingHorizontal)}>
      <View style={$styles.rowBetween}>
        <Text text="Recently Visited" accessibilityRole="header" />
        <Text text="See all" accessibilityRole="button" />
      </View>
      <ListView
        data={RECENTLY_VISITED}
        estimatedItemSize={20}
        renderItem={renderItem}
        contentContainerStyle={themed($listViewContent)}
        ItemSeparatorComponent={() => <View style={themed($separator)} />}
      />
    </View>
  )
})

const CommunitiesSection: React.FC = memo(() => {
  const {
    themed,
    theme: { colors },
  } = useAppTheme()
  const navigation = useNavigation<NavigationProps>()

  const renderItem = useCallback(
    ({ item }: { item: (typeof COMMUNITIES)[0] }) => (
      <SidebarItem
        name={item.name}
        uri={item.uri}
        onPress={() => {
          navigation.navigate("SubCategory", { subcategoryId: item.name, title: item.name })
        }}
        onFavouritePress={() => {}}
        isFavourite
      />
    ),
    [navigation],
  )

  return (
    <Accordion containerStyle={themed($accordionContainer)} expanded title="Your Communities">
      <ListView
        data={COMMUNITIES}
        ItemSeparatorComponent={() => <View style={themed($separator)} />}
        renderItem={renderItem}
        ListHeaderComponent={
          <View style={[themed($itemContainer), themed($listHeaderContainer)]}>
            <Plus color={colors.text} size={20} />
            <Text text="Create a community" accessibilityRole="button" />
          </View>
        }
        contentContainerStyle={themed($communitiesListContent)}
        ListFooterComponentStyle={themed($listFooter)}
        ListFooterComponent={
          <SidebarItem
            name="Custom Feeds"
            onPress={() => {}}
            icon={<FolderStar color={colors.text} size={20} />}
            isFavourite={false}
            onFavouritePress={() => {}}
          />
        }
        estimatedItemSize={20}
      />
    </Accordion>
  )
})

export const LeftSidebar: React.FC<DrawerContentComponentProps> = memo((props) => {
  const {
    themed,
    theme: { colors },
  } = useAppTheme()

  return (
    <DrawerContentScrollView {...props}>
      <View>
        <RecentlyVisitedSection />
        <CommunitiesSection />
        <SidebarItem
          containerStyle={themed($paddingHorizontal)}
          name="All"
          onPress={() => {}}
          icon={<PresentationChart color={colors.text} size={20} />}
          isFavourite={false}
        />
      </View>
    </DrawerContentScrollView>
  )
})

LeftSidebar.displayName = "LeftSidebar"
CommunitiesSection.displayName = "CommunitiesSection"
RecentlyVisitedSection.displayName = "RecentlyVisitedSection"

const $paddingHorizontal: ThemedStyle<ViewStyle> = ({ spacing }) => ({
  paddingHorizontal: spacing.sm,
})

const $separator: ThemedStyle<ViewStyle> = ({ spacing }) => ({
  height: spacing.md,
})

const $accordionContainer: ThemedStyle<ViewStyle> = ({ colors, spacing }) => ({
  borderColor: colors.border,
  borderTopWidth: 1,
  borderBottomWidth: 1,
  padding: spacing.sm,
})

const $listFooter: ThemedStyle<ViewStyle> = ({ spacing }) => ({
  marginTop: spacing.md,
})

const $itemContainer: ThemedStyle<ViewStyle> = ({ spacing }) => ({
  flexDirection: "row",
  alignItems: "center",
  gap: spacing.xs,
})

const $listViewContent: ThemedStyle<ViewStyle> = ({ spacing }) => ({
  paddingVertical: spacing.md,
})

const $listHeaderContainer: ThemedStyle<ViewStyle> = ({ spacing }) => ({
  paddingBottom: spacing.md,
})

const $communitiesListContent: ThemedStyle<ViewStyle> = ({ spacing }) => ({
  paddingTop: spacing.md,
})
