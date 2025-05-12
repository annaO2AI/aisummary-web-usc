interface SentimentScoreCardProps {
  score: number
}

export default function SentimentScoreCard({ score }: SentimentScoreCardProps) {
  return (
    <div className="relative bg-[#B275F2] text-white w-64 p-6 rounded-xl shadow-md overflow-hidden flex flex-col items-start">
      <div className="flex space-x-1 mb-6">
        <img src="/stars.png" alt="Star" width={40}  />
      </div>

      <div className="text-[30px] font-bold">{score}/10</div>

      <div className="text-[16px] opacity-90">Sentiment <br/>Score</div>

      <img
        src="/stars.png"
        alt="Faded Star"
        className="absolute w-28 h-28 bottom-[-1rem] right-[-1rem] opacity-10 pointer-events-none"
      />
    </div>
  )
}
