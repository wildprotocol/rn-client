import { FC, useCallback, useEffect, useState } from "react"
import {
  Image,
  ImageBackground,
  ImageStyle,
  Platform,
  Pressable,
  TextInput,
  TextStyle,
  View,
  ViewStyle,
} from "react-native"

import { formatDistanceToNow } from "date-fns"
import {
  ArrowDown,
  ArrowUp,
  CaretDown,
  CaretUp,
  ChatCircle,
  MagnifyingGlass,
  ShareFat,
} from "phosphor-react-native"

import { Header, Screen, Text } from "@/components"
import { PostCard, type PostCardProps } from "@/components/PostCard"
import { Reply, dummyReplies } from "@/data/dummyReplies"
import { useCommentSearch } from "@/hooks/useCommentSearch"
import { useVoting } from "@/hooks/useVoting"
import { AppStackScreenProps } from "@/navigators"
import { ThemedStyle } from "@/theme"
import { useAppTheme } from "@/utils"
import { getImageDominantColor, shouldUseLightText } from "@/utils/imageColors"

interface ReplyItemProps {
  /** The reply data to display */
  reply: Reply
  /** The nesting depth of the reply. Defaults to 0 */
  depth?: number
}

/**
 * A component that renders a single reply/comment with nested replies
 * @param {ReplyItemProps} props - The props for the ReplyItem component
 * @returns {JSX.Element} The rendered ReplyItem component
 */
const ReplyItem: React.FC<ReplyItemProps> = ({ reply, depth = 0 }) => {
  const { themed, theme } = useAppTheme()
  const { votes, voteStatus, handleUpvote, handleDownvote } = useVoting({
    initialVotes: reply.votes,
  })
  const [isCollapsed, setIsCollapsed] = useState(false)
  const hasReplies = reply.replies && reply.replies.length > 0

  const toggleCollapse = () => {
    setIsCollapsed(!isCollapsed)
  }

  // Get total count of all nested replies
  const getTotalReplyCount = (reply: Reply): number => {
    let count = 0
    if (reply.replies) {
      count += reply.replies.length
      reply.replies.forEach((childReply) => {
        count += getTotalReplyCount(childReply)
      })
    }
    return count
  }

  const totalReplies = hasReplies ? getTotalReplyCount(reply) : 0

  return (
    <View style={[themed($replyContainer), { marginLeft: depth * 8 }]}>
      <Pressable style={$replyHeader} onPress={toggleCollapse}>
        {/* Vertical line indicators for depth */}
        {depth > 0 && (
          <View style={$threadLines}>
            {Array.from({ length: depth }).map((_, index) => (
              <View
                key={index}
                style={[
                  themed($threadLine),
                  { left: index * 8 }, // Matches marginLeft spacing
                ]}
              />
            ))}
          </View>
        )}

        <View style={$headerContent}>
          <View style={$headerTop}>
            <Image source={{ uri: reply.authorAvatar }} style={$authorAvatar} />
            <Text
              text={reply.author}
              preset="formLabel"
              style={[$authorText, isCollapsed && { color: theme.colors.textDim }]}
            />
            <Text
              text={` • ${formatDistanceToNow(reply.timestamp, { addSuffix: true })}`}
              preset="formHelper"
              style={[$timestamp, isCollapsed && { color: theme.colors.textDim }]}
            />
          </View>

          {!isCollapsed ? (
            <View>
              <Text text={reply.content} style={themed($replyText)} />
              <View style={$replyFooter}>
                <View style={themed($voteContainer)}>
                  <Pressable onPress={handleUpvote} hitSlop={8}>
                    <ArrowUp
                      weight={voteStatus === "up" ? "fill" : "bold"}
                      size={14}
                      color={voteStatus === "up" ? theme.colors.primary : theme.colors.textDim}
                    />
                  </Pressable>
                  <Text
                    text={votes.toString()}
                    style={[
                      $voteText,
                      voteStatus === "up" && { color: theme.colors.primary },
                      voteStatus === "down" && { color: theme.colors.error },
                    ]}
                  />
                  <Pressable onPress={handleDownvote} hitSlop={8}>
                    <ArrowDown
                      weight={voteStatus === "down" ? "fill" : "bold"}
                      size={14}
                      color={voteStatus === "down" ? theme.colors.error : theme.colors.textDim}
                    />
                  </Pressable>
                </View>

                <View style={$actionsContainer}>
                  <Pressable style={$actionItem} onPress={toggleCollapse}>
                    <ChatCircle size={14} color={theme.colors.textDim} />
                    <Text text="Reply" preset="formHelper" style={themed($actionText)} />
                  </Pressable>

                  <Text text="•" style={$dotSeparator} />

                  <Pressable style={$actionItem}>
                    <ShareFat size={14} color={theme.colors.textDim} />
                    <Text text="Share" preset="formHelper" style={themed($actionText)} />
                  </Pressable>

                  {totalReplies > 0 && (
                    <>
                      <Text text="•" style={$dotSeparator} />
                      <Text
                        text={`${totalReplies} ${totalReplies === 1 ? "reply" : "replies"}`}
                        preset="formHelper"
                        style={themed($actionText)}
                      />
                    </>
                  )}
                </View>
              </View>

              {/* Nested Replies */}
              {hasReplies && (
                <View style={$repliesWrapper}>
                  {reply.replies?.map((childReply) => (
                    <ReplyItem key={childReply.id} reply={childReply} depth={depth + 1} />
                  ))}
                </View>
              )}
            </View>
          ) : (
            totalReplies > 0 && (
              <Text
                text={`${totalReplies} more ${totalReplies === 1 ? "reply" : "replies"} hidden`}
                preset="formHelper"
                style={$collapsedCount}
              />
            )
          )}
        </View>
      </Pressable>
    </View>
  )
}

