"use client"

import { Form, Input, Button, Card, Typography } from "antd"
import DashboardLayout from "@/components/layout/DashboardLayout"

const { Title } = Typography

interface CreateOrgValues {
  name: string
}

export default function CreateOrgPage() {
  const onFinish = (values: CreateOrgValues) => {
    console.log(values)
  }

  return (
    <DashboardLayout>
      <Title level={3}>Create Organization</Title>

      <Card style={{ maxWidth: 500 }}>
        <Form<CreateOrgValues> layout="vertical" onFinish={onFinish}>
          <Form.Item
            label="Organization Name"
            name="name"
            rules={[{ required: true }]}
          >
            <Input />
          </Form.Item>

          <Button type="primary" htmlType="submit">
            Create
          </Button>
        </Form>
      </Card>
    </DashboardLayout>
  )
}