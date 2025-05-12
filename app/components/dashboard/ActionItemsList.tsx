"use client"

import { ListTodo as Clock } from "lucide-react"
import EmailSentTags from "./EmailSentTags"

type ActionItem = {
  task: string
}

type Props = {
  actionItems: ActionItem[]
  emailSent: string[]
}

export default function ActionItemsList({ actionItems, emailSent }: Props) {
  return (
    <div className="w-full p-6 rounded-2xl shadow bg-white">
      <div className="flex items-start justify-between mb-4 gap-6">
        <div className="w-2/3">
          <div className="flex items-baseline mb-2">
            <h2 className="text-xl font-semibold mb-4">Action Items</h2>
          </div>
          <ul className="space-y-3">
            {actionItems.map((item, idx) => (
              <li key={idx} className="flex items-start gap-3">
                <Clock className="text-blue-400 mt-1" size={35} />
                <span className="text-base">{item.task}</span>
              </li>
            ))}
          </ul>
        </div>
        <EmailSentTags emailSent={emailSent} />
      </div>
    </div>
  )
}
