"use client"

import { Typography, Card, Descriptions, Button } from "antd"
import DashboardLayout from "@/components/layout/DashboardLayout"
import { useAuth } from "@/context/AuthContext"

const { Title } = Typography

export default function SettingsPage() {
  const { user, logout } = useAuth()

  return (
    <DashboardLayout>
      <Title level={3}>Settings</Title>

      <Card style={{ maxWidth: 600 }}>
        <Descriptions column={1} bordered>
          <Descriptions.Item label="User ID">
            {user?.id}
          </Descriptions.Item>

          <Descriptions.Item label="Email">
            {user?.email}
          </Descriptions.Item>
        </Descriptions>

        <Button
          danger
          style={{ marginTop: 16 }}
          onClick={logout}
        >
          Logout
        </Button>
      </Card>
    </DashboardLayout>
  )
}