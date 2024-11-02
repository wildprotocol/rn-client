import { useCallback, useEffect, useMemo, useState } from "react"
import { Modal, Pressable, TextInput, TextStyle, View, ViewStyle } from "react-native"

import DateTimePicker from "@react-native-community/datetimepicker"
import { CalendarBlank, CaretDown, Clock, X } from "phosphor-react-native"
import Animated, {
  WithTimingConfig,
  interpolate,
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from "react-native-reanimated"

import { Button, Text } from "@/components"
import { IS_ANDROID, IS_IOS, SCREEN_WIDTH } from "@/constants/common.constants"
import { ThemedStyle } from "@/theme"
import { useAppTheme } from "@/utils"

import { REPEAT_INPUT_MAX_LENGTH } from "../constants"
import { useCreatePostContext } from "../context/contextProvider"

const REPEAT_TYPES = ["Don't Repeat", "daily", "weekly", "monthly"]

interface ScheduleModalProps {
  isVisible: boolean
  onClose: () => void
  onSchedule: (date: Date, repeatType: string, repeatSchedule: string) => void
}

export const ScheduleModal = (props: ScheduleModalProps) => {
  const { isVisible, onClose, onSchedule } = props
  const {
    themed,
    theme: { colors, isDark },
  } = useAppTheme()
  const { schedulePostDetails, setSchedulePostDetails } = useCreatePostContext()

  const [selectedDate, setSelectedDate] = useState<Date>(schedulePostDetails.postDate || new Date())
  const [selectedScheduleType, setSelectedScheduleType] = useState<string>(
    schedulePostDetails.repeatType,
  )
  const [repeatSchedule, setRepeatSchedule] = useState<string>(schedulePostDetails.repeatCount)
  const [isDropdownOpen, setIsDropdownOpen] = useState(false)
  const [isDateTimePickerVisible, setIsDateTimePickerVisible] = useState(false)
  const [dateTimePickerMode, setDateTimePickerMode] = useState<"date" | "time">("date")
  const [isAndroidPickerVisible, setIsAndroidPickerVisible] = useState(false)

  const animationConfig = useMemo<WithTimingConfig>(() => ({ duration: 300 }), [])
  const rotationValue = useSharedValue(0)

  const toggleRepeatTypeDropdown = useCallback(() => {
    setIsDropdownOpen((prev) => !prev)
  }, [])

  const handleScheduleTypeSelect = useCallback((type: string) => {
    setSelectedScheduleType(type)
    setIsDropdownOpen(false)
  }, [])

  const memoizedDropdownItems = useMemo(
    () =>
      REPEAT_TYPES.map((type) => (
        <Pressable
          key={type}
          style={themed($dropdownItem)}
          onPress={() => handleScheduleTypeSelect(type)}
        >
          <Text style={$dropdownItemText} text={type} />
        </Pressable>
      )),
    [themed, handleScheduleTypeSelect],
  )

  const dropdownStyle = useAnimatedStyle(() => ({
    maxHeight: withTiming(isDropdownOpen ? 200 : 0, animationConfig),
    opacity: withTiming(isDropdownOpen ? 1 : 0, animationConfig),
    overflow: "hidden",
  }))

  const caretStyle = useAnimatedStyle(() => {
    const rotation = interpolate(rotationValue.value, [0, 1], [0, 180])
    return {
      transform: [{ rotate: `${rotation}deg` }],
    }
  })

  const handleBackdropPress = useCallback(() => {
    onClose()
  }, [onClose])

  const showDateTimePicker = useCallback((mode: "date" | "time") => {
    setDateTimePickerMode(mode)
    if (IS_IOS) {
      setIsDateTimePickerVisible(true)
    } else if (IS_ANDROID) {
      setIsAndroidPickerVisible(true)
    }
  }, [])

  const hideDateTimePicker = useCallback(() => {
    if (IS_IOS) {
      setIsDateTimePickerVisible(false)
    } else if (IS_ANDROID) {
      setIsAndroidPickerVisible(false)
    }
  }, [])

  const handleDateTimeChange = useCallback(
    (event: any, date?: Date) => {
      if (date) {
        const now = new Date()
        if (dateTimePickerMode === "date") {
          if (date.toDateString() === now.toDateString()) {
            date.setHours(now.getHours(), now.getMinutes())
          } else {
            date.setHours(selectedDate.getHours(), selectedDate.getMinutes())
          }
        } else {
          const minTime =
            selectedDate.toDateString() === now.toDateString() ? now : new Date(selectedDate)
          if (date < minTime) {
            date = minTime
          }
        }
        setSelectedDate(date)
      }
      if (IS_ANDROID) {
        hideDateTimePicker()
      }
    },
    [dateTimePickerMode, selectedDate, hideDateTimePicker],
  )

  const handleDateTimeConfirm = useCallback(() => {
    hideDateTimePicker()
  }, [hideDateTimePicker])

  const formatTime = useCallback((date: Date) => {
    return date.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })
  }, [])

  const formatDate = useCallback((date: Date) => {
    return date.toLocaleDateString()
  }, [])

  const handleClear = useCallback(() => {
    const newDate = new Date()
    setSelectedDate(newDate)
    setSelectedScheduleType("Don't Repeat")
    setRepeatSchedule("1")
    setSchedulePostDetails({
      repeatType: "Don't Repeat",
      repeatCount: "1",
      postDate: null,
    })
    setIsDropdownOpen(false)
    setIsDateTimePickerVisible(false)
    setDateTimePickerMode("date")
    onClose()
  }, [onClose, setSchedulePostDetails])

  const handleConfirm = useCallback(() => {
    setSchedulePostDetails({
      repeatType: selectedScheduleType,
      repeatCount: repeatSchedule,
      postDate: selectedDate,
    })
    onSchedule(selectedDate, selectedScheduleType, repeatSchedule)
    onClose()
  }, [
    selectedDate,
    selectedScheduleType,
    repeatSchedule,
    onSchedule,
    onClose,
    setSchedulePostDetails,
  ])

  useEffect(() => {
    rotationValue.value = withTiming(isDropdownOpen ? 1 : 0, animationConfig)
  }, [isDropdownOpen, rotationValue, animationConfig])

  return (
    <Modal visible={isVisible} transparent animationType="fade">
      <Pressable onPress={handleBackdropPress} style={themed($backdrop)}>
        <Pressable onPress={(e) => e.stopPropagation()} style={themed($container)}>
          {/* Header */}
          <View style={themed($header)}>
            <Text preset="subheading" text="Schedule" />
            <Pressable onPress={onClose}>
              <X size={20} color={colors.text} />
            </Pressable>
          </View>

          <Text
            style={$scheduledText}
            size="xxs"
            text={`Will be posted on ${formatDate(selectedDate)} at ${formatTime(selectedDate)}`}
          />

          {/* Date and Time Selection */}
          <View style={themed($dateTimeContainer)}>
            <Pressable style={themed($dateTimeItem)} onPress={() => showDateTimePicker("time")}>
              <Clock size={20} color={colors.text} />
              <Text text={formatTime(selectedDate)} />
            </Pressable>
            <Pressable style={themed($dateTimeItem)} onPress={() => showDateTimePicker("date")}>
              <CalendarBlank size={20} color={colors.text} />
              <Text text={formatDate(selectedDate)} />
            </Pressable>
          </View>

          {/* Repeat Type Dropdown */}
          <View style={themed($repeatTypeContainer)}>
            <View style={themed($dropdownWrapper)}>
              <Pressable style={themed($dropdownContainer)} onPress={toggleRepeatTypeDropdown}>
                <Text style={$dropdownItemText} text={selectedScheduleType} />
                <Animated.View style={caretStyle}>
                  <CaretDown size={16} color={colors.text} />
                </Animated.View>
              </Pressable>
              <Animated.View style={[themed($dropdownList), dropdownStyle]}>
                {memoizedDropdownItems}
              </Animated.View>
            </View>
            {selectedScheduleType !== "Don't Repeat" && (
              <TextInput
                value={repeatSchedule}
                onChangeText={setRepeatSchedule}
                keyboardType="numeric"
                placeholder="1"
                maxLength={REPEAT_INPUT_MAX_LENGTH}
                style={themed($repeatInput)}
              />
            )}
          </View>

          {/* Confirm and Clear Buttons */}
          <View style={$buttonContainer}>
            <Pressable style={themed($clearButton)} onPress={handleClear}>
              <Text text="Clear" />
            </Pressable>
            <Button
              style={themed($confirmButton)}
              text="Confirm"
              preset="outline"
              onPress={handleConfirm}
            />
          </View>

          {/* Date Time Picker Modal for iOS */}
          {IS_IOS && (
            <Modal visible={isDateTimePickerVisible} transparent animationType="fade">
              <View style={themed($dateTimePickerContainer)}>
                <View style={themed($dateTimePickerContent)}>
                  <DateTimePicker
                    value={selectedDate}
                    mode={dateTimePickerMode}
                    is24Hour
                    display="spinner"
                    onChange={handleDateTimeChange}
                    minimumDate={new Date()}
                    textColor={colors.text}
                    themeVariant={isDark ? "dark" : "light"}
                  />
                  <Pressable onPress={handleDateTimeConfirm}>
                    <Text text="Done" style={themed($doneButtonText)} />
                  </Pressable>
                </View>
              </View>
            </Modal>
          )}

          {/* Date Time Picker for Android */}
          {IS_ANDROID && isAndroidPickerVisible && (
            <DateTimePicker
              value={selectedDate}
              mode={dateTimePickerMode}
              is24Hour
              display="default"
              onChange={handleDateTimeChange}
              minimumDate={new Date()}
              textColor={colors.text}
              themeVariant={isDark ? "dark" : "light"}
            />
          )}
        </Pressable>
      </Pressable>
    </Modal>
  )
}

