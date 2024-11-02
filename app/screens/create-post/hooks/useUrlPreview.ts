import { useState } from "react"

import { useQuery } from "@tanstack/react-query"

import { URL } from "@/constants"
import { getUrlData } from "@/services/api"

const isValidUrl = (urlString: string): boolean => {
  return URL.test(urlString)
}

export const useUrlPreview = () => {
  const [url, setUrl] = useState<string | null>(null)
  const [enabled, setEnabled] = useState(false)

  const {
    data: urlPreview,
    isLoading: isUrlPreviewLoading,
    error: urlPreviewError,
    refetch,
  } = useQuery({
    queryKey: ["urlPreview", url],
    queryFn: () => getUrlData(url!),
    enabled: enabled && !!url && isValidUrl(url),
  })

  const fetchUrlPreview = (urlToFetch: string) => {
    if (!isValidUrl(urlToFetch)) {
      return new Error("Invalid URL")
    }

    setUrl(urlToFetch)
    setEnabled(true)
    return refetch()
  }

  console.log("urlPreview", JSON.stringify(urlPreview, null, 2))

  const urlPreviewData = urlPreview?.data?.data
    ? {
        image: urlPreview?.data?.data?.image,
        title: urlPreview?.data?.data?.title,
        description: urlPreview?.data?.data?.description,
        url: urlPreview?.data?.data?.url,
      }
    : null

  return { urlPreviewData, isUrlPreviewLoading, urlPreviewError, fetchUrlPreview }
}
