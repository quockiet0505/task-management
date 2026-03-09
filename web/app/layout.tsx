import { ConfigProvider } from "antd"
import { AuthProvider } from "@/context/AuthContext"
import "antd/dist/reset.css"

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body>
        <ConfigProvider>
          <AuthProvider>{children}</AuthProvider>
        </ConfigProvider>
      </body>
    </html>
  )
}