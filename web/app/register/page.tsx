"use client"

import { Form, Input, Button, Card, Typography } from "antd"
import { UserOutlined, LockOutlined } from "@ant-design/icons"
import { useRouter } from "next/navigation"
import Link from "next/link"
import AuthLayout from "@/components/layout/AuthLayout"

const { Title, Text } = Typography

interface RegisterFormValues {
  email: string
  password: string
}

export default function RegisterPage() {
  const router = useRouter()

  const onFinish = (values: RegisterFormValues) => {
    console.log(values)
    router.push("/login")
  }

  return (
    <AuthLayout>
      <Card style={{ width: 420 }}>
        <div style={{ textAlign: "center", marginBottom: 24 }}>
          <Title level={2}>Create Account</Title>
        </div>

        <Form<RegisterFormValues> layout="vertical" size="large" onFinish={onFinish}>
          <Form.Item label="Email" name="email">
            <Input prefix={<UserOutlined />} />
          </Form.Item>

          <Form.Item label="Password" name="password">
            <Input.Password prefix={<LockOutlined />} />
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