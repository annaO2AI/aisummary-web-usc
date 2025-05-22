"use client"

import { useEffect, useState } from "react"
import Link from "next/link"
import clsx from "clsx"
import logo from "../../public/O2_AI_Logo.png"
import Image from "next/image"
import { User } from "lucide-react"
import { decodeJWT } from "@/app/utils/decodeJWT"
import { usePathname } from "next/navigation"
import { API_ROUTES } from "../constants/api"
import { fetchWithAuth } from "../utils/axios"

type HeaderProps = {
  sidebarOpen: boolean
}

function getInitials(name: string): string {
  if (!name) return ""
  const parts = name.trim().split(" ")
  if (parts.length === 1) return parts[0][0].toUpperCase()
  return (parts[0][0] + parts[parts.length - 1][0]).toUpperCase()
}

export default function Header({ sidebarOpen }: HeaderProps) {
  const [scrolled, setScrolled] = useState(false)
  const pathname = usePathname()
  const [username, setUsername] = useState<string | null>(null)
  const [useremail, setUseremail] = useState<string | null>(null)
  const [useAccess, setUseAccess] = useState<Record<string, string>>({})
  const [loading, setLoading] = useState(true)

  const initials = username ? getInitials(username) : ""
  

  useEffect(() => {
    const cookies = document.cookie.split(";").map((c) => c.trim())
    const token = cookies
      .find((c) => c.startsWith("access_token="))
      ?.split("=")[1]

    if (token) {
      const decoded = decodeJWT(token)
      if (decoded) {
        console.log('Decoded JWT:', decoded);
      }
      if (decoded?.name) {
        setUsername(decoded.name)
        console.log("Email decoded" + decoded)
      }
      if (decoded?.email) {
        setUseremail(decoded.email)
      }
    }
  }, [])

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 10)
    window.addEventListener("scroll", onScroll)
    return () => window.removeEventListener("scroll", onScroll)
  }, [])

  useEffect(() => {
      const fetchUseaccess = async () => {
        try {
          // const res = await fetchWithAuth(API_ROUTES.useaccess+"?email="+useremail)
          const res = await fetchWithAuth(`${API_ROUTES.useaccess}?email=${useremail}`)
          const data = await res.json()
          setUseAccess(data)
        } catch (err) {
          console.error("Failed to load audio files:", err)
        } finally {
          setLoading(false)
        }
      }
  
      fetchUseaccess()
    }, [])
  

  return (
    <header
      className={clsx(
        "fixed top-0 z-50 transition-all duration-300 h-18 flex items-center",
        "backdrop-blur-xl supports-[backdrop-filter]:bg-white/60",
        scrolled
          ? "shadow-md border-b border-white/30"
          : "border-b border-white/10",
        sidebarOpen
          ? " w-[calc(100%-16rem)]"
          : pathname === "/"
            ? " w-[calc(100%-4rem)]"
            : "w-full"
      )}
    >
      <div className="w-full max-w-7xl mx-auto px-4 flex items-center justify-between">
        <Link href="/" className="text-2xl font-bold text-gray-900">
          <Image
            src="/Otow-log.svg"
            alt="Otow Logo"
            width={86}
            height={49}
          />
        </Link>

        <nav className="hidden md:flex space-x-6">
          <Link href="/" className="text-gray-700 hover:text-black transition">
            Call Summary
          </Link>

          {/* <Link
            href="/chat-ui"
            className="text-gray-700 hover:text-black transition"
          >
            Chat
          </Link> */}
          <Link
            href="/about"
            className="text-gray-700 hover:text-black transition"
          >
            About
          </Link>

          <Link
            href="/contact"
            className="text-gray-700 hover:text-black transition"
          >
            Contact
          </Link>
        </nav>

        <div className="flex items-center space-x-2">
          <div className="w-8 h-8 rounded-full bg-blue-500 text-white flex items-center justify-center">
            {initials && (
              <div className="w-8 h-8 bg-blue-500 text-white rounded-full flex items-center justify-center font-normal text-sm">
                {initials}
              </div>
            )}
          </div>
          {/* <span className="text-gray-700 font-normal">Hi, {username}</span> */}
          <span className="text-gray-700 font-normal">
            Hi, {username || 'User'} {useAccess.role ? `(${useAccess.role})` : ''}
            
          </span>
          <span className="hidden">{useremail}</span>
        </div>
      </div>
    </header>
  )
}
