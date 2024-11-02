import { FC } from "react"
import { ViewStyle } from "react-native"

import { Screen, Text } from "@/components"
import { TabScreenProps } from "@/navigators"

// import { useNavigation } from "@react-navigation/native"

interface NotificationsScreenProps extends TabScreenProps<"Notifications"> {}

export const NotificationsScreen: FC<NotificationsScreenProps> = function NotificationsScreen() {
  // Pull in navigation via hook
  // const navigation = useNavigation()
  return (
    <Screen style={$root} preset="scroll">
      <Text text="notifications" />
    </Screen>
  )
}

const $root: ViewStyle = {
  flex: 1,
}
