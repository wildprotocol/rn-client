import { useCallback, useMemo, useState } from "react"

import { debounce } from "lodash"

import { getUrlData } from "../services/api"

interface UrlData {
  url: string
  description?: string
  image?: string
  is_frame?: boolean
}

interface FrameData {
  url: string
  urlData: UrlData
}

export const useUrlPreview = (allowedMedia: number) => {
  const [urlPreview, setUrlPreview] = useState<UrlData[]>([])
  const [frames, setFrames] = useState<FrameData[]>([])
  const [isLoadingPreview, setIsLoadingPreview] = useState<boolean>(false)

  const getDataFromUrls = useCallback(
    async (urlsPresent: string[], mediaLength: number) => {
      const uniqueUrls = [...new Set(urlsPresent)]
      setIsLoadingPreview(true)

      try {
        const arr = await Promise.all(
          uniqueUrls.map(async (url) => {
            try {
              const response = await getUrlData(url)
              if (response.success === false || response.data?.success === false) {
                return null
              }
              const urlData = response.data?.data as UrlData | undefined
              if (!urlData?.description && !urlData?.image) return null
              return { url, ...urlData }
            } catch (err) {
              console.log(err)
              return null
            }
          }),
        )

        const filteredArr = arr.filter((data): data is UrlData => data !== null)
        setUrlPreview(filteredArr.filter((url) => !url.is_frame))

        const framesUrls = filteredArr
          .filter((url): url is UrlData & { is_frame: true } => url.is_frame === true)
          .map((url) => ({ url: url.url, urlData: url }))

        setFrames(framesUrls.slice(0, allowedMedia - mediaLength))
      } catch (error) {
        console.error("Error in getDataFromUrls:", error)
      } finally {
        setIsLoadingPreview(false)
      }
    },
    [allowedMedia],
  )

  const debouncedGetDataFromUrls = useMemo(() => debounce(getDataFromUrls, 1000), [getDataFromUrls])

  return {
    urlPreview,
    frames,
    isLoadingPreview,
    getDataFromUrls,
    debouncedGetDataFromUrls,
    setFrames,
  }
}
