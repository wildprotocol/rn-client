import { Modal, TextStyle, View, ViewStyle } from "react-native"

import { ThemedStyle } from "@/theme"
import { useAppTheme } from "@/utils"

import { Button } from "./Button"
import { Text } from "./Text"

interface ConfirmationModalProps {
  /** Text for the cancel button */
  cancelText?: string
  /** Text for the confirm button */
  confirmText?: string
  /** Message to display in the modal */
  message: string
  /** Callback function for the cancel button */
  onCancel: () => void
  /** Callback function for the confirm button */
  onConfirm: () => void
  /** Title of the modal */
  title: string
  /** Whether the modal is visible */
  visible: boolean
}

/**
 * A component that displays a modal dialog for confirming user actions.
 * Wraps Modal and Pressable components with customizable text and callbacks.
 * @param {ConfirmationModalProps} props - The props for the `ConfirmationModal` component.
 * @returns {JSX.Element} The rendered `ConfirmationModal` component.
 * @example
 * <ConfirmationModal
 *   title="Delete Post"
 *   message="Are you sure you want to delete this post?"
 *   confirmText="Delete"
 *   cancelText="Cancel"
 *   onConfirm={handleDelete}
 *   onCancel={handleCancel}
 *   visible={showModal}
 * />
 */
export function ConfirmationModal({
  cancelText = "Cancel",
  confirmText = "Confirm",
  message,
  onCancel,
  onConfirm,
  title,
  visible,
}: ConfirmationModalProps) {
  const { themed } = useAppTheme()
  const {
    theme: { colors },
  } = useAppTheme()

  return (
    <Modal visible={visible} transparent animationType="fade">
      <View style={themed($overlay)}>
        <View style={themed($content)}>
          <Text text={title} style={themed($title)} />
          <Text text={message} style={themed($message)} />
          <View style={themed($buttonContainer)}>
            <Button
              text={cancelText}
              onPress={onCancel}
              style={themed($cancelButton)}
              preset="outline"
            />
            <Button
              text={confirmText}
              onPress={onConfirm}
              style={themed($confirmButton)}
              textStyle={{ color: colors.error }}
              preset="outline"
            />
          </View>
        </View>
      </View>
    </Modal>
  )
}

const $overlay: ThemedStyle<ViewStyle> = ({ colors }) => ({
  flex: 1,
  backgroundColor: colors.overlay,
  justifyContent: "center",
  alignItems: "center",
})

const $content: ThemedStyle<ViewStyle> = ({ colors, spacing }) => ({
  backgroundColor: colors.background,
  borderRadius: 12,
  padding: spacing.md,
  width: "80%",
  maxWidth: 400,
})

const $title: ThemedStyle<TextStyle> = ({ spacing, typography }) => ({
  marginBottom: spacing.sm,
  textAlign: "center",
  fontSize: 20,
  fontFamily: typography.primary.medium,
})

const $message: ThemedStyle<TextStyle> = () => ({
  textAlign: "center",
})

const $buttonContainer: ThemedStyle<ViewStyle> = ({ spacing }) => ({
  flexDirection: "row",
  justifyContent: "space-between",
  marginTop: spacing.md,
})

const $cancelButton: ThemedStyle<ViewStyle> = ({ spacing }) => ({
  flex: 1,
  padding: spacing.sm,
  alignItems: "center",
  marginRight: spacing.xs,
})

const $confirmButton: ThemedStyle<ViewStyle> = ({ spacing }) => ({
  flex: 1,
  padding: spacing.sm,
  alignItems: "center",
  marginLeft: spacing.xs,
})
