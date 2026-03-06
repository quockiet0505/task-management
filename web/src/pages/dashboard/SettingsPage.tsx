import { Typography, Card, Descriptions } from "antd"
import DashboardLayout from "@/components/layout/DashboardLayout"
import { useAuth } from "@/context/AuthContext"

const { Title } = Typography

export default function SettingsPage() {
  const { user } = useAuth()
  
  return (
    <DashboardLayout>
      <Title level={3} className="mb-6">Cài đặt tài khoản</Title>
      <Card>
        <Descriptions title="Thông tin cá nhân" bordered column={1}>
          <Descriptions.Item label="Email đăng nhập">{user?.email || "Chưa đăng nhập (Test Mode)"}</Descriptions.Item>
          <Descriptions.Item label="ID Hệ thống">{user?.id || "N/A"}</Descriptions.Item>
          <Descriptions.Item label="Trạng thái">Hoạt động</Descriptions.Item>
        </Descriptions>
      </Card>
    </DashboardLayout>
  )
}