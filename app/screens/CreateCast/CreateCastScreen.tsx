import { useMemo } from "react"
import { ViewStyle } from "react-native"

import { useRoute } from "@react-navigation/native"

import { Screen } from "@/components"

import { Editor, Footer, Header } from "./components"
import { CreatePostProvider, useCreatePostContext } from "./context/contextProvider"

export const CreateCastScreen = () => {
  const route = useRoute()
  // @ts-ignore TODO - Add types in the navigation route params
  const { parentPost, channelId, quotedPost, screenContext } = route.params || {}

  // const { currentQuotedPost, frames, isOverLimit, isSubmitting, media, postText } =
  //   useCreatePostContext()

  // const isContentEmpty = postText.trim().length === 0 && media.length === 0 && frames.length === 0
  // const isSubmitDisabled = isOverLimit || isSubmitting || isContentEmpty
  // const isParentPost = !!parentPost
  // const {} = useCreatePost();

  // const postButtonText = useMemo(() => {
  //   if (isParentPost) return "Reply"
  //   if (currentQuotedPost) return "Quote"
  //   // if (isScheduleOptionsOpen) return "Schedule";
  //   return "Cast"
  // }, [isParentPost, currentQuotedPost /* , isScheduleOptionsOpen */])

  return (
    // <CreatePostProvider routeParams={{ parentPost, channelId, quotedPost, screenContext }}>
    <Screen safeAreaEdges={["top", "bottom"]} contentContainerStyle={$root}>
      <Header
        buttonText={"Cast"}
        isParentPost={false}
        isSubmitDisabled={true}
        onCreatePost={() => {}}
      />
      <Editor />
      <Footer />
    </Screen>
    // </CreatePostProvider>
  )
}

const $root: ViewStyle = {
  flex: 1,
}
