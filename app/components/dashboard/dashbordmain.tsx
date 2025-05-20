import {
  HomeIcon,
  BarChart2Icon,
  SettingsIcon,
} from "lucide-react"
import clsx from "clsx"
import { AudioSelector, ProcessButton } from "./index"
import { useDashboard } from "../../context/DashboardContext"

const navItems = [
  { label: "Home", icon: HomeIcon, href: "#" },
  { label: "Reports", icon: BarChart2Icon, href: "#" },
  { label: "Settings", icon: SettingsIcon, href: "#" },
]


export default function Dashbordmain() {
  const {
    selectedAudio,
    setSelectedAudio,
    graphData,
    setGraphData,
    loading,
    setLoading,
  } = useDashboard()


  return (
    <div className="hidden">
        <div className="p-4 space-y-4 mt-6 border-t pt-4">
          <AudioSelector
            selectedAudio={selectedAudio}
            setSelectedAudio={setSelectedAudio}
            clearGraphData={() => setGraphData([])}
          />
          <ProcessButton
            selectedAudio={selectedAudio}
            setGraphData={setGraphData}
            loading={loading}
            setLoading={setLoading}
          />
        </div>
    </div>
  )
}
