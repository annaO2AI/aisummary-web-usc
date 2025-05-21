"use client"

import {
  SentimentChart,
  SentimentScoreGauge,
  ActionItemsList,
  SpeakerInsights,
  CallSummaryCard,
  CallCard,
  OSCard,
  Dashbordmain
} from "./dashboard/index"
import { useDashboard } from "../context/DashboardContext"
import SentimentScoreCard from "./dashboard/cards/SentimentScoreCard"
import { SentimentScoreChart } from "./dashboard/SentimentScoreGauge"

const Dashboard = () => {
  const { graphData, loading, selectedAudio, hasProcessed, setHasProcessed } = useDashboard()
  console.log("annatest for graphDat" + graphData)
  console.log("annatest for selectedAudio" + selectedAudio)
  console.log("annatest for hasProcessed:", hasProcessed);
  return (
    <>
      <div className="relative z-10 max-w-6xl mx-auto space-y-6">
        {!loading && !hasProcessed && (
           <Dashbordmain />
        )}
        {loading && (
          <p className="mt-4 text-sm text-gray-500">
            Processing audio file. Please wait...
          </p>
        )}

        {!loading && graphData?.sentiment_chunks?.length > 0 && (
          <div className="mt-6 pt-4">
            <h1 className="text-2xl font-bold text-slate-800 mb-4 mt-6 pt-6">
              Audio Insights
            </h1>
            <div className="flex flex-row gap-6 mb-6">
              <CallCard
                audioId={selectedAudio || ""}
                customerName=""
                agentName=""
              />
              <OSCard sentiment={graphData?.sentiment_score.toString()} />
              <SentimentScoreCard score={graphData?.sentiment_score} />
              <SentimentScoreGauge
                sentimentScore={graphData?.sentiment_score}
              />
            </div>
            <div className="w-full mb-6">
              <CallSummaryCard summary={graphData?.call_summary} />
            </div>

            <div className="w-full mb-6">
              <SpeakerInsights speakerInsights={graphData?.speaker_insights} />
            </div>
            <div className="flex flex-col gap-6">
              <h2 className="text-xl font-semibold mb-2">
                Sentiment Over Time
              </h2>

              <p className="text-sm text-gray-500 mb-4">
                This chart shows the sentiment score over time based on the
                audio file selected.
              </p>
              <SentimentChart data={graphData?.sentiment_chunks} />
            </div>

            <SentimentScoreChart sentimentScore={graphData?.sentiment_score} />

            <div className="flex flex-row gap-6 mb-6 mt-6">
              <div className="w-full">
                <ActionItemsList
                  actionItems={graphData?.action_items ?? []}
                  emailSent={graphData?.email_sent ?? []}
                />
              </div>
            </div>
          </div>
        )}
      </div>
    </>
  )
}

export default Dashboard
