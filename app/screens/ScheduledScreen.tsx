import { FC } from "react"
import { ViewStyle } from "react-native"

import { useNavigation } from "@react-navigation/native"

import { Header, Screen } from "@/components"
import { AppStackScreenProps } from "@/navigators"

// import { useNavigation } from "@react-navigation/native"

interface ScheduledScreenProps extends AppStackScreenProps<"Scheduled"> {}

export const ScheduledScreen: FC<ScheduledScreenProps> = function ScheduledScreen() {
  // Pull in navigation via hook
  const navigation = useNavigation()
  return (
    <Screen style={$root} preset="auto">
      <Header leftIcon="caretLeft" onLeftPress={() => navigation.goBack()} title="Scheduled" />
    </Screen>
  )
}

const $root: ViewStyle = {
  flex: 1,
}
