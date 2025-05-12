import React from "react"

const CallSummaryCard = ({ summary }: { summary: string }) => {
  return (
    <div className="p-6 from-indigo-50 to-blue-50 border-o2 rounded-xl shadow-sm bg-white">
      <h2 className="text-lg font-semibold text-gray-800 mb-2">Call Summary</h2>
      <p className="text-gray-700 leading-relaxed">{summary}</p>
    </div>
  )
}

export default CallSummaryCard