const $backdrop: ThemedStyle<ViewStyle> = ({ colors }) => ({
  flex: 1,
  backgroundColor: colors.overlay,
  justifyContent: "center",
  alignItems: "center",
})

const $container: ThemedStyle<ViewStyle> = ({ colors, spacing }) => ({
  backgroundColor: colors.background,
  borderRadius: 16,
  width: SCREEN_WIDTH * 0.9,
  padding: spacing.md,
})

const $header: ThemedStyle<ViewStyle> = ({ colors }) => ({
  flexDirection: "row",
  justifyContent: "space-between",
  alignItems: "center",
  borderBottomWidth: 1,
  borderBottomColor: colors.border,
  paddingBottom: 10,
  marginBottom: 10,
})

const $scheduledText: TextStyle = {
  marginBottom: 8,
}

const $dateTimeContainer: ThemedStyle<ViewStyle> = ({ spacing }) => ({
  flexDirection: "row",
  justifyContent: "space-between",
  marginBottom: spacing.xs,
  gap: spacing.xs,
})

const $dateTimeItem: ThemedStyle<ViewStyle> = ({ colors, spacing }) => ({
  flexDirection: "row",
  alignItems: "center",
  borderWidth: 1,
  borderColor: colors.border,
  borderRadius: spacing.xxs,
  padding: spacing.xs,
  flex: 1,
  gap: spacing.xxs,
})

