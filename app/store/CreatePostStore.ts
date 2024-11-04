import { ImagePickerAsset } from "expo-image-picker"
import { StateCreator } from "zustand"

import { RootStore } from "./RootStore"

interface SubCategory {
  id: string
  name: string
  imageUrl: string
}

export interface CreatePostStore {
  title: string
  body: string
  selectedSubCategory: SubCategory | null
  urlPreviewImage: string
  selectedImages: ImagePickerAsset[]
  selectedVideos: ImagePickerAsset[]
  setTitle: (title: string) => void
  setBody: (body: string) => void
  setSelectedSubCategory: (subCategory: SubCategory | null) => void
  setUrlPreviewImage: (url: string) => void
  setSelectedImages: (images: ImagePickerAsset[]) => void
  setSelectedVideos: (videos: ImagePickerAsset[]) => void
  reset: () => void
}

export const createCreatePostSlice: StateCreator<RootStore, [], [], CreatePostStore> = (set) => ({
  title: "",
  body: "",
  selectedSubCategory: null,
  urlPreviewImage: "",
  selectedImages: [],
  selectedVideos: [],

  setTitle: (title) => set({ title }),
  setBody: (body) => set({ body }),
  setSelectedSubCategory: (subCategory) => set({ selectedSubCategory: subCategory }),
  setUrlPreviewImage: (url) => set({ urlPreviewImage: url }),
  setSelectedImages: (images) => set({ selectedImages: images }),
  setSelectedVideos: (videos) => set({ selectedVideos: videos }),
  reset: () =>
    set({
      title: "",
      body: "",
      selectedSubCategory: null,
      urlPreviewImage: "",
      selectedImages: [],
      selectedVideos: [],
    }),
})

export const createPostStoreSelector = (state: RootStore) => ({
  title: state.title,
  body: state.body,
  selectedSubCategory: state.selectedSubCategory,
  urlPreviewImage: state.urlPreviewImage,
  selectedImages: state.selectedImages,
  selectedVideos: state.selectedVideos,
  setTitle: state.setTitle,
  setBody: state.setBody,
  setSelectedSubCategory: state.setSelectedSubCategory,
  setUrlPreviewImage: state.setUrlPreviewImage,
  setSelectedImages: state.setSelectedImages,
  setSelectedVideos: state.setSelectedVideos,
  reset: state.reset,
})
