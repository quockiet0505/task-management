"use client"

import { Typography } from "antd"
import DashboardLayout from "@/components/layout/DashboardLayout"
import { useAuth } from "@/context/AuthContext"

const { Title } = Typography

export default function SettingsPage() {
  const { user } = useAuth()

  return (
    <DashboardLayout>
      <Title level={3}>Settings</Title>

      <p>Email: {user?.email}</p>
    </DashboardLayout>
  )
}