const $repeatTypeContainer: ThemedStyle<ViewStyle> = ({ spacing }) => ({
  flexDirection: "row",
  alignItems: "center",
  zIndex: 1,
  marginBottom: spacing.sm,
})

const $dropdownWrapper: ThemedStyle<ViewStyle> = () => ({
  flex: 1,
  position: "relative",
  zIndex: 2,
})

const $dropdownContainer: ThemedStyle<ViewStyle> = ({ colors, spacing }) => ({
  flexDirection: "row",
  alignItems: "center",
  justifyContent: "space-between",
  borderWidth: 1,
  borderColor: colors.border,
  borderRadius: spacing.xxs,
  padding: spacing.xs,
})

const $repeatInput: ThemedStyle<TextStyle> = ({ colors, spacing }) => ({
  color: colors.text,
  borderWidth: 1,
  borderColor: colors.border,
  borderRadius: spacing.xxs,
  padding: spacing.sm,
  marginLeft: spacing.xs,
  width: spacing.xxxl,
})

const $dropdownList: ThemedStyle<ViewStyle> = ({ colors, spacing }) => ({
  position: "absolute",
  top: "100%",
  left: 0,
  right: 0,
  borderWidth: 1,
  borderColor: colors.border,
  borderRadius: spacing.xxs,
  marginTop: spacing.xxs,
  backgroundColor: colors.background,
  zIndex: 3,
})

const $dropdownItem: ThemedStyle<ViewStyle> = ({ colors }) => ({
  padding: 8,
  borderBottomWidth: 1,
  borderBottomColor: colors.border,
})

const $dropdownItemText: TextStyle = {
  textTransform: "capitalize",
}

const $dateTimePickerContainer: ThemedStyle<ViewStyle> = ({ colors }) => ({
  flex: 1,
  justifyContent: "center",
  alignItems: "center",
  backgroundColor: colors.overlay,
})

const $dateTimePickerContent: ThemedStyle<ViewStyle> = ({ colors, spacing }) => ({
  backgroundColor: colors.background,
  padding: spacing.md,
  borderRadius: spacing.sm,
  width: SCREEN_WIDTH * 0.9,
})

const $doneButtonText: ThemedStyle<TextStyle> = ({ colors, spacing }) => ({
  color: colors.primary,
  fontWeight: "bold",
  textAlign: "center",
  padding: spacing.sm,
})

const $buttonContainer: ViewStyle = {
  flexDirection: "row",
  justifyContent: "flex-end",
}

const $clearButton: ThemedStyle<ViewStyle> = () => ({
  padding: 10,
  borderRadius: 5,
})

const $confirmButton: ThemedStyle<ViewStyle> = ({ spacing }) => ({
  paddingHorizontal: spacing.lg,
})
