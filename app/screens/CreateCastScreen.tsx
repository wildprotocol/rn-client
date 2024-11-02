import { FC } from "react"
import { Pressable, ViewStyle } from "react-native"

import { useNavigation } from "@react-navigation/native"
import { X } from "phosphor-react-native"

import { Screen, Text } from "@/components"
import { AppStackScreenProps } from "@/navigators"
import { useAppTheme } from "@/utils"

// import { useNavigation } from "@react-navigation/native"

interface CreateCastScreenProps extends AppStackScreenProps<"CreateCast"> {}

export const CreateCastScreen: FC<CreateCastScreenProps> = function CreateCastScreen() {
  // Pull in navigation via hook
  const navigation = useNavigation()
  const {
    theme: { colors },
  } = useAppTheme()
  return (
    <Screen safeAreaEdges={["top", "bottom"]} style={$root} preset="scroll">
      <Pressable onPress={() => navigation.goBack()}>
        <X size={20} color={colors.text} />
      </Pressable>
      <Text text="createCast" />
    </Screen>
  )
}

const $root: ViewStyle = {
  flex: 1,
}
