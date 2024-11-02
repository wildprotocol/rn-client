import { FC } from "react"
import { ViewStyle } from "react-native"

import { Screen, Text } from "@/components"
import { TabScreenProps } from "@/navigators"

// import { useNavigation } from "@react-navigation/native"

interface PointsScreenProps extends TabScreenProps<"Points"> {}

export const PointsScreen: FC<PointsScreenProps> = function PointsScreen() {
  // Pull in navigation via hook
  // const navigation = useNavigation()
  return (
    <Screen style={$root} preset="scroll">
      <Text text="points" />
    </Screen>
  )
}

const $root: ViewStyle = {
  flex: 1,
}
