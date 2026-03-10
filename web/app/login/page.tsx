"use client"

import { Form, Input, Button, Card, Typography, message } from "antd"
import { UserOutlined, LockOutlined } from "@ant-design/icons"
import { useRouter } from "next/navigation"
import Link from "next/link"
import AuthLayout from "@/components/layout/AuthLayout"
import { useAuth } from "@/context/AuthContext"

import { loginUser } from "@/services/authService"
import { LoginRequest } from "@/types/auth"

const { Title, Text } = Typography

export default function LoginPage() {
  const router = useRouter()
  const { login } = useAuth()

  const onFinish = async (values: LoginRequest) => {
    try {
      const res = await loginUser(values)

      login(
        {
          id: res.userId,
          email: values.email,
        },
        res.token
      )

      message.success("Logged in successfully")
      router.push("/dashboard/tasks")
    } catch (error: unknown) {
      const err = error as Error
      console.error("Login failed:", err.message)
      message.error("Login failed. Please check your credentials.")
    }
  }

  return (
    <AuthLayout>
      <Card style={{ width: 420, boxShadow: "0 8px 30px rgba(0,0,0,0.1)", borderRadius: 10 }}>
        <div style={{ textAlign: "center", marginBottom: 24 }}>
          <Title level={2} style={{ marginBottom: 0 }}>
            Task Manager
          </Title>
          <Text type="secondary">Sign in to manage your tasks</Text>
        </div>

        <Form<LoginRequest>
          layout="vertical"
          size="large"
          onFinish={onFinish}
          autoComplete="off"
        >
          <Form.Item
            label="Email"
            name="email"
            rules={[{ required: true, message: "Please enter your email" }]}
          >
            <Input prefix={<UserOutlined />} placeholder="admin@email.com" />
          </Form.Item>

          <Form.Item
            label="Password"
            name="password"
            rules={[{ required: true, message: "Please enter your password" }]}
          >
            <Input.Password prefix={<LockOutlined />} placeholder="Password" />
          </Form.Item>

          <Button type="primary" htmlType="submit" block size="large">
            Login
          </Button>

          <div style={{ marginTop: 16, textAlign: "center" }}>
            <Text type="secondary">
              Don&apos;t have an account? <Link href="/register">Register</Link>
            </Text>
          </div>
        </Form>
      </Card>
    </AuthLayout>
  )
}