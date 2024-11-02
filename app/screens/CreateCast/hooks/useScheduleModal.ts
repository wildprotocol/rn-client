import { useCallback, useEffect, useMemo, useState } from "react"

import { WithTimingConfig, useSharedValue, withTiming } from "react-native-reanimated"

import { useCreatePostContext } from "../context/contextProvider"

const REPEAT_TYPES = ["Don't Repeat", "daily", "weekly", "monthly"]

export const useScheduleModal = (
  onClose: () => void,
  onSchedule: (date: Date, repeatType: string, repeatSchedule: string) => void,
) => {
  const [selectedScheduleType, setSelectedScheduleType] = useState<string>("Don't Repeat")
  const [repeatSchedule, setRepeatSchedule] = useState<string>("1")
  const [isDropdownOpen, setIsDropdownOpen] = useState(false)
  const [isDateTimePickerVisible, setIsDateTimePickerVisible] = useState(false)
  const [dateTimePickerMode, setDateTimePickerMode] = useState<"date" | "time">("date")

  const { scheduledPostDate, setScheduledPostDate } = useCreatePostContext()

  const animationConfig: WithTimingConfig = { duration: 300 }
  const rotationValue = useSharedValue(0)

  const toggleRepeatTypeDropdown = useCallback(() => {
    setIsDropdownOpen((prev) => !prev)
  }, [])

  const handleScheduleTypeSelect = useCallback((type: string) => {
    setSelectedScheduleType(type)
    setIsDropdownOpen(false)
  }, [])

  const showDateTimePicker = useCallback((mode: "date" | "time") => {
    setDateTimePickerMode(mode)
    setIsDateTimePickerVisible(true)
  }, [])

  const hideDateTimePicker = useCallback(() => {
    setIsDateTimePickerVisible(false)
  }, [])

  const handleDateTimeChange = useCallback(
    (event: any, date?: Date) => {
      if (date) {
        const now = new Date()
        if (dateTimePickerMode === "date") {
          if (date.toDateString() === now.toDateString()) {
            date.setHours(now.getHours(), now.getMinutes())
          } else {
            date.setHours(scheduledPostDate!.getHours(), scheduledPostDate!.getMinutes())
          }
        } else {
          const minTime =
            scheduledPostDate!.toDateString() === now.toDateString()
              ? now
              : new Date(scheduledPostDate!)
          if (date < minTime) {
            date = minTime
          }
        }
        setScheduledPostDate(date)
      }
    },
    [dateTimePickerMode, scheduledPostDate, setScheduledPostDate],
  )

  const handleDateTimeConfirm = useCallback(() => {
    hideDateTimePicker()
  }, [hideDateTimePicker])

  const handleClear = useCallback(() => {
    setScheduledPostDate(new Date())
    setSelectedScheduleType("Don't Repeat")
    setRepeatSchedule("1")
    setIsDropdownOpen(false)
    setIsDateTimePickerVisible(false)
    setDateTimePickerMode("date")
    onClose()
  }, [onClose, setScheduledPostDate])

  const handleConfirm = useCallback(() => {
    onSchedule(scheduledPostDate!, selectedScheduleType, repeatSchedule)
    onClose()
  }, [scheduledPostDate, selectedScheduleType, repeatSchedule, onSchedule, onClose])

  useEffect(() => {
    rotationValue.value = withTiming(isDropdownOpen ? 1 : 0, animationConfig)
  }, [isDropdownOpen, rotationValue])

  const memoizedDropdownItems = useMemo(
    () =>
      REPEAT_TYPES.map((type) => ({
        key: type,
        onPress: () => handleScheduleTypeSelect(type),
        text: type,
      })),
    [handleScheduleTypeSelect],
  )

  return {
    selectedScheduleType,
    repeatSchedule,
    setRepeatSchedule,
    isDropdownOpen,
    isDateTimePickerVisible,
    dateTimePickerMode,
    scheduledPostDate,
    rotationValue,
    toggleRepeatTypeDropdown,
    showDateTimePicker,
    hideDateTimePicker,
    handleDateTimeChange,
    handleDateTimeConfirm,
    handleClear,
    handleConfirm,
    memoizedDropdownItems,
  }
}
