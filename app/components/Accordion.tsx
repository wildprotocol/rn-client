import { FC, ReactNode, memo, useCallback, useState } from "react"
import { LayoutAnimation, Pressable, StyleProp, TextStyle, View, ViewStyle } from "react-native"

import { CaretDown } from "phosphor-react-native"
import Animated, { useAnimatedStyle, useSharedValue, withTiming } from "react-native-reanimated"

import { ThemedStyle } from "@/theme"
import { useAppTheme } from "@/utils/useAppTheme"

import { Text } from "./Text"

interface AccordionProps {
  /** The content of the accordion */
  children: ReactNode
  /** The style of the root container */
  containerStyle?: StyleProp<ViewStyle>
  /** Whether the accordion is expanded */
  expanded?: boolean
  /** The title of the accordion */
  title: string
}

export const Accordion: FC<AccordionProps> = memo(
  ({ children, title, containerStyle, expanded = false }: AccordionProps) => {
    const [isExpanded, setIsExpanded] = useState(expanded)
    const rotation = useSharedValue(0)
    const {
      themed,
      theme: { colors },
    } = useAppTheme()

    const arrowStyle = useAnimatedStyle(() => {
      return {
        transform: [{ rotate: `${rotation.value * 180}deg` }],
      }
    })

    const toggleAccordion = useCallback(() => {
      rotation.value = withTiming(isExpanded ? 0 : 1, { duration: 300 })
      LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut)
      setIsExpanded((prev) => !prev)
    }, [isExpanded, rotation])

    return (
      <View style={[themed($container), containerStyle]}>
        <Pressable onPress={toggleAccordion} style={themed($titleContainer)}>
          <Text text={title} style={themed($title)} />
          <Animated.View style={arrowStyle}>
            <CaretDown color={colors.text} size={16} />
          </Animated.View>
        </Pressable>
        {isExpanded && children}
      </View>
    )
  },
)

Accordion.displayName = "Accordion"

const $container: ThemedStyle<ViewStyle> = ({ spacing }) => ({
  flex: 1,
  marginBottom: spacing.sm,
})

const $titleContainer: ThemedStyle<ViewStyle> = ({ colors }) => ({
  flexDirection: "row",
  justifyContent: "space-between",
  alignItems: "center",
  backgroundColor: colors.background,
})

const $title: ThemedStyle<TextStyle> = ({ colors, typography }) => ({
  color: colors.text,
  fontFamily: typography.primary.medium,
})
