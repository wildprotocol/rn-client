import { FC } from "react"
import { ViewStyle } from "react-native"

import { useNavigation } from "@react-navigation/native"

import { Header, Screen } from "@/components"
import { AppStackScreenProps } from "@/navigators"

interface DraftsScreenProps extends AppStackScreenProps<"Drafts"> {}

export const DraftsScreen: FC<DraftsScreenProps> = function DraftsScreen() {
  const navigation = useNavigation()
  return (
    <Screen style={$root} preset="auto">
      <Header leftIcon="caretLeft" onLeftPress={() => navigation.goBack()} title="Drafts" />
    </Screen>
  )
}

const $root: ViewStyle = {
  flex: 1,
}
