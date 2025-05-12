"use client"

import { useEffect, useState } from "react"
import { API_ROUTES } from "../../constants/api"
import AudioPlayer from "./AudioPlayer"
import { fetchWithAuth } from "../../utils/axios"
type Props = {
  selectedAudio: string | null
  setSelectedAudio: (filename: string) => void
  clearGraphData: () => void
}

export default function AudioSelector({
  selectedAudio,
  setSelectedAudio,
  clearGraphData,
}: Props) {
  const [audioMap, setAudioMap] = useState<Record<string, string>>({})
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchAudioFiles = async () => {
      try {
        const res = await fetchWithAuth(API_ROUTES.audioFiles)
        const data = await res.json()
        setAudioMap(data)
      } catch (err) {
        console.error("Failed to load audio files:", err)
      } finally {
        setLoading(false)
      }
    }

    fetchAudioFiles()
  }, [])

  const audioUrl =
    selectedAudio && audioMap[selectedAudio]
      ? "/" + audioMap[selectedAudio].replace(/\\/g, "/")
      : ""

  return (
    <>
      {loading ? (
        <p>Loading audio files...</p>
      ) : (
        <select
          className="w-full border border-gray-300 rounded px-3 py-2"
          onChange={(e) => {
            setSelectedAudio(e.target.value)
            clearGraphData()
          }}
          defaultValue=""
        >
          <option value="" disabled>
            Select an audio file
          </option>
          {Object.keys(audioMap).map((key) => (
            <option key={key} value={key}>
              {key}
            </option>
          ))}
        </select>
      )}

      {selectedAudio && <AudioPlayer src={audioUrl} />}
    </>
  )
}
