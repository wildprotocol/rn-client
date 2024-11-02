import { FC } from "react"
import { ViewStyle } from "react-native"

import { NativeStackScreenProps } from "@react-navigation/native-stack"

import { Header, Screen } from "@/components"
import { HomeTabParamList } from "@/navigators"

type SubCategoryScreenProps = NativeStackScreenProps<HomeTabParamList, "SubCategory">

export const SubCategoryScreen: FC<SubCategoryScreenProps> = function SubCategoryScreen({
  navigation,
  route,
}: SubCategoryScreenProps) {
  const { title } = route?.params
  return (
    <Screen style={$root} preset="auto">
      <Header leftIcon="caretLeft" onLeftPress={() => navigation.goBack()} title={title} />
    </Screen>
  )
}

const $root: ViewStyle = {
  flex: 1,
}
