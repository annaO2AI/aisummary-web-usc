import { Mail, AlertCircle } from "lucide-react"

const EmailSentTags = ({ emailSent }: { emailSent: string[] }) => {
  const getStyle = (label: string) => {
    if (label.toLowerCase().includes("action")) {
      return {
        bg: "bg-red-100",
        text: "text-red-800",
        border: "border-red-300",
        icon: <AlertCircle className="w-4 h-4 mr-1 text-red-600" />,
      }
    }

    return {
      bg: "bg-blue-100",
      text: "text-blue-800",
      border: "border-blue-300",
      icon: <Mail className="w-4 h-4 mr-1 text-blue-600" />,
    }
  }

  return (
    <div className="my-6">
      <h3 className="text-lg font-semibold mb-3">📧 Emails Sent</h3>
      <div className="flex flex-wrap gap-3">
        {emailSent.map((label, idx) => {
          const style = getStyle(label)
          return (
            <span
              key={idx}
              className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-medium ${style.bg} ${style.text} border ${style.border}`}
            >
              {style.icon}
              {label}
            </span>
          )
        })}
      </div>
    </div>
  )
}

export default EmailSentTags
