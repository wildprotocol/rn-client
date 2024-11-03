import { useCallback, useState } from "react"
import {
  Image,
  ImageBackground,
  ImageStyle,
  Pressable,
  ScrollView,
  TextStyle,
  View,
  ViewStyle,
} from "react-native"

import { format } from "date-fns"
import {
  Bell,
  CaretDown,
  CheckCircle,
  Crown,
  GearSix,
  Share,
  ShieldStar,
  User,
  UserCirclePlus,
} from "phosphor-react-native"

import { Header, Screen, Text } from "@/components"
import { dummyUser } from "@/data/dummyUser"
import { AppStackScreenProps } from "@/navigators"
import { ThemedStyle } from "@/theme"
import { useAppTheme } from "@/utils"

/**
 * ProfileScreen Component
 *
 * A screen component that displays a user's profile information including:
 * - Profile banner and avatar
 * - User stats (tips, followers, following)
 * - User badges (verified, premium, moderator status)
 * - Bio and account information
 * - Follow/Unfollow functionality
 *
 * @component
 * @example
 * ```tsx
 * <ProfileScreen />
 * ```
 */

interface ProfileScreenProps extends AppStackScreenProps<"Profile"> {}

/**
 * The profile screen displays detailed user information and allows interaction
 * with the user's profile such as following/unfollowing and viewing stats.
 *
 * @param {ProfileScreenProps} props - The props for the ProfileScreen component
 * @returns {JSX.Element} The rendered ProfileScreen component
 */
export const ProfileScreen: React.FC<ProfileScreenProps> = ({ navigation }: ProfileScreenProps) => {
  const { themed, theme } = useAppTheme()
  const [isFollowing, setIsFollowing] = useState(false)

  /**
   * Handles the follow/unfollow button press
   * Toggles between following and not following states
   */
  const handleFollowPress = useCallback(() => {
    setIsFollowing((prev) => !prev)
  }, [])

  return (
    <Screen style={themed($root)} preset="scroll">
      <Header
        leftIcon="caretLeft"
        onLeftPress={() => navigation.goBack()}
        RightActionComponent={
          <View style={$headerRight}>
            <Pressable style={$iconButton}>
              <Bell size={24} color={theme.colors.text} />
            </Pressable>
            <Pressable style={$iconButton}>
              <GearSix size={24} color={theme.colors.text} />
            </Pressable>
          </View>
        }
      />

      <ScrollView>
        <ImageBackground source={{ uri: dummyUser.banner }} style={$banner}>
          <View style={themed($bannerOverlay)} />
        </ImageBackground>

        <View style={themed($profileContainer)}>
          <Image source={{ uri: dummyUser.avatar }} style={$avatar} />

          <View style={$userInfoContainer}>
            <View style={$nameContainer}>
              <Text preset="heading" text={dummyUser.displayName} />
              {dummyUser.isVerified && (
                <CheckCircle weight="fill" size={20} color={theme.colors.primary} />
              )}
              {dummyUser.isPremium && <Crown weight="fill" size={20} color="#FFD700" />}
              {dummyUser.isModerator && (
                <ShieldStar weight="fill" size={20} color={theme.colors.primary} />
              )}
            </View>
            <Text preset="formLabel" style={themed($username)} text={`u/${dummyUser.username}`} />
          </View>

          <View style={$statsContainer}>
            <View style={$statItem}>
              <Text preset="heading" text={dummyUser.stats.totalKarma.toLocaleString()} />
              <Text preset="formLabel" text="Tips Received" style={themed($statLabel)} />
            </View>
            <View style={themed($statDivider)} />
            <View style={$statItem}>
              <Text preset="heading" text={dummyUser.stats.followers.toLocaleString()} />
              <Text preset="formLabel" text="Followers" style={themed($statLabel)} />
            </View>
            <View style={themed($statDivider)} />
            <View style={$statItem}>
              <Text preset="heading" text={dummyUser.stats.following.toLocaleString()} />
              <Text preset="formLabel" text="Following" style={themed($statLabel)} />
            </View>
          </View>

          <Text style={themed($bio)} text={dummyUser.bio} />

          <View style={$buttonContainer}>
            <Pressable
              style={[themed($button), isFollowing && themed($followingButton)]}
              onPress={handleFollowPress}
            >
              {isFollowing ? (
                <>
                  <User weight="fill" size={20} color={theme.colors.text} />
                  <Text
                    preset="formLabel"
                    text="Following"
                    style={[themed($buttonText), isFollowing && themed($followingText)]}
                  />
                  <CaretDown size={16} color={theme.colors.text} />
                </>
              ) : (
                <>
                  <UserCirclePlus weight="fill" size={20} color={theme.colors.background} />
                  <Text preset="formLabel" text="Follow" style={$buttonText} />
                </>
              )}
            </Pressable>
            <Pressable style={themed($iconButtonOutlined)}>
              <Share size={20} color={theme.colors.text} />
            </Pressable>
          </View>

          <View style={themed($infoContainer)}>
            <Text
              preset="formLabel"
              style={themed($infoText)}
              text={`Account created ${format(dummyUser.stats.accountAge, "MMMM d, yyyy")}`}
            />
          </View>
        </View>
      </ScrollView>
    </Screen>
  )
}

