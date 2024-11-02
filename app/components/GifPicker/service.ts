import axios from "axios"

const TENOR_API_BASE_URL = "https://tenor.googleapis.com/v2"
const API_KEY = process.env.EXPO_PUBLIC_TENOR_API_KEY
const LIMIT = 20

const tenorApi = axios.create({
  baseURL: TENOR_API_BASE_URL,
  params: {
    key: API_KEY,
    limit: LIMIT,
  },
})

const searchGifs = async (query = "") => {
  try {
    const endpoint = query === "" ? "featured" : "search"
    const params = query === "" ? {} : { q: query }
    console.log("params", params)
    const { data } = await tenorApi.get(endpoint, { params })
    return data.results
  } catch (error) {
    console.error("Error searching GIFs:", error)
    throw error
  }
}

export { searchGifs }
