import { useCallback, useState } from "react"
import { Pressable, TextStyle, View, ViewStyle } from "react-native"

import { useNavigation } from "@react-navigation/native"
import { Clock, X } from "phosphor-react-native"

import { Button, Text } from "@/components"
import { HIT_SLOP_5 } from "@/constants"
import { translate } from "@/i18n"
import { ThemedStyle } from "@/theme"
import { useAppTheme } from "@/utils"

import { useCreatePostContext } from "../context/contextProvider"
import { ScheduleModal } from "./ScheduleModal"

type PostType = "schedule" | "editSchedule" | "post"

interface CreatePostHeaderProps {
  /** Text for the button */
  buttonText: string
  /** Callback for the create post button press for a post */
  onCreatePost: (type: PostType) => void
  /** Checks if the submit button is disabled */
  isSubmitDisabled: boolean
  /** Checks if the post is a parent post */
  isParentPost: boolean
}

export const Header = (props: CreatePostHeaderProps) => {
  const { buttonText = "", isSubmitDisabled, isParentPost, onCreatePost } = props
  const navigation = useNavigation()

  const {
    themed,
    theme: { colors },
  } = useAppTheme()
  // const { schedulePostDetails } = useCreatePostContext()
  // const { postDate } = schedulePostDetails
  // const scheduledDate = postDate?.toLocaleDateString("en-US", {
  //   weekday: "short",
  //   year: "numeric",
  //   month: "short",
  //   day: "numeric",
  // })
  // const scheduledTime = postDate?.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })

  const [isScheduleModalVisible, setIsScheduleModalVisible] = useState(false)

  const toggleScheduleModal = useCallback(() => {
    setIsScheduleModalVisible((prev) => !prev)
  }, [])

  const handleBackPress = () => {
    // TODO: Add other logic here
    navigation.goBack()
  }

  return (
    <>
      <View style={themed($root)}>
        <Pressable onPress={handleBackPress}>
          <X size={24} color={colors.text} />
        </Pressable>
        <View style={themed($subContainer)}>
          <Pressable hitSlop={HIT_SLOP_5} onPress={toggleScheduleModal}>
            <Clock size={32} color={colors.primary} />
          </Pressable>
          <Button textStyle={themed($buttonText)} text={buttonText} disabled={isSubmitDisabled} />
        </View>
      </View>
      <ScheduleModal
        isVisible={isScheduleModalVisible}
        onClose={toggleScheduleModal}
        onSchedule={() => {}}
      />
      {/* {postDate ? (
        <Text
          text={translate("createCast:willBeSentOnAt", {
            scheduledDate,
            scheduledTime,
          })}
          size="xxs"
          style={themed($scheduledText)}
        />
      ) : null} */}
    </>
  )
}

const $root: ThemedStyle<ViewStyle> = ({ colors, spacing }) => ({
  alignItems: "center",
  flexDirection: "row",
  justifyContent: "space-between",
  paddingHorizontal: spacing.md,
  paddingVertical: spacing.sm,
  borderBottomWidth: 1,
  borderBottomColor: colors.border,
})

const $subContainer: ThemedStyle<ViewStyle> = ({ spacing }) => ({
  alignItems: "center",
  flexDirection: "row",
  gap: spacing.sm,
})

const $buttonText: ThemedStyle<TextStyle> = ({ colors, spacing }) => ({
  color: colors.secondary,
  paddingHorizontal: spacing.md,
})
