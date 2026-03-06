import { Typography, Form, Input, Button, Card, message } from "antd"
import { BankOutlined } from "@ant-design/icons"
import DashboardLayout from "@/components/layout/DashboardLayout"

const { Title } = Typography

interface CreateOrgValues {
  name: string;
}

export default function CreateOrgPage() {
  const [form] = Form.useForm()

  const onFinish = (values: CreateOrgValues) => {
    message.success(`Đã tạo tổ chức: ${values.name}`)
    form.resetFields()
  }

  return (
    <DashboardLayout>
      <Title level={3} className="mb-6">Tạo Tổ Chức Mới</Title>
      <Card className="max-w-xl">
        <Form form={form} layout="vertical" onFinish={onFinish}>
          <Form.Item name="name" label="Tên tổ chức" rules={[{ required: true, message: 'Vui lòng nhập tên!' }]}>
            <Input prefix={<BankOutlined />} placeholder="Ví dụ: Công ty Biwoco..." size="large" />
          </Form.Item>
          <Form.Item>
            <Button type="primary" htmlType="submit" size="large">Khởi tạo</Button>
          </Form.Item>
        </Form>
      </Card>
    </DashboardLayout>
  )
}