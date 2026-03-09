"use client"

import { Form, Input, Button, Card, Typography } from "antd"
import { UserOutlined, LockOutlined } from "@ant-design/icons"
import { useRouter } from "next/navigation"
import Link from "next/link"
import AuthLayout from "@/components/layout/AuthLayout"
import { useAuth } from "@/context/AuthContext"

const { Title, Text } = Typography

interface LoginFormValues {
  email: string
  password: string
}

export default function LoginPage() {
  const router = useRouter()
  const { login } = useAuth()

  const onFinish = (values: LoginFormValues) => {
    login({
      id: "1",
      email: values.email,
    })

    router.push("/dashboard/tasks")
  }

  return (
    <AuthLayout>
      <Card
        style={{
          width: 420,
          boxShadow: "0 8px 30px rgba(0,0,0,0.1)",
          borderRadius: 10,
        }}
      >
        <div style={{ textAlign: "center", marginBottom: 24 }}>
          <Title level={2} style={{ marginBottom: 0 }}>
            Task Manager
          </Title>

          <Text type="secondary">
            Sign in to manage your tasks
          </Text>
        </div>

        <Form<LoginFormValues>
          layout="vertical"
          size="large"
          onFinish={onFinish}
        >
          <Form.Item
            label="Email"
            name="email"
            rules={[{ required: true, message: "Please enter email" }]}
          >
            <Input prefix={<UserOutlined />} placeholder="admin@email.com" />
          </Form.Item>

          <Form.Item
            label="Password"
            name="password"
            rules={[{ required: true, message: "Please enter password" }]}
          >
            <Input.Password
              prefix={<LockOutlined />}
              placeholder="Password"
            />
          </Form.Item>

          <Button type="primary" htmlType="submit" block size="large">
            Login
          </Button>

          <div
            style={{
              marginTop: 16,
              textAlign: "center",
            }}
          >
            <Text type="secondary">
              Don&apos;t have an account?{" "}
              <Link href="/register">Register</Link>
            </Text>
          </div>
        </Form>
      </Card>
    </AuthLayout>
  )
}