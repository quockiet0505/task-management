"use client"

import { Modal, Form, Input, Button } from "antd"

export interface CreateOrgValues {
  name: string
}

interface Props {
  open: boolean
  onClose: () => void
  onCreate?: (values: CreateOrgValues) => void
}

export default function CreateOrgDialog({ open, onClose, onCreate }: Props) {
  const [form] = Form.useForm()

  const handleFinish = (values: CreateOrgValues) => {
    onCreate?.(values)
    form.resetFields()
  }

  return (
    <Modal
      title="Create Organization"
      open={open}
      footer={null}
      onCancel={() => {
        form.resetFields()
        onClose()
      }}
    >
      <Form<CreateOrgValues> form={form} layout="vertical" onFinish={handleFinish}>
        <Form.Item
          label="Organization Name"
          name="name"
          rules={[{ required: true, message: "Please enter organization name" }]}
        >
          <Input placeholder="e.g. My Awesome Team" />
        </Form.Item>

        <Button type="primary" htmlType="submit" block>
          Create Organization
        </Button>
      </Form>
    </Modal>
  )
}