import { Image, ImageStyle, Platform, Pressable, TextStyle, View, ViewStyle } from "react-native"

import { useNavigation } from "@react-navigation/native"
import { ArrowDown, ArrowUp, ChatCircle, DotsThree, ShareFat } from "phosphor-react-native"

import { Text } from "@/components"
import { useVoting } from "@/hooks/useVoting"
import { NavigationProps } from "@/navigators"
import { ThemedStyle } from "@/theme"
import { useAppTheme } from "@/utils"

/**
 * PostCard Component
 *
 * A versatile card component that renders different types of Reddit-style posts:
 * - text: Simple text-based posts with title and optional preview text
 * - media: Posts containing images or videos (future support for various media types)
 * - link: Posts linking to external content (future support for link previews)
 *
 * @component
 * @example
 * ```tsx
 * <PostCard
 *   type="text"
 *   subcategory="programming"
 *   title="Hello World"
 *   votes={42}
 *   comments={10}
 * />
 * ```
 */

export interface PostCardProps {
  /** Unique identifier for the post */
  id: number
  /** Type of post content - determines rendering style */
  type: "link" | "media" | "text" | "poll" | "AMA"
  /** subcategory name without the 'r/' prefix */
  subcategory: string
  /** Icon URL for the subcategory */
  subcategoryIcon: string
  /** Post title */
  title: string
  /** URL for media content - TODO: Will support images, gifs, videos */
  imageUrl?: string
  /** External link URL - TODO: Will implement link preview component */
  linkUrl?: string
  /** Original source/domain for link posts */
  source?: string
  /** Text preview for text posts */
  preview?: string
  /** Number of upvotes minus downvotes */
  votes: number
  /** Number of comments */
  comments: number
  /** Number of awards received */
  awards?: number
  /** Whether the post is a promoted/sponsored content */
  promoted?: boolean
  author: {
    username: string
    display_name: string
    avatar: string
  }
}

export function PostCard(props: PostCardProps) {
  const { themed, theme } = useAppTheme()
  const navigation = useNavigation<NavigationProps>()

  const { votes, voteStatus, handleUpvote, handleDownvote } = useVoting({
    initialVotes: props.votes,
  })

  // TODO: Flash - Fix this type and make a common types file for navigation
  const handlePress = () => {
    navigation.navigate("PostDetails", {
      post: props,
      showComments: false,
    })
  }

  const handleCommentPress = () => {
    navigation.navigate("PostDetails", {
      post: props,
      showComments: true,
    })
  }

  const handleSubcategoryPress = () => {
    navigation.navigate("SubCategory", {
      subcategoryId: props.subcategory,
      title: props.subcategory,
    })
  }

  return (
    <Pressable style={themed($container)} onPress={handlePress}>
      <View style={$header}>
        <Pressable style={$headerLeft} onPress={handleSubcategoryPress}>
          <View style={$subcategoryContainer}>
            <Image
              source={{ uri: props.subcategoryIcon }}
              style={$subcategoryIcon}
              resizeMode="cover"
              onError={(error) => console.log("Icon load error:", error.nativeEvent)}
            />
            <View style={$textContainer}>
              <Text text={`sc/${props.subcategory}`} preset="formLabel" />
              <View style={$authorContainer}>
                <Image
                  source={{ uri: props.author.avatar }}
                  style={$authorAvatar}
                  resizeMode="cover"
                />
                <Text
                  text={`u/${props.author.username}`}
                  preset="formHelper"
                  style={themed($authorName)}
                />
              </View>
            </View>
          </View>
          {props.source && (
            <Text text={props.source} preset="formHelper" style={themed($sourceText)} />
          )}
          {Boolean(props.promoted) && (
            <View style={themed($promotedBadge)}>
              <Text text="PROMOTED" preset="formHelper" style={$promotedText} />
            </View>
          )}
        </Pressable>
        <Pressable style={$menuButton}>
          <DotsThree size={20} color={theme.colors.text} weight="bold" />
        </Pressable>
      </View>
      <Text text={props.title} preset="subheading" style={themed($title)} />
      {props.imageUrl && (
        <Image source={{ uri: props.imageUrl }} style={$image} resizeMode="cover" />
      )}
      {props.preview && <Text text={props.preview} preset="formHelper" style={themed($preview)} />}
      {props.linkUrl && <Text text={props.linkUrl} preset="formHelper" style={$link} />}
      <View style={$footer}>
        <Pressable style={themed($voteContainer)}>
          <Pressable onPress={handleUpvote}>
            <ArrowUp
              weight={voteStatus === "up" ? "fill" : "bold"}
              size={16}
              color={voteStatus === "up" ? theme.colors.primary : theme.colors.text}
            />
          </Pressable>
          <Text
            text={votes === 0 ? "Vote" : votes.toString()}
            style={[
              $iconText,
              voteStatus === "up" && { color: theme.colors.primary },
              voteStatus === "down" && { color: theme.colors.error },
            ]}
          />
          <View style={themed($divider)} />
          <Pressable onPress={handleDownvote}>
            <ArrowDown
              weight={voteStatus === "down" ? "fill" : "bold"}
              size={16}
              color={voteStatus === "down" ? theme.colors.error : theme.colors.text}
            />
          </Pressable>
        </Pressable>

        <Pressable style={themed($commentContainer)} onPress={handleCommentPress}>
          <ChatCircle size={16} color={theme.colors.text} />
          <Text text={props.comments.toString()} style={$iconText} />
        </Pressable>

        <Pressable style={themed($shareButton)}>
          <ShareFat size={16} color={theme.colors.text} />
          <Text text="Share" style={$iconText} />
        </Pressable>
      </View>
    </Pressable>
  )
}

