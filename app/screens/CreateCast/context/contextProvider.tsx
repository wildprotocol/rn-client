import { createContext, useContext, useState } from "react"

import { useUrlPreview } from "@/hooks"

import { CHARACTER_LIMIT } from "../constants"
import { useMediaPicker } from "../hooks"

export interface SchedulePostDetails {
  repeatType: string
  repeatCount: string
  postDate: Date | null
}

const CreatePostContext = createContext<{
  scheduledPostDate: Date | null
  setScheduledPostDate: React.Dispatch<React.SetStateAction<Date | null>>
  // PREVEIOUS
  showGifModal: boolean
  media: string[]
  removeMedia: (index: number) => void
  allowedMedia: number
  pickMedia: (type: "image" | "gif", item?: any) => void
  postText: string
  setPostText: (text: string) => void
  debouncedGetDataFromUrls: (urls: string[]) => void
  urlPreview: any[]
  frames: any[]
  isLoadingPreview: boolean
  channels: any[]
  setChannels: React.Dispatch<React.SetStateAction<any[]>>
  selectedChannel: any
  setSelectedChannel: React.Dispatch<React.SetStateAction<any>>
  currentQuotedPost: any
  setCurrentQuotedPost: React.Dispatch<React.SetStateAction<any>>
  isOverLimit: boolean
  charactersOver: number
  setShowGifModal: React.Dispatch<React.SetStateAction<boolean>>
  isSubmitting: boolean
  setIsSubmitting: React.Dispatch<React.SetStateAction<boolean>>
  currentSelectedDraft: any
  setCurrentSelectedDraft: React.Dispatch<React.SetStateAction<any>>
  isSignerModalVisible: boolean
  setIsSignerModalVisible: React.Dispatch<React.SetStateAction<boolean>>
  createdCastId: { hash: string; fid: number } | null
  setMedia: React.Dispatch<React.SetStateAction<string[]>>
  setCreatedCastId: React.Dispatch<React.SetStateAction<{ hash: string; fid: number } | null>>
  routeParams: {
    parentCast: any
    channelId: string
    quotedCast: any
    screenContext: string
  }
  schedulePostDetails: SchedulePostDetails
  setSchedulePostDetails: React.Dispatch<React.SetStateAction<SchedulePostDetails>>
}>({
  scheduledPostDate: null,
  setScheduledPostDate: () => {},
  showGifModal: false,
  media: [],
  removeMedia: () => {},
  allowedMedia: 0,
  pickMedia: () => {},
  postText: "",
  setPostText: () => {},
  debouncedGetDataFromUrls: () => {},
  urlPreview: [],
  frames: [],
  isLoadingPreview: false,
  channels: [],
  setChannels: () => {},
  selectedChannel: null,
  setSelectedChannel: () => {},
  currentQuotedPost: null,
  setCurrentQuotedPost: () => {},
  isOverLimit: false,
  charactersOver: 0,
  setShowGifModal: () => {},
  isSubmitting: false,
  setIsSubmitting: () => {},
  currentSelectedDraft: null,
  setCurrentSelectedDraft: () => {},
  isSignerModalVisible: false,
  setIsSignerModalVisible: () => {},
  createdCastId: null,
  setCreatedCastId: () => {},
  setMedia: () => {},
  routeParams: {
    parentCast: null,
    channelId: "",
    quotedCast: null,
    screenContext: "",
  },
  schedulePostDetails: {
    repeatType: "Don't Repeat",
    repeatCount: "1",
    postDate: null,
  },
  setSchedulePostDetails: () => {},
})

export const CreatePostProvider = ({
  children,
  routeParams,
}: {
  children: React.ReactNode
  routeParams: {
    parentPost: any
    channelId: string
    quotedPost: any
    screenContext: string
  }
}) => {
  // TODO: Add type where needed and remove "any"
  const [postText, setPostText] = useState("")
  const [showGifModal, setShowGifModal] = useState(false)
  const [channels, setChannels] = useState<any[]>([])
  const [currentQuotedPost, setCurrentQuotedPost] = useState<any>(null)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [currentSelectedDraft, setCurrentSelectedDraft] = useState<any>(null)
  const [isSignerModalVisible, setIsSignerModalVisible] = useState(false)
  const [createdCastId, setCreatedCastId] = useState<{ hash: string; fid: number } | null>(null)
  // _++++++++++_+============= NEW AFTER THIS ================
  const [scheduledPostDate, setScheduledPostDate] = useState<Date | null>(null)
  const [schedulePostDetails, setSchedulePostDetails] = useState<SchedulePostDetails>({
    repeatType: "Don't Repeat",
    repeatCount: "1",
    postDate: null,
  })
  const [selectedChannel, setSelectedChannel] = useState<any>(null)

  const charactersOver = postText.length - CHARACTER_LIMIT
  const isOverLimit = charactersOver > 0
  const allowedMedia = currentQuotedPost ? 1 : 2

  const { media, pickMedia, removeMedia, setMedia } = useMediaPicker({
    allowedMedia,
    framesLength: 0,
  })
  const { urlPreview, frames, isLoadingPreview, debouncedGetDataFromUrls } =
    useUrlPreview(allowedMedia)

  const contextValue = {
    showGifModal,
    media,
    removeMedia,
    allowedMedia,
    pickMedia,
    debouncedGetDataFromUrls: (urls: string[]) => debouncedGetDataFromUrls(urls, media.length),
    postText,
    setPostText,
    urlPreview,
    frames,
    isLoadingPreview,
    channels,
    setChannels,
    selectedChannel,
    setSelectedChannel,
    currentQuotedPost,
    setCurrentQuotedPost,
    isOverLimit,
    charactersOver,
    setShowGifModal,
    isSubmitting,
    setIsSubmitting,
    currentSelectedDraft,
    setCurrentSelectedDraft,
    isSignerModalVisible,
    setIsSignerModalVisible,
    createdCastId,
    setCreatedCastId,
    routeParams,
    setMedia,
    scheduledPostDate,
    setScheduledPostDate,
    schedulePostDetails,
    setSchedulePostDetails,
  }

  return <CreatePostContext.Provider value={contextValue}>{children}</CreatePostContext.Provider>
}

export const useCreatePostContext = () => {
  const context = useContext(CreatePostContext)
  if (!context) {
    throw new Error("useCreatePostContext must be used within a CreatePostProvider")
  }
  return context
}
