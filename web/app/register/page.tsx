"use client"

import { Form, Input, Button, Card, Typography } from "antd"
import { UserOutlined, LockOutlined } from "@ant-design/icons"
import { useRouter } from "next/navigation"
import Link from "next/link"
import AuthLayout from "@/components/layout/AuthLayout"
import { RegisterRequest } from "@/types/auth"
import { registerUser } from "@/services/authService"

const { Title, Text } = Typography

export default function RegisterPage() {
  const router = useRouter()

  const onFinish = async (values: RegisterRequest) => {
    try {
      const res = await registerUser(values)
  
      console.log("Register success:", res)
  
      router.push("/login")
    } catch (err) {
      console.error("Register failed", err)
    }
  }

  return (
    <AuthLayout>
      <Card style={{ width: 420 }}>
        <div style={{ textAlign: "center", marginBottom: 24 }}>
          <Title level={2}>Create Account</Title>
        </div>

        <Form<RegisterRequest> 
          layout="vertical" size="large" 
          onFinish={onFinish}
          autoComplete="off"
          >
          <Form.Item label="Email" name="email">
            <Input
              prefix={<UserOutlined />}
              placeholder="admin@email.com"
            />
          </Form.Item>

          <Form.Item label="Password" name="password">
            <Input.Password
              prefix={<LockOutlined />}
              placeholder="Enter your password"
            />
          </Form.Item>

          <Button type="primary" htmlType="submit" block size="large">
            Register
          </Button>

          <div style={{ textAlign: "center", marginTop: 16 }}>
            <Text type="secondary">
              Already have an account?{" "}
              <Link href="/login">Login</Link>
            </Text>
          </div>
        </Form>
      </Card>
    </AuthLayout>
  )
}