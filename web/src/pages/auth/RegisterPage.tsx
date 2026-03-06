import { useState } from "react"
import { useNavigate, Link } from "react-router-dom"
import { Form, Input, Button, Card, Typography, message } from "antd"
import { UserOutlined, LockOutlined } from "@ant-design/icons"
import AuthLayout from "@/components/layout/AuthLayout"

const { Title, Text } = Typography

// Khai báo kiểu dữ liệu
interface RegisterFormValues {
  email: string;
  password?: string;
}

export default function RegisterPage() {
  const [loading, setLoading] = useState(false)
  const navigate = useNavigate()

  const onFinish = (values: RegisterFormValues) => {
    setLoading(true)
    setTimeout(() => {
      message.success(`Đăng ký thành công tài khoản ${values.email}! Đang chuyển hướng...`)
      navigate("/login")
    }, 1000)
  }

  return (
    <AuthLayout>
      <Card className="w-[400px] shadow-xl border-0">
        <div className="text-center mb-6">
          <Title level={2} className="!mb-1">Đăng ký</Title>
          <Text type="secondary">Tạo tài khoản mới</Text>
        </div>
        <Form layout="vertical" onFinish={onFinish} size="large">
          <Form.Item name="email" rules={[{ required: true, message: 'Nhập email!' }]}><Input prefix={<UserOutlined />} placeholder="Email" /></Form.Item>
          <Form.Item name="password" rules={[{ required: true, message: 'Nhập mật khẩu!' }]}><Input.Password prefix={<LockOutlined />} placeholder="Mật khẩu" /></Form.Item>
          <Form.Item><Button type="primary" htmlType="submit" className="w-full mt-2" loading={loading}>Đăng ký ngay</Button></Form.Item>
          <div className="text-center text-sm">Đã có tài khoản? <Link to="/login">Đăng nhập</Link></div>
        </Form>
      </Card>
    </AuthLayout>
  )
}