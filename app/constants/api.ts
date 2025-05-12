const API_BASE_URL =
  process.env.NEXT_PUBLIC_API_BASE_URL ||
  "https://aisummary-api-usc-geemebfqfmead8f4.centralus-01.azurewebsites.net"
// "https://aisummary-api-fue6a9gxabdceng4.canadacentral-01.azurewebsites.net"

const API_BASE_URL_AISEARCH =
  process.env.NEXT_PUBLIC_API_BASE_URL_AISEARCH ||
  "https://ai-search-recruitment-api-hcg0c3bahzexatab.centralus-01.azurewebsites.net/"

export const API_ROUTES = {
  audioFiles: `${API_BASE_URL}/audio-files`,
  models: `${API_BASE_URL}/models`,
  processCall: `${API_BASE_URL}/process-call`,
  sentimentGraphInteractive: `${API_BASE_URL}/sentiment-graph-interactive`,
  downloadReport: `${API_BASE_URL}/download-report`,

  //AI Search api's
  upload: `${API_BASE_URL_AISEARCH}/upload`,
  conversations: `${API_BASE_URL_AISEARCH}/conversations`,
  ask: `${API_BASE_URL_AISEARCH}/ask`,
  deleteConversation: (conversation_id: string) =>
    `${API_BASE_URL_AISEARCH}/conversations/${conversation_id}`,
}
