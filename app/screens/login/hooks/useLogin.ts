import {
  useEmbeddedWallet,
  useLoginWithEmail,
  useLoginWithFarcaster,
  usePrivy,
} from "@privy-io/expo"

import { pollAccountStatus } from "@/services/api"
import { useAuthenticationStore } from "@/store"
import { save } from "@/utils/storage"

export const useLogin = () => {
  const { getAccessToken, logout } = usePrivy()
  const { setAuthToken } = useAuthenticationStore()

  const handleLoginSuccess = async (token?: string, accountStatus?: any) => {
    try {
      // First, close the modal

      // Wait a short time to ensure the modal closing animation has started

      if (token) {
        setAuthToken(token)
        console.log("Token set in MobX store")
      } else {
        const newToken = await getAccessToken()
        if (newToken) {
          setAuthToken(newToken)
          console.log("New token set in MobX store")
        } else {
          console.log("No token available")
        }
      }

      // small delay to ensure the modal is fully closed
      await new Promise((resolve) => setTimeout(resolve, 300))

      // Now the navigation change will occur after the modal is closed
      return true
    } catch (error) {
      console.error("Error in handleLoginSuccess:", error)
      return false
    }
  }

  const { state: farcasterState, loginWithFarcaster } = useLoginWithFarcaster({
    onSuccess: async (user, isNewUser) => {
      save("user", user)
      console.log("farcasterState", farcasterState)

      const accountStatus = await pollAccountStatus()
      handleLoginSuccess(undefined, accountStatus)
    },
    onError: async (error) => {
      console.error("Login failed:", error)
      console.log("farcasterState", farcasterState)

      await logout()
    },
  })

  // Return loginWithFarcaster function
  return { loginWithFarcaster }
}
