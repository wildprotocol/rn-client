import { Pressable, StyleProp, View, ViewStyle } from "react-native"

import FastImage, { ImageStyle } from "@d11/react-native-fast-image"
import { Star } from "phosphor-react-native"

import { $styles, ThemedStyle } from "@/theme"
import { useAppTheme } from "@/utils"

import { Text } from "../Text"

interface SidebarItemProps {
  /** Additional styles for the container */
  containerStyle?: StyleProp<ViewStyle>
  /** The name of the item */
  name: string
  /** The URI of the item */
  uri?: string
  /** The icon of the item */
  icon?: React.ReactNode
  /** The callback function for the item press */
  onPress: () => void
  /** The callback function for the favourite press */
  onFavouritePress?: () => void
  /** Whether the item is favourite */
  isFavourite: boolean
}

export const SidebarItem: React.FC<SidebarItemProps> = ({
  containerStyle,
  name,
  uri,
  onPress,
  icon,
  onFavouritePress,
  isFavourite,
}: SidebarItemProps) => {
  const {
    themed,
    theme: { colors },
  } = useAppTheme()

  return (
    <Pressable style={[$styles.rowBetween, containerStyle]} onPress={onPress}>
      <View style={themed($itemContainer)}>
        {uri ? (
          <FastImage
            source={{ uri }}
            style={themed($icon)}
            defaultSource={require("../../../assets/images/global.png")}
            resizeMode={FastImage.resizeMode.contain}
          />
        ) : (
          icon && icon
        )}
        <Text text={name} />
      </View>
      {onFavouritePress && (
        <Pressable onPress={onFavouritePress}>
          <Star
            color={colors.text}
            size={20}
            weight={isFavourite ? "fill" : "regular"}
            duotoneColor="red"
          />
        </Pressable>
      )}
    </Pressable>
  )
}

const $itemContainer: ThemedStyle<ViewStyle> = ({ spacing }) => ({
  flexDirection: "row",
  alignItems: "center",
  gap: spacing.xs,
})

const $icon: ThemedStyle<ImageStyle> = () => ({
  height: 20,
  width: 20,
  borderRadius: 10,
})