interface PostDetailsScreenProps extends AppStackScreenProps<"PostDetails"> {}

/**
 * A screen component that displays a post's details and its comments/replies
 * Supports features like:
 * - Collapsible post view
 * - Nested comments with threading
 * - Comment voting
 * - Comment searching
 * - Collapsible comment threads
 *
 * @param {PostDetailsScreenProps} props - The props for the PostDetails screen
 * @returns {JSX.Element} The rendered PostDetails screen
 */
export const PostDetailsScreen: FC<PostDetailsScreenProps> = ({ route, navigation }) => {
  const { themed, theme } = useAppTheme()
  const { post, showComments } = route.params
  const [isPostCollapsed, setIsPostCollapsed] = useState(showComments ?? false)
  const {
    isSearchVisible,
    searchQuery,
    searchResults,
    toggleSearch,
    setSearchQuery,
    searchComments,
  } = useCommentSearch()
  const [dominantColor, setDominantColor] = useState<string | null>(null)

  // Get replies for this post
  const postReplies = dummyReplies[post.id] || []
  const hasReplies = postReplies.length > 0

  // Add useCallback to memoize the search function
  const memoizedSearchComments = useCallback(
    (replies: Reply[], query: string) => {
      searchComments(replies, query)
    },
    [searchComments],
  )

  // Update the useEffect with proper dependencies
  useEffect(() => {
    if (searchQuery) {
      memoizedSearchComments(postReplies, searchQuery)
    }
  }, [searchQuery, postReplies, memoizedSearchComments])

  useEffect(() => {
    if (post.subcategoryIcon) {
      getImageDominantColor(post.subcategoryIcon)
        .then((color) => setDominantColor(color))
        .catch(() => setDominantColor(null))
    }
  }, [post.subcategoryIcon])

  const togglePostCollapse = () => {
    setIsPostCollapsed(!isPostCollapsed)
  }

  return (
    <>
      {isSearchVisible ? (
        <Header
          leftIcon="x"
          onLeftPress={toggleSearch}
          title=""
          RightActionComponent={
            <TextInput
              value={searchQuery}
              onChangeText={setSearchQuery}
              placeholder="Search comments..."
              placeholderTextColor={theme.colors.textDim}
              style={themed($headerSearchInput)}
              autoFocus
            />
          }
        />
      ) : (
        <Header
          leftIcon="x"
          onLeftPress={() => navigation.goBack()}
          title={`r/${post.subcategory}`}
          RightActionComponent={
            <Pressable onPress={toggleSearch} style={$searchButton} hitSlop={8}>
              <MagnifyingGlass size={20} color={theme.colors.text} />
            </Pressable>
          }
        />
      )}

      <Screen
        preset="auto"
        ScrollViewProps={{ showsVerticalScrollIndicator: false }}
        style={themed($root)}
        safeAreaEdges={["bottom"]}
      >
        {/* Collapsible Post Section */}
        {isPostCollapsed ? (
          <ImageBackground
            source={{ uri: post.subcategoryIcon }}
            style={[
              themed($collapsedPost),
              dominantColor ? { backgroundColor: dominantColor } : undefined,
            ]}
            imageStyle={themed($collapsedPostBackground)}
          >
            <Pressable
              style={[
                themed($collapsedPostContent),
                { backgroundColor: dominantColor ? `${dominantColor}CC` : "rgba(0,0,0,0.5)" },
              ]}
              onPress={togglePostCollapse}
            >
              <View style={$collapsedHeader}>
                <Text
                  text={post.title}
                  preset="subheading"
                  style={[
                    themed($collapsedTitle),
                    {
                      color: dominantColor
                        ? shouldUseLightText(dominantColor)
                          ? "#FFFFFF"
                          : "#000000"
                        : theme.colors.background,
                    },
                  ]}
                  numberOfLines={1}
                />
                <CaretDown
                  size={20}
                  color={
                    dominantColor
                      ? shouldUseLightText(dominantColor)
                        ? "#FFFFFF"
                        : "#000000"
                      : theme.colors.background
                  }
                />
              </View>
            </Pressable>
          </ImageBackground>
        ) : (
          <View>
            <PostCard {...post} />
          </View>
        )}

        {/* Comments section */}
        <View style={$commentsSection}>
          <Pressable style={themed($commentsSectionHeader)} onPress={togglePostCollapse}>
            <View style={$headerLeftContent}>
              <Text
                preset="subheading"
                text={
                  searchQuery
                    ? `Search Results (${searchResults.length})`
                    : `Comments (${post.comments})`
                }
                style={themed($commentsHeader)}
              />
            </View>
            {post.comments > 0 && (
              <View style={$collapseButtonContent}>
                {isPostCollapsed ? (
                  <Text text="Show post" style={themed($collapseText)} />
                ) : (
                  <>
                    <CaretUp size={16} color={theme.colors.text} />
                    <Text text="Collapse" style={themed($collapseText)} />
                  </>
                )}
              </View>
            )}
          </Pressable>

          {hasReplies ? (
            <View style={$repliesContainer}>
              {(searchQuery ? searchResults : postReplies).map((reply) => (
                <ReplyItem key={reply.id} reply={reply} />
              ))}
            </View>
          ) : (
            <View style={themed($commentPlaceholder)}>
              <Text
                text={searchQuery ? "No matching comments" : "Be the first to comment..."}
                style={$placeholderText}
              />
            </View>
          )}
        </View>
      </Screen>
    </>
  )
}

