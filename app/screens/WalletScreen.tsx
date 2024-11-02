import { FC } from "react"
import { ViewStyle } from "react-native"

import { Screen, Text } from "@/components"
import { TabScreenProps } from "@/navigators"

interface WalletScreenProps extends TabScreenProps<"Wallet"> {}

export const WalletScreen: FC<WalletScreenProps> = function WalletScreen() {
  return (
    <Screen style={$root} preset="scroll">
      <Text text="wallet" />
    </Screen>
  )
}

const $root: ViewStyle = {
  flex: 1,
}
