/**
 * This Api class lets you define an API endpoint and methods to request
 * data and process it.
 *
 * See the [Backend API Integration](https://docs.infinite.red/ignite-cli/boilerplate/app/services/#backend-api-integration)
 * documentation for more details.
 */
import { ApiResponse } from "apisauce"

import Config from "../../config"
import type { ApiConfig } from "./api.types"
// Import the apisauce instances
import { apisauceInstance, gowildApisauceInstance } from "./apisauceInstances"

/**
 * Configuring the apisauce instance.
 */
export const DEFAULT_API_CONFIG: ApiConfig = {
  url: Config.API_URL,
  timeout: 10000,
}

/**
 * Manages all requests to the API. You can use this class to build out
 * various requests that you need to call from your backend API.
 */
export class Api {
  config: ApiConfig
  apisauceInstance: typeof apisauceInstance
  gowildApisauceInstance: typeof gowildApisauceInstance

  /**
   * Set up our API instance. Keep this lightweight!
   */
  constructor(config: ApiConfig = DEFAULT_API_CONFIG) {
    this.config = config
    this.apisauceInstance = apisauceInstance
    this.gowildApisauceInstance = gowildApisauceInstance
  }

  // You can add methods here that use either apisauceInstance or gowildApisauceInstance
}

// Singleton instance of the API for convenience
export const api = new Api()

// Add the new pollAccountStatus function
export const pollAccountStatus = async (): Promise<any> => {
  const response: ApiResponse<any> = await api.gowildApisauceInstance.get(
    `/api/v1/accounts/poll_account_status/`,
  )

  if (!response.ok) {
    console.error("API Error:", response.problem, response.status)
    throw new Error(response.problem)
  }

  return response.data
}

export const getUrlData = async (url: string): Promise<any> => {
  try {
    const response = await api.gowildApisauceInstance.get(`/api/v1/preview/get_preview?url=${url}`)
    return response
  } catch (error) {
    console.error("API Error:", error)
    return { success: false, message: "can't fetch url data" }
  }
}
