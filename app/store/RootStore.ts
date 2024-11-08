import { create } from "zustand"
import { createJSONStorage, persist } from "zustand/middleware"
import { useShallow } from "zustand/react/shallow"

import { storage } from "../utils/storage/storage"
import {
  AuthenticationStore,
  authenticationStoreSelector,
  createAuthenticationSlice,
} from "./AuthenticationStore"
import { CreatePostStore, createCreatePostSlice, createPostStoreSelector } from "./CreatePostStore"

export interface RootStore extends AuthenticationStore, CreatePostStore {
  _hasHydrated: boolean
  setHasHydrated: (state: boolean) => void
}

// Create a storage object using the existing MMKV instance
const zustandStorage = {
  setItem: (name: string, value: string) => {
    return storage.set(name, value)
  },
  getItem: (name: string) => {
    const value = storage.getString(name)
    return value ?? null
  },
  removeItem: (name: string) => {
    return storage.delete(name)
  },
}

export const useStore = create<RootStore>()(
  persist(
    (...a) => ({
      ...createAuthenticationSlice(...a),
      ...createCreatePostSlice(...a), // TODO: We don't need to persist the create post slice
      // add your state slices here

      _hasHydrated: false,
      setHasHydrated: (state) => {
        const set = a[0]
        set({
          _hasHydrated: state,
        })
      },
    }),
    {
      name: "zustand-app",
      storage: createJSONStorage(() => zustandStorage),
      onRehydrateStorage: () => (state) => {
        state?.setHasHydrated(true)
      },
    },
  ),
)

export const useAuthenticationStore = () => useStore(useShallow(authenticationStoreSelector))
export const useCreatePostStore = () => useStore(useShallow(createPostStoreSelector))
