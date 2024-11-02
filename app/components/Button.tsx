import { ComponentType } from "react"
import {
  ActivityIndicator,
  Pressable,
  PressableProps,
  PressableStateCallbackType,
  StyleProp,
  TextStyle,
  ViewStyle,
} from "react-native"

import type { ThemedStyle, ThemedStyleArray } from "@/theme"
import { $styles } from "@/theme"
import { useAppTheme } from "@/utils"

import { Text, TextProps } from "./Text"

type Presets = "default" | "secondary" | "outline"

export interface ButtonAccessoryProps {
  style: StyleProp<any>
  pressableState: PressableStateCallbackType
  disabled?: boolean
}

export interface ButtonProps extends PressableProps {
  /** Text which is looked up via i18n. */
  tx?: TextProps["tx"]
  /** The text to display if not using `tx` or nested components. */
  text?: TextProps["text"]
  /** Optional options to pass to i18n. Useful for interpolation as well as explicitly setting locale or translation fallbacks. */
  txOptions?: TextProps["txOptions"]
  /** An optional style override useful for padding & margin. */
  style?: StyleProp<ViewStyle>
  /** An optional style override for the "pressed" state. */
  pressedStyle?: StyleProp<ViewStyle>
  /** An optional style override for the button text. */
  textStyle?: StyleProp<TextStyle>
  /** An optional style override for the button text when in the "pressed" state. */
  pressedTextStyle?: StyleProp<TextStyle>
  /** An optional style override for the button text when in the "disabled" state. */
  disabledTextStyle?: StyleProp<TextStyle>
  /** One of the different types of button presets. */
  preset?: Presets
  /** An optional component to render on the right side of the text. Example: `RightAccessory={(props) => <View {...props} />}` */
  RightAccessory?: ComponentType<ButtonAccessoryProps>
  /** An optional component to render on the left side of the text. Example: `LeftAccessory={(props) => <View {...props} />}` */
  LeftAccessory?: ComponentType<ButtonAccessoryProps>
  /** Children components. */
  children?: React.ReactNode
  /** disabled prop, accessed directly for declarative styling reasons. */
  disabled?: boolean
  /** An optional style override for the disabled state */
  disabledStyle?: StyleProp<ViewStyle>
  /** Whether the button is in a loading state */
  isLoading?: boolean
}

/**
 * A component that allows users to take actions and make choices.
 * Wraps the Text component with a Pressable component.
 * @see [Documentation and Examples]{@link https://docs.infinite.red/ignite-cli/boilerplate/app/components/Button/}
 * @param {ButtonProps} props - The props for the `Button` component.
 * @returns {JSX.Element} The rendered `Button` component.
 * @example
 * <Button
 *   tx="common:ok"
 *   style={styles.button}
 *   textStyle={styles.buttonText}
 *   onPress={handleButtonPress}
 * />
 */