const $root: ThemedStyle<ViewStyle> = ({ colors }) => ({
  flex: 1,
  backgroundColor: colors.background,
})

const $commentsSection: ViewStyle = {
  marginTop: 8,
  paddingHorizontal: 12,
}

const $commentsHeader: ThemedStyle<TextStyle> = ({ typography }) => ({
  fontFamily: Platform.select({
    ios: typography.sf?.bold,
    android: typography.primary.bold,
  }),
  fontSize: 17,
  letterSpacing: -0.4,
  lineHeight: 22,
})

const $commentPlaceholder: ThemedStyle<ViewStyle> = ({ colors }) => ({
  padding: 16,
  borderRadius: 8,
  borderWidth: 1,
  borderColor: colors.border,
  marginBottom: 16,
})

const $placeholderText: TextStyle = {
  color: "#737373",
}

const $collapsedPost: ThemedStyle<ViewStyle> = ({ colors }) => ({
  borderBottomWidth: 1,
  borderBottomColor: colors.border,
  overflow: "hidden",
})

const $collapsedPostBackground: ThemedStyle<ImageStyle> = () => ({
  opacity: 0.15,
})

const $collapsedPostContent: ThemedStyle<ViewStyle> = () => ({
  padding: 16,
  backgroundColor: "rgba(0,0,0,0.5)",
})

const $collapsedHeader: ViewStyle = {
  flexDirection: "row",
  alignItems: "center",
  justifyContent: "space-between",
}

const $collapsedTitle: ThemedStyle<TextStyle> = ({ typography }) => ({
  flex: 1,
  marginRight: 8,
  paddingVertical: 4,
  fontFamily: Platform.select({
    ios: typography.sf?.bold,
    android: typography.primary.bold,
  }),
  fontSize: 17,
  letterSpacing: -0.4,
  lineHeight: 22,
})

const $collapseButton: ThemedStyle<ViewStyle> = ({ colors }) => ({
  flexDirection: "row",
  alignItems: "center",
  padding: 8,
  borderRadius: 20,
  alignSelf: "center",
  marginVertical: 4,
})

const $collapseButtonText: TextStyle = {
  marginLeft: 4,
}

const $replyContainer: ThemedStyle<ViewStyle> = ({ colors }) => ({
  borderLeftWidth: 2,
  borderLeftColor: colors.border,
  marginVertical: 2,
})

const $replyHeader: ViewStyle = {
  flexDirection: "row",
  alignItems: "center",
  paddingVertical: 8,
  paddingHorizontal: 12,
}

