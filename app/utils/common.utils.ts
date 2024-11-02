export const transformImageUrl = (url: string, size: string = "rectcontain1"): string => {
  if (url?.startsWith("https://imagedelivery.net/BXluQx4ige9GuW0Ia56BHw")) {
    // Remove trailing slash if present
    const cleanUrl = url.endsWith("/") ? url.slice(0, -1) : url
    // Remove any existing variant (like '/original', '/rectcrop3', etc.)
    const baseUrl = cleanUrl.split("/").slice(0, -1).join("/")
    // Add the specified size
    return `${baseUrl}/${size}`
  }
  return url
}