export function Button(props: ButtonProps) {
  const {
    tx,
    text,
    txOptions,
    style: $viewStyleOverride,
    pressedStyle: $pressedViewStyleOverride,
    textStyle: $textStyleOverride,
    pressedTextStyle: $pressedTextStyleOverride,
    disabledTextStyle: $disabledTextStyleOverride,
    children,
    RightAccessory,
    LeftAccessory,
    disabled,
    disabledStyle: $disabledViewStyleOverride,
    isLoading = false,
    ...rest
  } = props

  const { themed } = useAppTheme()

  const preset: Presets = props.preset ?? "default"
  /**
   * @param {PressableStateCallbackType} root0 - The root object containing the pressed state.
   * @param {boolean} root0.pressed - The pressed state.
   * @returns {StyleProp<ViewStyle>} The view style based on the pressed state.
   */
  function $viewStyle({ pressed }: PressableStateCallbackType): StyleProp<ViewStyle> {
    return [
      themed($viewPresets[preset]),
      $viewStyleOverride,
      !!pressed && themed([{ opacity: 0.8 }, $pressedViewStyleOverride]),
      !!disabled && $disabledViewStyleOverride,
    ]
  }
  /**
   * @param {PressableStateCallbackType} root0 - The root object containing the pressed state.
   * @param {boolean} root0.pressed - The pressed state.
   * @returns {StyleProp<TextStyle>} The text style based on the pressed state.
   */
  function $textStyle({ pressed }: PressableStateCallbackType): StyleProp<TextStyle> {
    return [
      themed($textPresets[preset]),
      $textStyleOverride,
      !!pressed && themed($pressedTextStyleOverride),
      !!disabled && $disabledTextStyleOverride,
    ]
  }

  return (
    <Pressable
      style={$viewStyle}
      accessibilityRole="button"
      accessibilityState={{ disabled: !!disabled || isLoading }}
      {...rest}
      disabled={disabled || isLoading}
    >
      {(state) => (
        <>
          {!!LeftAccessory && !isLoading && (
            <LeftAccessory style={$leftAccessoryStyle} pressableState={state} disabled={disabled} />
          )}

          {isLoading ? (
            <ActivityIndicator style={$loader} size="small" />
          ) : (
            <Text tx={tx} text={text} txOptions={txOptions} style={$textStyle(state)}>
              {children}
            </Text>
          )}

          {!!RightAccessory && !isLoading && (
            <RightAccessory
              style={$rightAccessoryStyle}
              pressableState={state}
              disabled={disabled}
            />
          )}
        </>
      )}
    </Pressable>
  )
}

const $baseViewStyle: ThemedStyle<ViewStyle> = ({ spacing }) => ({
  minHeight: 40,
  borderRadius: spacing.lg,
  justifyContent: "center",
  alignItems: "center",
  paddingVertical: spacing.sm,
  paddingHorizontal: spacing.sm,
  overflow: "hidden",
})

const $baseTextStyle: ThemedStyle<TextStyle> = ({ typography }) => ({
  fontSize: 14,
  lineHeight: 18,
  fontFamily: typography.primary.medium,
  textAlign: "center",
  flexShrink: 1,
  flexGrow: 0,
  zIndex: 2,
})

const $rightAccessoryStyle: ThemedStyle<ViewStyle> = ({ spacing }) => ({
  marginStart: spacing.xs,
  zIndex: 1,
})
const $leftAccessoryStyle: ThemedStyle<ViewStyle> = ({ spacing }) => ({
  marginEnd: spacing.xs,
  zIndex: 1,
})

const $viewPresets: Record<Presets, ThemedStyleArray<ViewStyle>> = {
  default: [
    $styles.row,
    $baseViewStyle,
    ({ colors }) => ({
      backgroundColor: colors.primary,
    }),
  ],
  secondary: [$styles.row, $baseViewStyle, ({ colors }) => ({ backgroundColor: colors.secondary })],
  outline: [
    $styles.row,
    $baseViewStyle,
    ({ colors }) => ({
      backgroundColor: colors.transparent,
      borderWidth: 1,
      borderColor: colors.border,
    }),
  ],
}

const $textPresets: Record<Presets, ThemedStyleArray<TextStyle>> = {
  default: [$baseTextStyle],
  secondary: [$baseTextStyle],
  outline: [$baseTextStyle],
  // secondary: [$baseTextStyle, ({ colors }) => ({ color: colors.onSecondary })],
}

// NOTE: Can use this if we want to change anything other than opacity for the pressed state
// const $pressedViewPresets: Record<Presets, ThemedStyle<ViewStyle>> = {
//   default: ({ colors }) => ({ backgroundColor: colors.palette.neutral200 }),
// };

// const $pressedTextPresets: Record<Presets, ThemedStyle<ViewStyle>> = {
//   default: () => ({ opacity: 0.9 }),
// };

const $loader: ViewStyle = {
  height: 12,
  width: 12,
}
