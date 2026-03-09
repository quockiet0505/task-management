"use client"

import { Button, Modal, Form, Input, Select } from "antd"
import { useState } from "react"

export interface AddMemberValues {
  userId: string
  role: "admin" | "member"
}

interface Props {
  onAdd?: (values: AddMemberValues) => void
}

export default function AddMemberDialog({ onAdd }: Props) {
  const [open, setOpen] = useState(false)

  const handleFinish = (values: AddMemberValues) => {
    onAdd?.(values)
    setOpen(false)
  }

  return (
    <>
      <Button type="primary" onClick={() => setOpen(true)}>
        Add Member
      </Button>

      <Modal open={open} footer={null} onCancel={() => setOpen(false)}>
        <Form<AddMemberValues> layout="vertical" onFinish={handleFinish}>
          <Form.Item
            label="User Email"
            name="userId"
            rules={[{ required: true }]}
          >
            <Input />
          </Form.Item>

          <Form.Item label="Role" name="role" initialValue="member">
            <Select
              options={[
                { label: "Admin", value: "admin" },
                { label: "Member", value: "member" },
              ]}
            />
          </Form.Item>

          <Button type="primary" htmlType="submit">
            Add Member
          </Button>
        </Form>
      </Modal>
    </>
  )
}