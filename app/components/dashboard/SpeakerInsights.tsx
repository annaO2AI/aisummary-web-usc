import { User, Headset } from "lucide-react"
import Image from 'next/image';
const SpeakerInsights = ({
  speakerInsights,
}: {
  speakerInsights: { Customer: string; Agent: string }
}) => {
  const colorStyles = {
    green: {
      bg: "bg-white",
      border: "border-green-200",
      title: "text-green-800",
      text: "text-green-900",
    },
    blue: {
      bg: "bg-white",
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
      src: "/CustomerInsightsCon.svg"
    },
    {
      title: "Agent Insights",
      text: speakerInsights.Agent,
      icon: <Headset className="w-5 h-5 text-blue-600 mr-2" />,
      color: colorStyles["blue"],
      src: "/AgentInsights.svg"
    },
  ]

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-6">
      {insights.map(({ title, text, icon, color, src }, idx) => (
        <div
          key={idx}
          className={`p-6 rounded-xl border boxshadow flex gap-8 ${color.bg} ${color}.border} `}
        >
          <div>
            <Image
              src={src}
              alt="Customer Insights"
              width={300}
              height={57}
            />

          </div>
          <div>
            <div className="flex items-baseline">
              <h3 className={`text-lg font-semibold ${color.title} mb-2`}>
                {title}
              </h3>
            </div>
            <p className={color.text}>{text}</p>
          </div>
        </div>
      ))}
    </div>
  )
}

export default SpeakerInsights
