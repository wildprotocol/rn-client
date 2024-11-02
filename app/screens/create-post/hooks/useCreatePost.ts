import { useState } from "react"

const useCreatePost = () => {
  const [title, setTitle] = useState("")
  const [body, setBody] = useState("")
  const [selectedCommunity, setSelectedCommunity] = useState(null)
  const [tags, setTags] = useState([])
  const [flairs, setFlairs] = useState([])

  const clearPost = () => {
    setTitle("")
    setBody("")
    setSelectedCommunity(null)
    setTags([])
    setFlairs([])
  }

  return {
    title,
    setTitle,
    body,
    setBody,
    selectedCommunity,
    setSelectedCommunity,
    tags,
    setTags,
    flairs,
    setFlairs,
    clearPost,
  }
}

export default useCreatePost
