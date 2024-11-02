import { FC } from "react"
import { ViewStyle } from "react-native"

import { Screen, Text } from "@/components"
import { TabScreenProps } from "@/navigators"

interface ChatScreenProps extends TabScreenProps<"Chat"> {}

export const ChatScreen: FC<ChatScreenProps> = function ChatScreen() {
  return (
    <Screen style={$root} preset="scroll">
      <Text text="chat" />
    </Screen>
  )
}

const $root: ViewStyle = {
  flex: 1,
}
