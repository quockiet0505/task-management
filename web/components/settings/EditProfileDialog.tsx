"use client"

import { Modal, Form, Input, Button, message } from "antd"
import { UpdateMeRequest } from "@/types/user"
import { updateMe } from "@/services/userService"
import { useState } from "react"

interface Props {
  open: boolean
  onClose: () => void
  initialValues?: UpdateMeRequest
  onSuccess?: () => void
}

export default function EditProfileDialog({
  open,
  onClose,
  initialValues,
  onSuccess,
}: Props) {
  const [form] = Form.useForm<UpdateMeRequest>()
  const [loading, setLoading] = useState(false)

  const handleFinish = async (values: UpdateMeRequest) => {
    try {
      setLoading(true)
      await updateMe(values)
      form.resetFields()
      onSuccess?.()
      onClose()
      message.success("Profile updated successfully")
    } catch (error) {
      console.error("Update failed:", error)
      message.error("Failed to update profile")
    } finally {
      setLoading(false)
    }
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

        <Button type="primary" htmlType="submit" block loading={loading}>
          Update Profile
        </Button>
      </Form>
    </Modal>
  )
}