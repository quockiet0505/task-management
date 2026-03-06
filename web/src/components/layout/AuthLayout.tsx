import { type ReactNode } from "react"
import { Navigate } from "react-router-dom"
import { useAuth } from "@/context/AuthContext"
import { Layout } from "antd"

export default function AuthLayout({ children }: { children: ReactNode }) {
  const { user } = useAuth()
  
  if (user) return <Navigate to="/dashboard" replace />

  return (
    <Layout className="min-h-screen flex items-center justify-center bg-slate-50">
      {children}
    </Layout>
  )
}