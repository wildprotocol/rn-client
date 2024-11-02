import { FC } from "react"
import { ViewStyle } from "react-native"

import { useNavigation } from "@react-navigation/native"

import { GifPicker, Header, Screen } from "@/components"
import { AppStackScreenProps } from "@/navigators"

// import { useNavigation } from "@react-navigation/native"

interface GifScreenProps extends AppStackScreenProps<"GifPicker"> {}

export const GifScreen: FC<GifScreenProps> = function GifScreen() {
  const navigation = useNavigation()

  const handleBackPress = () => {
    navigation.goBack()
  }

  return (
    <Screen contentContainerStyle={$root}>
      <Header leftIcon="back" onLeftPress={handleBackPress} />
      <GifPicker onSelect={() => {}} />
    </Screen>
  )
}

const $root: ViewStyle = {
  flex: 1,
}
