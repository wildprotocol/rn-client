import { ReactNode, forwardRef, useCallback, useMemo } from "react"

import {
  BottomSheetBackdrop,
  BottomSheetBackdropProps,
  BottomSheetModal,
  BottomSheetModalProps,
  BottomSheetView,
} from "@gorhom/bottom-sheet"

export type Ref = BottomSheetModal

interface CustomBottomSheetProps extends BottomSheetModalProps {
  children: ReactNode
}

export const CustomBottomSheet = forwardRef<Ref, CustomBottomSheetProps>((props, ref) => {
  const { children } = props

  const snapPoints = useMemo(() => ["50%", "75%"], [])

  const renderBackdrop = useCallback(
    (props: BottomSheetBackdropProps) => <BottomSheetBackdrop {...props} />,
    [],
  )

  return (
    <BottomSheetModal
      ref={ref}
      snapPoints={snapPoints}
      backdropComponent={renderBackdrop}
      {...props}
    >
      <BottomSheetView>{children}</BottomSheetView>
    </BottomSheetModal>
  )
})

CustomBottomSheet.displayName = "CustomBottomSheet"
