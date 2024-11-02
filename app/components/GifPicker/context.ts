import { createContext } from "react"

export interface GifPickerContextType {
  searchQuery: string
  setSearchQuery: (query: string) => void
  gifResults: any[]
  setGifResults: (results: any[]) => void
  selectedGif: string | null
  setSelectedGif: (gif: string | null) => void
  debouncedSearchChange: (text: string) => void
  handleGifSelect: (gif: string) => void
}

export const GifPickerContext = createContext<GifPickerContextType | undefined>(undefined)