const $headerLeft: ViewStyle = {
  flexDirection: "row",
  alignItems: "center",
  flexWrap: "wrap",
  flex: 1,
}

const $collapseIndicator: TextStyle = {
  marginRight: 8,
  fontFamily: "monospace",
}

const $timestamp: TextStyle = {
  marginLeft: 8,
  fontSize: 12,
  opacity: 0.7,
}

const $points: TextStyle = {
  marginLeft: 8,
}

const $replyContent: ViewStyle = {
  paddingHorizontal: 12,
  paddingBottom: 8,
}

const $replyText: ThemedStyle<TextStyle> = ({ typography }) => ({
  marginBottom: 8,
  paddingVertical: 2,
  fontFamily: Platform.select({
    ios: typography.sf?.regular,
    android: typography.primary.normal,
  }),
  fontSize: 15,
  lineHeight: 20,
})

const $replyFooter: ViewStyle = {
  flexDirection: "row",
  alignItems: "center",
  marginTop: 8,
  marginBottom: 4,
}

const $voteContainer: ThemedStyle<ViewStyle> = ({ colors }) => ({
  flexDirection: "row",
  alignItems: "center",
  gap: 4,
  paddingRight: 12,
})

const $voteText: TextStyle = {
  fontSize: 12,
  fontWeight: "500",
  minWidth: 20,
  textAlign: "center",
}

const $actionsContainer: ViewStyle = {
  flexDirection: "row",
  alignItems: "center",
  flex: 1,
}

const $actionItem: ViewStyle = {
  flexDirection: "row",
  alignItems: "center",
  gap: 4,
}

const $actionText: ThemedStyle<TextStyle> = ({ typography }) => ({
  fontSize: 12,
  color: "#737373",
  fontFamily: Platform.select({
    ios: typography.sf?.regular,
    android: typography.primary.normal,
  }),
})

const $dotSeparator: TextStyle = {
  color: "#737373",
  marginHorizontal: 8,
  fontSize: 12,
}

const $repliesWrapper: ViewStyle = {
  marginTop: 8,
}

const $collapsedPreview: ThemedStyle<ViewStyle> = ({ colors }) => ({
  paddingHorizontal: 12,
  paddingBottom: 8,
  opacity: 0.7,
})

const $previewContent: TextStyle = {
  fontSize: 12,
  color: "#737373",
}

const $previewItem: ViewStyle = {
  paddingVertical: 4,
}

const $threadLines: ViewStyle = {
  position: "absolute",
  top: 0,
  bottom: 0,
  left: 0,
  width: "100%",
}

const $threadLine: ThemedStyle<ViewStyle> = ({ colors }) => ({
  position: "absolute",
  top: 0,
  bottom: 0,
  width: 2,
  backgroundColor: colors.border,
  opacity: 0.5,
})

const $headerContent: ViewStyle = {
  flex: 1,
  paddingLeft: 4,
}

const $headerTop: ViewStyle = {
  flexDirection: "row",
  alignItems: "center",
  flexWrap: "wrap",
}

const $authorText: TextStyle = {
  fontSize: 13,
  fontWeight: "500",
}

const $collapsedCount: TextStyle = {
  fontSize: 12,
  color: "#737373",
  marginTop: 2,
}

const $repliesContainer: ViewStyle = {
  paddingTop: 4,
}

const $searchButton: ViewStyle = {
  padding: 8,
}

const $headerSearchInput: ThemedStyle<TextStyle> = ({ colors, typography }) => ({
  flex: 1,
  fontSize: 16,
  color: colors.text,
  fontFamily: typography.primary.normal,
  height: 36,
})

const $authorAvatar: ImageStyle = {
  width: 20,
  height: 20,
  borderRadius: 10,
  marginRight: 8,
}

const $commentsSectionHeader: ThemedStyle<ViewStyle> = ({ colors }) => ({
  flexDirection: "row",
  alignItems: "center",
  justifyContent: "space-between",
  paddingVertical: 12,
  paddingHorizontal: 4,
  marginBottom: 8,
  borderRadius: 8,
})

const $headerLeftContent: ViewStyle = {
  flexDirection: "row",
  alignItems: "center",
}

const $collapseButtonContent: ViewStyle = {
  flexDirection: "row",
  alignItems: "center",
  gap: 4,
}

const $collapseText: ThemedStyle<TextStyle> = ({ colors, typography }) => ({
  fontSize: 13,
  color: colors.text,
  fontFamily: Platform.select({
    ios: typography.sf?.regular,
    android: typography.primary.normal,
  }),
})