/**
 * Styles
 * The styles are organized by component section and use the themed style system
 * for consistent appearance across light/dark modes
 */

const $root: ThemedStyle<ViewStyle> = ({ colors }) => ({
  flex: 1,
  backgroundColor: colors.background,
})

// Banner styles
const $banner: ViewStyle = {
  height: 150,
}

const $bannerOverlay: ThemedStyle<ViewStyle> = ({ colors }) => ({
  position: "absolute",
  top: 0,
  left: 0,
  right: 0,
  bottom: 0,
  backgroundColor: colors.background,
  opacity: 0.2,
})

// Profile container styles
const $profileContainer: ThemedStyle<ViewStyle> = ({ colors, spacing }) => ({
  marginTop: -40,
  padding: spacing.md,
  backgroundColor: colors.background,
})

// User info styles
const $userInfoContainer: ViewStyle = {
  marginBottom: 16,
}

const $avatar: ImageStyle = {
  width: 80,
  height: 80,
  borderRadius: 40,
  borderWidth: 4,
  borderColor: "white",
  marginBottom: 16,
}

const $nameContainer: ViewStyle = {
  flexDirection: "row",
  alignItems: "center",
  gap: 8,
}

const $username: ThemedStyle<TextStyle> = ({ colors }) => ({
  color: colors.textDim,
  marginTop: 4,
})

// Stats section styles
const $statsContainer: ViewStyle = {
  flexDirection: "row",
  justifyContent: "space-around",
  marginVertical: 24,
}

const $statItem: ViewStyle = {
  alignItems: "center",
}

const $statLabel: ThemedStyle<TextStyle> = ({ colors }) => ({
  color: colors.textDim,
  marginTop: 4,
})

const $statDivider: ThemedStyle<ViewStyle> = ({ colors }) => ({
  width: 1,
  height: "100%",
  backgroundColor: colors.border,
})

const $bio: ThemedStyle<TextStyle> = ({ colors, typography }) => ({
  color: colors.text,
  fontFamily: typography.primary.normal,
  fontSize: 15,
  lineHeight: 20,
  marginBottom: 24,
})

// Button styles
const $buttonContainer: ViewStyle = {
  flexDirection: "row",
  gap: 12,
  marginBottom: 24,
}

const $button: ThemedStyle<ViewStyle> = ({ colors }) => ({
  flex: 1,
  flexDirection: "row",
  alignItems: "center",
  justifyContent: "center",
  gap: 8,
  backgroundColor: colors.primary,
  paddingVertical: 8,
  paddingHorizontal: 16,
  borderRadius: 20,
})

const $followingButton: ThemedStyle<ViewStyle> = ({ colors }) => ({
  backgroundColor: colors.background,
  borderWidth: 1,
  borderColor: colors.border,
})

const $buttonText: TextStyle = {
  color: "white",
  fontSize: 15,
  fontWeight: "600",
}

const $followingText: ThemedStyle<TextStyle> = ({ colors }) => ({
  color: colors.text,
})

const $iconButtonOutlined: ThemedStyle<ViewStyle> = ({ colors }) => ({
  padding: 8,
  borderRadius: 20,
  borderWidth: 1,
  borderColor: colors.border,
})

const $infoContainer: ThemedStyle<ViewStyle> = ({ colors }) => ({
  padding: 12,
  borderRadius: 8,
  backgroundColor: colors.background,
})

const $infoText: ThemedStyle<TextStyle> = ({ colors }) => ({
  color: colors.textDim,
})

// Header styles
const $headerRight: ViewStyle = {
  flexDirection: "row",
  gap: 16,
}

const $iconButton: ViewStyle = {
  padding: 4,
}
