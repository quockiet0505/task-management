import { useState } from "react"
import { useNavigate, Link } from "react-router-dom"
import { Form, Input, Button, Card, Typography } from "antd"
import { UserOutlined, LockOutlined } from "@ant-design/icons"
import AuthLayout from "@/components/layout/AuthLayout"
import { useAuth } from "@/context/AuthContext"

const { Title, Text } = Typography

interface LoginFormValues {
  email: string;
  password?: string;
}

export default function LoginPage() {
  const [loading, setLoading] = useState(false)
  const { login } = useAuth()
  const navigate = useNavigate()

  const onFinish = (values: LoginFormValues) => {
    setLoading(true)
    setTimeout(() => {
      login({ id: "123", email: values.email }) 
      navigate("/dashboard")
      setLoading(false)
    }, 800)
  }

  return (
    <AuthLayout>
      <Card className="w-[400px] shadow-xl border-0">
        <div className="text-center mb-6">
          <Title level={2} className="!mb-1">Đăng nhập</Title>
          <Text type="secondary">Hệ thống quản lý Task Manager</Text>
        </div>
        <Form layout="vertical" onFinish={onFinish} size="large">
          <Form.Item name="email" rules={[{ required: true, message: 'Nhập email!' }]}>
            <Input prefix={<UserOutlined />} placeholder="admin@gmail.com" />
          </Form.Item>
          <Form.Item name="password" rules={[{ required: true, message: 'Nhập mật khẩu!' }]}>
            <Input.Password prefix={<LockOutlined />} placeholder="Mật khẩu" />
          </Form.Item>
          <Form.Item>
            <Button type="primary" htmlType="submit" className="w-full mt-2" loading={loading}>Vào hệ thống</Button>
          </Form.Item>
          <div className="text-center text-sm">Chưa có tài khoản? <Link to="/register">Đăng ký</Link></div>
        </Form>
      </Card>
    </AuthLayout>
  )
}