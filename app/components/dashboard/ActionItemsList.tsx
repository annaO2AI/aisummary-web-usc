// "use client"

// // import { ListTodo as Clock } from "lucide-react"
// import EmailSentTags from "./EmailSentTags"
// import Image from 'next/image';

// type ActionItem = {
//   task: string
// }

// type Props = {
//   actionItems: ActionItem[]
//   emailSent: string[]
// }

// export default function ActionItemsList({ actionItems, emailSent }: Props) {
//   return (
//     <div className="w-full">
//       <div className="flex items-start justify-between mb-4 gap-6 items-stretch">
//         <div className="w-[65%] p-12 rounded-2xl boxshadow bg-white">
//           <div className="flex items-baseline mb-2">
//             <h2 className="text-xl font-semibold mb-4 ot-title">Action Items</h2>
//           </div>
//           <ul className="space-y-3">
//             {actionItems.map((item, idx) => (
//               <li key={idx} className="flex items-center justify-left gap-3 border-o2 p-4 rounded-md">
//                 <Image
//                   src="/checkbox.svg"
//                   alt="Check"
//                   width={18}
//                   height={18}
//                 />
//                 <span className="text-base osubtitle ">{item.task}</span>
//               </li>
//             ))}
//           </ul>
//           <button className="mt-4 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600">
//             Download Report
//           </button>
//         </div>
//         <div className="w-[35%] rounded-2xl boxshadow bg-white emailactivatbg emailBoder">
//           <EmailSentTags emailSent={emailSent} />
//         </div>
//       </div>
//     </div>
//   )
// }

"use client"

import EmailSentTags from "./EmailSentTags"
import Image from 'next/image';
import { API_ROUTES } from "../../constants/api"
import { fetchWithAuth } from "../../utils/axios"
import { useState } from "react"

type ActionItem = {
  task: string
}

type Props = {
  actionItems: ActionItem[]
  emailSent: string[]
}

export default function ActionItemsList({ actionItems, emailSent }: Props) {
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [successMessage, setSuccessMessage] = useState<string | null>(null)

  const handleUploadReport = async () => {
    setIsLoading(true)
    setError(null)
    setSuccessMessage(null)
    
    try {
      const response = await fetchWithAuth(API_ROUTES.downloadReport, {
        method: 'GET',
      })

      if (!response.ok) {
        const errorData = await response.json()
        throw new Error(errorData.error || 'Failed to upload report')
      }

      setSuccessMessage('Report successfully uploaded')
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred while uploading the report')
      console.error('Upload error:', err)
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="w-full">
      <div className="flex items-start justify-between mb-4 gap-6 items-stretch">
        <div className="w-[65%] p-12 rounded-2xl boxshadow bg-white">
          <div className="flex items-baseline mb-2">
            <h2 className="text-xl font-semibold mb-4 ot-title">Action Items</h2>
          </div>
          <ul className="space-y-3">
            {actionItems.map((item, idx) => (
              <li key={idx} className="flex items-center justify-left gap-3 border-o2 p-4 rounded-md">
                <Image
                  src="/checkbox.svg"
                  alt="Check"
                  width={18}
                  height={18}
                />
                <span className="text-base osubtitle">{item.task}</span>
              </li>
            ))}
          </ul>
          <button 
            className="mt-4 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 disabled:bg-blue-300 disabled:cursor-not-allowed"
            onClick={handleUploadReport}
            disabled={isLoading}
          >
            {isLoading ? 'Uploading...' : 'Upload Report'}
          </button>
          {successMessage && (
            <p className="mt-2 text-sm text-green-500">{successMessage}</p>
          )}
          {error && (
            <p className="mt-2 text-sm text-red-500">{error}</p>
          )}
        </div>
        <div className="w-[35%] rounded-2xl boxshadow bg-white emailactivatbg emailBoder">
          <EmailSentTags emailSent={emailSent} />
        </div>
      </div>
    </div>
  )
}