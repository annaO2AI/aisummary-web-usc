import React, { useEffect, useState } from 'react';
import Image from "next/image"
import { API_ROUTES } from "../../constants/api"
import { fetchWithAuth } from "../../utils/axios"
import { decodeJWT } from "@/app/utils/decodeJWT"

// Define the props interface for TypeScript
interface ProfileCardProps {
  firstName?: string;
  lastName?: string;
  email?: string;
  role?: string;
}


function getInitials(name: string): string {
  if (!name) return ""
  const parts = name.trim().split(" ")
  if (parts.length === 1) return parts[0][0].toUpperCase()
  return (parts[0][0] + parts[parts.length - 1][0]).toUpperCase()
}

const ProfileCard: React.FC<ProfileCardProps> = ({
  firstName = 'John',
  lastName = 'Brown',
  email = 'johnbrown@elevancesystems.com',
  role = 'Admin',
}) => {
      const [scrolled, setScrolled] = useState(false)
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
      
          if (!token) {
            console.log("No access token found in cookies")
            setLoading(false)
            return
          }
      
          console.log("Access token:", token)
      
          const decoded = decodeJWT(token)
          if (!decoded) {
            console.log("Failed to decode JWT")
            setLoading(false)
            return
          }
      
          console.log('Decoded JWT:', decoded)
      
          if (decoded?.name) {
            setUsername(decoded.name)
            console.log("Username set:", decoded.name)
          }
      
          if (decoded?.email || decoded?.Email || decoded?.user_email) {
            setUseremail(decoded.email || decoded.Email || decoded.user_email)
            console.log("Useremail set:", decoded.email || decoded.Email || decoded.user_email)
          } else {
            console.log("No email found in decoded JWT")
          }
        }, [])
      
        useEffect(() => {
          const onScroll = () => setScrolled(window.scrollY > 10)
          window.addEventListener("scroll", onScroll)
          return () => window.removeEventListener("scroll", onScroll)
        }, [])
      
        useEffect(() => {
          const fetchUseaccess = async () => {
            if (!useremail) {
              console.log("Skipping API call: useremail is not yet set")
              setLoading(false)
              return
            }
      
            const url = `${API_ROUTES.useaccess}?email=${useremail}`
            console.log("Fetching user role from:", url)
      
            try {
              const res = await fetchWithAuth(url)
              if (!res.ok) {
                throw new Error(`HTTP error! Status: ${res.status}`)
              }
              const data = await res.json()
              console.log("User role response:", data)
              setUseAccess(data)
            } catch (err) {
              if (err instanceof Error) {
                console.error("Failed to fetch user role:", err.message)
              } else {
                console.error("Failed to fetch user role:", err)
              }
            } finally {
              setLoading(false)
            }
          }
      
          fetchUseaccess()
        }, [useremail])


  return (
      <div className=" mx-auto p-6 bg-white rounded-lg">
          <h2 className="text-2xl font-bold text-gray-800">My Profile</h2>
          <p className="text-gray-500 mb-4">Manage your account information.</p>

          <div className="flex items-left gap-6">
              <div className="flex items-center mb-6 flex-col w-[20%] gap-2" >
                 {initials && (
                  <div className="w-36 h-36 text-4xl rounded-full bg-blue-500 text-white flex items-center justify-center">
                        {initials}
                  </div>
                 )}
                  <div>
                      <p className="text-lg font-semibold text-gray-800">{username}</p>
                  </div>
              </div>
              <div className='w-[80%]'>
                <div className="grid grid-cols-2 gap-4 mb-6 ">
                    <div>
                        <p className="text-gray-500">First name</p>
                        <p className="text-gray-800 font-medium">{username}</p>
                    </div>
                    <div>
                        <p className="text-gray-500">Last name</p>
                        <p className="text-gray-800 font-medium">{username}</p>
                    </div>
                    <div>
                        <p className="text-gray-500">Email</p>
                        <p className="text-blue-600 font-medium">{useremail}</p>
                    </div>
                    <div>
                        <p className="text-gray-500">Role</p>
                        <p className="text-gray-800 font-medium">{useAccess.role ? `(${useAccess.role})` : loading ? '(...)' : ''}</p>
                    </div>
                </div>
                <div className='w-full'>
                        <h3 className="text-xl font-semibold text-gray-800 mb-4">Login-Methods</h3>
                        <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg mb-4">
                            <div className="flex items-center">
                                <div className="w-15 h-15 mr-3">                      
                                    <Image
                                        src="/Otow-log.svg"
                                        alt="Otow Logo"
                                        width={80}
                                        height={49}
                                    />

                                </div>
                                <div>
                                    <p className="text-gray-800 font-medium">Login to O2.ai</p>
                                    <p className="text-gray-500">Enable login with O2.ai</p>
                                </div>
                            </div>
                            <button className="px-4 py-2 bg-blue-100 text-blue-600 rounded-lg hover:bg-blue-200 transition">
                                Enable
                            </button>
                        </div>

                        {/* <div className="flex items-center justify-between p-4  rounded-lg">
                            <div>
                                <p className="text-gray-800 font-medium">Log out on O2.ai</p>
                            </div>
                            <button className="flex items-center px-4 py-2 bg-red-100 text-red-600 rounded-lg hover:bg-red-200 transition">
                                <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 11V7a4 4 0 118 0v4m-8 0h8m-8 0H6a2 2 0 00-2 2v6a2 2 0 002 2h12a2 2 0 002-2v-6a2 2 0 00-2-2h-2"></path>
                                </svg>
                                Log Out
                            </button>
                        </div> */}
                    </div>
              </div>
          </div>

      </div>
  );
};

export default ProfileCard;