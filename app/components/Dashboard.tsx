// "use client"

// import {
//   SentimentChart,
//   SentimentScoreGauge,
//   ActionItemsList,
//   SpeakerInsights,
//   CallSummaryCard,
//   CallCard,
//   OSCard,
//   Dashbordmain
// } from "./dashboard/index"
// import { useDashboard } from "../context/DashboardContext"
// import SentimentScoreCard from "./dashboard/cards/SentimentScoreCard"
// import { SentimentScoreChart } from "./dashboard/SentimentScoreGauge"

// const Dashboard = () => {
//   const { graphData, loading, selectedAudio, hasProcessed, setHasProcessed } = useDashboard()
//   console.log("annatest for graphDat" + graphData)
//   console.log("annatest for selectedAudio" + selectedAudio)
//   console.log("annatest for hasProcessed:", hasProcessed);
//   console.log("annatest for setHasProcessed:", setHasProcessed);
  
//   return (
//     <>
//       <div className="relative z-10 max-w-6xl mx-auto space-y-6">
//         {!loading && !hasProcessed && (
//            <Dashbordmain />
//         )}
//         {loading && (
//           <p className="mt-4 text-sm text-gray-500">
//             Processing audio file. Please wait...
//           </p>
//         )}

//         {!loading && graphData?.sentiment_chunks?.length > 0 && (
//           <div className="mt-6 pt-4 audio-Insights-main">
//             <h1 className="text-2xl font-bold text-slate-800 mb-4 mt-6 pt-6">
//               Audio Insights
//             </h1>
//             <div className="flex flex-row gap-6 mb-6">
//               <CallCard
//                 audioId={selectedAudio || ""}
//                 customerName=""
//                 agentName=""
//               />
//               <OSCard sentiment={graphData?.sentiment_score.toString()} />
//               <SentimentScoreCard score={graphData?.sentiment_score} />
//               <SentimentScoreGauge
//                 sentimentScore={graphData?.sentiment_score}
//               />
//             </div>
//             <div className="w-full mb-6">
//               <CallSummaryCard summary={graphData?.call_summary} />
//             </div>

//             <div className="w-full mb-6">
//               <SpeakerInsights speakerInsights={graphData?.speaker_insights} />
//             </div>
//             <div className="flex flex-col gap-6">
//               <h2 className="text-xl font-semibold mb-2">
//                 Sentiment Over Time
//               </h2>

//               <p className="text-sm text-gray-500 mb-4">
//                 This chart shows the sentiment score over time based on the
//                 audio file selected.
//               </p>
//               <SentimentChart data={graphData?.sentiment_chunks} />
//             </div>

//             <SentimentScoreChart sentimentScore={graphData?.sentiment_score} />

//             <div className="flex flex-row gap-6 mb-6 mt-6">
//               <div className="w-full">
//                 <ActionItemsList
//                   actionItems={graphData?.action_items ?? []}
//                   emailSent={graphData?.email_sent ?? []}
//                 />
//               </div>
//             </div>
//           </div>
//         )}
//       </div>
//     </>
//   )
// }

// export default Dashboard


"use client";

import {
  SentimentChart,
  SentimentScoreGauge,
  ActionItemsList,
  SpeakerInsights,
  CallSummaryCard,
  CallCard,
  OSCard,
  ProgressBar,
  Dashbordmain // Corrected import
} from "./dashboard/index";
import { useDashboard } from "../context/DashboardContext";
import SentimentScoreCard from "./dashboard/cards/SentimentScoreCard";
import { SentimentScoreChart } from "./dashboard/SentimentScoreGauge";
import clsx from "clsx"; // For conditional class names
import { useEffect, useState } from "react";

const Dashboard = () => {
  const { graphData, loading, selectedAudio, hasProcessed, setHasProcessed, resetDashboard } = useDashboard();
  const showDashboardMain = !loading && !hasProcessed;
  const showAudioInsights = !loading && graphData?.sentiment_chunks?.length > 0;
  const [progress, setProgress] = useState(0);

useEffect(() => {
  let timer: NodeJS.Timeout | undefined;
  if (loading) {
    setProgress(10);
    timer = setInterval(() => {
      setProgress((prev) => Math.min(prev + 80 / 60, 90));
    }, 100);
  } else {
    setProgress(0);
  }
  return () => clearInterval(timer!);
}, [loading]);
  
  return (
    <>
      <div className="relative z-10 max-w-6xl mx-auto space-y-6">
      
         {/* Audio Insights: Shown when data is available */}
        <div
          className={clsx(
            "transition-opacity duration-300",
            showAudioInsights ? "opacity-100 block audio-insights-main" : "opacity-0 hidden"
          )}
        >
          {showAudioInsights && (
            <div className="mt-6 pt-4 audio-insights-main">
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
              {/* Optional Reset Button */}
              <div className="text-center">
                <button
                  onClick={() => resetDashboard()}
                  className="mt-4 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
                >
                  Process New Audio
                </button>
              </div>
            </div>
          )}
        </div>
        {/* Dashboardmain: Shown only initially */}
        <div
          className={clsx(
            "transition-opacity duration-300",
            showDashboardMain ? "opacity-100 block Dashbordmain-main" : "opacity-0 hidden"
          )}
        >
          {showDashboardMain && (
            <div>
              <Dashbordmain />
            </div>
          )}
        </div>
        
        {/* Loading message */}
        {loading && (
          <div className="mt-4 text-sm text-gray-500">
            <ProgressBar progress={progress} />
          </div>
        )}

       

        {/* Fallback for no data after processing */}
        {!loading && hasProcessed && (!graphData || graphData?.sentiment_chunks?.length === 0) && (
          <div className="text-center">
            <p className="mt-4 text-sm text-red-500">
              No data available. Please try processing another audio file.
            </p>
            <button
              onClick={() => resetDashboard()}
              className="mt-2 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 "
            >
              Process New Audio
            </button>
          </div>
        )}
      </div>
    </>
  );
};

export default Dashboard;