import { getAccessToken } from "@privy-io/expo"
import { ApisauceInstance, create } from "apisauce"

const baseURL = process.env.REACT_APP_WILDCARD_API_URL || "https://sys.wildcard.lol"
const gowildBaseURL =
  process.env.REACT_APP_GOWILD_API_URL || "https://gowild-t54me.ondigitalocean.app"

const createApiInstance = (url: string): ApisauceInstance => {
  return create({
    baseURL: url,
    headers: {
      "Content-Type": "application/json",
    },
    timeout: 10000, // You can adjust this timeout as needed
  })
}

const apisauceInstance = createApiInstance(baseURL)
const gowildApisauceInstance = createApiInstance(gowildBaseURL)

const tokenInterceptor = async (config: any) => {
  try {
    const token = await getAccessToken()
    if (token) {
      config.headers.Authorization = `Bearer ${token}`
    }
  } catch (error) {
    console.error("Error fetching access token:", error)
  }
  return config
}

apisauceInstance.addRequestTransform(tokenInterceptor)
gowildApisauceInstance.addRequestTransform(tokenInterceptor)

export { apisauceInstance, gowildApisauceInstance }
export default apisauceInstance