const $container: ThemedStyle<ViewStyle> = ({
  colors,
}: {
  colors: { background: string; border: string }
}) => ({
  backgroundColor: colors.background,
  borderRadius: 8,
  padding: 12,
  marginBottom: 8,
  borderBottomWidth: 1,
  borderBottomColor: colors.border,
})

const $header: ViewStyle = {
  flexDirection: "row",
  alignItems: "center",
  justifyContent: "space-between",
  marginBottom: 8,
}

const $headerLeft: ViewStyle = {
  flex: 1,
  flexDirection: "row",
  alignItems: "center",
  flexWrap: "wrap", // Allow wrapping if needed
  gap: 8, // Add consistent spacing between elements
}

const $subcategoryIcon: ImageStyle = {
  width: 32,
  height: 32,
  borderRadius: 16,
  marginRight: 8,
  backgroundColor: "#E1E1E1",
}

const $promotedBadge: ThemedStyle<ViewStyle> = ({ colors }) => ({
  backgroundColor: colors.background,
  borderRadius: 12,
  paddingHorizontal: 8,
  paddingVertical: 2,
  borderWidth: 1,
  borderColor: colors.border,
})

const $promotedText: TextStyle = {
  fontSize: 11,
  color: "#737373",
  fontWeight: "500",
  textTransform: "uppercase",
}

const $sourceText: ThemedStyle<TextStyle> = ({ typography }) => ({
  color: "#737373",
  fontFamily: Platform.select({
    ios: typography.sf?.regular,
    android: typography.primary.normal,
  }),
})

const $title: ThemedStyle<TextStyle> = ({ typography }) => ({
  marginBottom: 8,
  paddingVertical: 4,
  fontFamily: Platform.select({
    ios: typography.sf?.bold,
    android: typography.primary.bold,
  }),
  fontSize: 17,
  letterSpacing: -0.4,
  lineHeight: 22,
})

const $image: ImageStyle = {
  width: "100%",
  height: 200,
  borderRadius: 8,
  marginBottom: 8,
}

const $preview: ThemedStyle<TextStyle> = ({ typography }) => ({
  marginBottom: 8,
  paddingVertical: 2,
  fontFamily: Platform.select({
    ios: typography.sf?.regular,
    android: typography.primary.normal,
  }),
  fontSize: 15,
  lineHeight: 20,
})

const $link: TextStyle = {
  marginBottom: 8,
}

const $footer: ViewStyle = {
  flexDirection: "row",
  alignItems: "center",
}

const $voteContainer: ThemedStyle<ViewStyle> = ({ colors }) => ({
  flexDirection: "row",
  alignItems: "center",
  marginRight: 16,
  gap: 4,
  backgroundColor: colors.background,
  borderRadius: 20,
  borderWidth: 1,
  borderColor: colors.border,
  paddingHorizontal: 12,
  paddingVertical: 4,
})

const $commentContainer: ThemedStyle<ViewStyle> = ({ colors }) => ({
  flexDirection: "row",
  alignItems: "center",
  marginRight: 16,
  gap: 4,
  backgroundColor: colors.background,
  borderRadius: 20,
  borderWidth: 1,
  borderColor: colors.border,
  paddingHorizontal: 12,
  paddingVertical: 4,
})

const $iconText: TextStyle = {
  marginLeft: 4,
  marginRight: 4,
}

const $shareButton: ThemedStyle<ViewStyle> = ({ colors }) => ({
  flexDirection: "row",
  alignItems: "center",
  backgroundColor: colors.background,
  borderRadius: 20,
  borderWidth: 1,
  borderColor: colors.border,
  paddingHorizontal: 12,
  paddingVertical: 4,
  marginLeft: "auto",
  gap: 4,
})

const $divider: ThemedStyle<ViewStyle> = ({ colors }) => ({
  width: 1,
  height: 16,
  backgroundColor: colors.border,
  marginHorizontal: 4,
})

const $menuButton: ViewStyle = {
  padding: 4,
}

const $authorContainer: ViewStyle = {
  flexDirection: "row",
  alignItems: "center",
  gap: 4,
  marginTop: 2, // Add some spacing between subcategory and author
}

const $authorAvatar: ImageStyle = {
  width: 16, // Slightly smaller avatar
  height: 16,
  borderRadius: 8,
  backgroundColor: "#E1E1E1",
}

const $authorName: ThemedStyle<TextStyle> = ({ colors }) => ({
  color: colors.textDim,
  fontSize: 12, // Smaller font size
})

const $subcategoryContainer: ViewStyle = {
  flexDirection: "row",
  alignItems: "center",
}

const $textContainer: ViewStyle = {
  marginLeft: 8,
}
