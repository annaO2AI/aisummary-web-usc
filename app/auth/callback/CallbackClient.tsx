"use client"

import { useEffect } from "react"
import { useRouter } from "next/navigation"

export default function AuthCallbackPage() {
  const router = useRouter()

  useEffect(() => {
    const url = new URL(window.location.href)
    const token = url.searchParams.get("token")

    if (token) {
      document.cookie = `access_token=${token}; path=/`

      // Redirect user to your dashboard or home page
      router.push("/")
    } else {
      // Redirect to login with error if no token
      router.push("/error=missing_token")
    }
  }, [])

  return <p>Logging in...</p>
}
