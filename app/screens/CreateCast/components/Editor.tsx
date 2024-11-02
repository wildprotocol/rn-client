import { useCallback, useRef } from "react"
import { TextInput, TextStyle } from "react-native"

import { ThemedStyle } from "@/theme"
import { useAppTheme } from "@/utils"

export const Editor = () => {
  const { themed } = useAppTheme()

  const textInputRef = useRef<TextInput>(null)

  // const handleFocus = useCallback(() => {
  //   textInputRef.current?.focus()
  // }, [])

  const handleInput = useCallback((text: string) => {
    console.log(text)
  }, [])

  return (
    <TextInput
      style={themed($input)}
      placeholder="Enter your text here"
      ref={textInputRef}
      onChangeText={handleInput}
      multiline
    />
  )
}

const $input: ThemedStyle<TextStyle> = ({ colors, spacing }) => ({
  fontSize: 16,
  color: colors.text,
  padding: spacing.md,
  flex: 1,
})
