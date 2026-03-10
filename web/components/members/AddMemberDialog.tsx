"use client"

import { Modal, Form, Input, Select, Button } from "antd"
import { Organization } from "@/types/org"

export interface AddMemberValues {
  organizationId: string
  userEmail: string
  role: "admin" | "member"
}

interface Props {
  open: boolean
  onClose: () => void
  onAdd?: (values: AddMemberValues) => void
  organizations?: Organization[]
}

export default function AddMemberDialog({
  open,
  onClose,
  onAdd,
  organizations = [],
}: Props) {
  const [form] = Form.useForm<AddMemberValues>()

  const handleFinish = (values: AddMemberValues) => {
    onAdd?.(values)
    form.resetFields()
  }

  return (
    <Modal
      title="Add Member"
      open={open}
      footer={null}
      onCancel={() => {
        form.resetFields()
        onClose()
      }}
    >
      <Form form={form} layout="vertical" onFinish={handleFinish}>
        <Form.Item
          label="Organization"
          name="organizationId"
          rules={[{ required: true, message: "Please select organization" }]}
        >
          <Select
            placeholder="Select organization"
            options={organizations.map((org) => ({
              label: org.name,
              value: org.id,
            }))}
          />
        </Form.Item>

        <Form.Item
          label="User Email"
          name="userEmail"
          rules={[{ required: true, message: "Please enter user email" }]}
        >
          <Input placeholder="user@example.com" />
        </Form.Item>

        <Form.Item label="Role" name="role" initialValue="member">
          <Select
            options={[
              { label: "Admin", value: "admin" },
              { label: "Member", value: "member" },
            ]}
          />
        </Form.Item>

        <Button type="primary" htmlType="submit" block>
          Add Member
        </Button>
      </Form>
    </Modal>
  )
}