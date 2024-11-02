import { useCallback, useContext, useState } from "react"

import { debounce } from "lodash"

import { GifPickerContext, GifPickerContextType } from "./context"

export const useGifPickerContext = () => {
  const context = useContext(GifPickerContext)
  if (!context) {
    throw new Error("Component should be wrapped with GifPickerContextProvider")
  }
  return context
}

interface GifPickerContextProviderProps {
  children: React.ReactNode
}

const GifPickerContextProvider: React.FC<GifPickerContextProviderProps> = ({
  children,
}: GifPickerContextProviderProps) => {
  const [searchQuery, setSearchQuery] = useState("")
  const [gifResults, setGifResults] = useState<any[]>([])
  const [selectedGif, setSelectedGif] = useState<string | null>(null)

  const debouncedSearchChange = useCallback(
    (text: string) => {
      const debouncedFn = debounce(() => {
        setSearchQuery(text)
        // Here you would typically call an API to fetch GIF results
        // For now, we'll just set an empty array
        setGifResults([])
      }, 500)
      debouncedFn()
    },
    [setSearchQuery, setGifResults],
  )

  const handleGifSelect = (gif: string) => {
    setSelectedGif(gif)
  }

  const contextValue: GifPickerContextType = {
    searchQuery,
    setSearchQuery,
    gifResults,
    setGifResults,
    selectedGif,
    setSelectedGif,
    debouncedSearchChange,
    handleGifSelect,
  }

  return <GifPickerContext.Provider value={contextValue}>{children}</GifPickerContext.Provider>
}

export default GifPickerContextProvider
