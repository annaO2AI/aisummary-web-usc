import "./globals.css"
import type { ReactNode } from "react"
import { AISearchProvider } from "./context/AISearchContext"

import LayoutWrapper from "./components/LayoutWrapper"

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en">
      <body className="text-gray-900">
        <AISearchProvider>
          <LayoutWrapper>{children}</LayoutWrapper>
        </AISearchProvider>
      </body>
    </html>
  )
}
