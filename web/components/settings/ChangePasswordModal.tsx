// components/setting/ChangePasswordModal.tsx
"use client"

import { Modal, Form, Input, message } from "antd"
import { useState } from "react"
import { changePassword } from "@/services/userService"


interface Props {
  open: boolean
  onClose: () => void
}

export default function ChangePasswordModal({ open, onClose }: Props) {
  const [form] = Form.useForm()
  const [loading, setLoading] = useState(false)

  const handleSubmit = async () => {
    try {
      setLoading(true)
      const values = await form.validateFields()
      
      if (values.newPassword !== values.confirmPassword) {
        message.error("Passwords do not match")
        return
      }
      
       await changePassword({
        currentPassword: values.currentPassword,
        newPassword: values.newPassword,
      })
      
      message.success("Password changed successfully")
      form.resetFields()
      onClose()
    } catch (error) {
      console.error("Change password failed:", error)
      message.error("Failed to change password")
    } finally {
      setLoading(false)
    }
  }

  return (
    <Modal
      title="Change Password"
      open={open}
      onCancel={onClose}
      onOk={handleSubmit}
      confirmLoading={loading}
      okText="Change Password"
      cancelText="Cancel"
    >
      <Form form={form} layout="vertical">
        <Form.Item
          label="Current Password"
          name="currentPassword"
          rules={[{ required: true, message: "Please enter current password" }]}
        >
          <Input.Password placeholder="Enter current password" />
        </Form.Item>

        <Form.Item
          label="New Password"
          name="newPassword"
          rules={[
            { required: true, message: "Please enter new password" },
            { min: 6, message: "Password must be at least 6 characters" }
          ]}
        >
          <Input.Password placeholder="Enter new password" />
        </Form.Item>

        <Form.Item
          label="Confirm New Password"
          name="confirmPassword"
          rules={[
            { required: true, message: "Please confirm new password" },
            ({ getFieldValue }) => ({
              validator(_, value) {
                if (!value || getFieldValue('newPassword') === value) {
                  return Promise.resolve();
                }
                return Promise.reject(new Error('Passwords do not match'));
              },
            }),
          ]}
        >
          <Input.Password placeholder="Confirm new password" />
        </Form.Item>
      </Form>
    </Modal>
  )
}