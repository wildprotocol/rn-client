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
  setTitle: (title: string) => void
  setBody: (body: string) => void
  setSelectedSubCategory: (subCategory: SubCategory | null) => void
  setUrlPreviewImage: (url: string) => void
  reset: () => void
}

export const createCreatePostSlice: StateCreator<RootStore, [], [], CreatePostStore> = (set) => ({
  title: "",
  body: "",
  selectedSubCategory: null,
  urlPreviewImage: "",

  setTitle: (title) => set({ title }),
  setBody: (body) => set({ body }),
  setSelectedSubCategory: (subCategory) => set({ selectedSubCategory: subCategory }),
  setUrlPreviewImage: (url) => set({ urlPreviewImage: url }),
  reset: () =>
    set({
      title: "",
      body: "",
      selectedSubCategory: null,
      urlPreviewImage: "",
    }),
})

export const createPostStoreSelector = (state: RootStore) => ({
  title: state.title,
  body: state.body,
  selectedSubCategory: state.selectedSubCategory,
  urlPreviewImage: state.urlPreviewImage,
  setTitle: state.setTitle,
  setBody: state.setBody,
  setSelectedSubCategory: state.setSelectedSubCategory,
  setUrlPreviewImage: state.setUrlPreviewImage,
  reset: state.reset,
})
