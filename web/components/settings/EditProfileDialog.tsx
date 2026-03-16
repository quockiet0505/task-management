"use client"

import { Modal, Form, Input, Button } from "antd"
import { UpdateMeRequest } from "@/types/user"
import { updateMe } from "@/services/userService"

interface Props {
  open: boolean
  onClose: () => void
  initialValues?: UpdateMeRequest
  onUpdated?: () => void
}

export default function EditProfileDialog({
  open,
  onClose,
  initialValues,
  onUpdated,
}: Props) {
  const [form] = Form.useForm<UpdateMeRequest>()

  const handleFinish = async (values: UpdateMeRequest) => {
    await updateMe(values)

    form.resetFields()
    onUpdated?.()
    onClose()
  }

  return (
    <Modal
      title="Edit Profile"
      open={open}
      footer={null}
      onCancel={() => {
        form.resetFields()
        onClose()
      }}
    >
      <Form<UpdateMeRequest>
        form={form}
        layout="vertical"
        initialValues={initialValues}
        onFinish={handleFinish}
      >
        <Form.Item
          label="Full Name"
          name="fullName"
          rules={[{ required: true, message: "Please enter full name" }]}
        >
          <Input placeholder="Enter your full name" />
        </Form.Item>

        <Form.Item
          label="Phone Number"
          name="phoneNumber"
          rules={[{ required: true, message: "Please enter phone number" }]}
        >
          <Input placeholder="Enter your phone number" />
        </Form.Item>

        <Button type="primary" htmlType="submit" block>
          Update Profile
        </Button>
      </Form>
    </Modal>
  )
}