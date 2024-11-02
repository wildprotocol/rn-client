import { useCallback, useState } from "react"

import { Reply } from "@/data/dummyReplies"

export function useCommentSearch() {
  const [isSearchVisible, setIsSearchVisible] = useState(false)
  const [searchQuery, setSearchQuery] = useState("")
  const [searchResults, setSearchResults] = useState<Reply[]>([])

  const toggleSearch = useCallback(() => {
    setIsSearchVisible((prev) => !prev)
    if (isSearchVisible) {
      // Reset search when closing
      setSearchQuery("")
      setSearchResults([])
    }
  }, [isSearchVisible])

  const searchComments = useCallback((comments: Reply[], query: string) => {
    if (!query.trim()) {
      setSearchResults([])
      return
    }

    const searchRecursive = (reply: Reply): boolean => {
      const matchesQuery =
        reply.content.toLowerCase().includes(query.toLowerCase()) ||
        reply.author.toLowerCase().includes(query.toLowerCase())

      if (matchesQuery) {
        setSearchResults((prev) => [...prev, reply])
      }

      if (reply.replies) {
        reply.replies.forEach(searchRecursive)
      }

      return matchesQuery
    }

    setSearchResults([])
    comments.forEach(searchRecursive)
  }, [])

  return {
    isSearchVisible,
    searchQuery,
    searchResults,
    toggleSearch,
    setSearchQuery,
    searchComments,
  }
}
