import { ConfigProvider } from "antd"
import { AuthProvider } from "@/context/AuthContext"
import { ThemeProvider } from "@/context/ThemeContext"
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
          <ThemeProvider>
          <AuthProvider>{children}</AuthProvider>
          </ThemeProvider>
        </ConfigProvider>
      </body>
    </html>
  )
}