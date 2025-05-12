import { User, Headset } from "lucide-react"

const SpeakerInsights = ({
  speakerInsights,
}: {
  speakerInsights: { Customer: string; Agent: string }
}) => {
  const colorStyles = {
    green: {
      bg: "bg-green-50",
      border: "border-green-200",
      title: "text-green-800",
      text: "text-green-900",
    },
    blue: {
      bg: "bg-blue-50",
      border: "border-blue-200",
      title: "text-blue-800",
      text: "text-blue-900",
    },
  }

  const insights = [
    {
      title: "Customer Insights",
      text: speakerInsights.Customer,
      icon: <User className="w-5 h-5 text-green-600 mr-2" />,
      color: colorStyles["green"],
    },
    {
      title: "Agent Insights",
      text: speakerInsights.Agent,
      icon: <Headset className="w-5 h-5 text-blue-600 mr-2" />,
      color: colorStyles["blue"],
    },
  ]

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-6">
      {insights.map(({ title, text, icon, color }, idx) => (
        <div
          key={idx}
          className={`p-6 rounded-xl border shadow ${color.bg} ${color}.border} `}
        >
          <div className="flex items-baseline">
            <h3 className={`text-lg font-semibold ${color.title} mb-2`}>
              {title}
            </h3>
          </div>
          <p className={color.text}>{text}</p>
        </div>
      ))}
    </div>
  )
}

export default SpeakerInsights
