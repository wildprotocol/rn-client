import { FC } from "react"
import { ViewStyle } from "react-native"

import { Screen, Text } from "@/components"
import { TabScreenProps } from "@/navigators"

interface TippingArenaScreenProps extends TabScreenProps<"TippingArena"> {}

export const TippingArenaScreen: FC<TippingArenaScreenProps> = function TippingArenaScreen() {
  return (
    <Screen style={$root} preset="scroll">
      <Text text="tippingArena" />
    </Screen>
  )
}

const $root: ViewStyle = {
  flex: 1,
}
