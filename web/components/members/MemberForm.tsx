"use client"

import { Modal, Form, Input, Select, Button } from "antd"
import { Organization } from "@/types/org"
import { Role } from "@/types/member"
import { useEffect } from "react"

export interface MemberFormValues {
  organizationId: string
  userEmail?: string
  role: Role
}

interface Props {
  open: boolean
  onClose: () => void
  onSubmit: (values: MemberFormValues) => void
  initialValues?: Partial<MemberFormValues>  
  organizations?: Organization[]
  title?: string
  submitText?: string
}

export default function MemberForm({
  open,
  onClose,
  onSubmit,
  initialValues,
  organizations = [],
  title = "Add Member",
  submitText = "Add Member"
}: Props) {
  const [form] = Form.useForm<MemberFormValues>()

  useEffect(() => {
    if (open) {
      if (initialValues) {
        form.setFieldsValue(initialValues)
      } else {
        form.resetFields()
      }
    }
  }, [open, initialValues, form])

  const handleFinish = (values: MemberFormValues) => {
    onSubmit(values)
    form.resetFields()
    onClose()
  }

  return (
    <Modal
      title={title}
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
            disabled={!!initialValues?.organizationId} 
          />
        </Form.Item>

        {!initialValues && ( 
          <Form.Item
            label="User Email"
            name="userEmail"
            rules={[{ required: true, message: "Please enter user email" }]}
          >
            <Input placeholder="user@example.com" />
          </Form.Item>
        )}

        {initialValues && ( 
          <Form.Item label="Email" name="userEmail">
            <Input disabled />
          </Form.Item>
        )}

        <Form.Item label="Role" name="role" rules={[{ required: true, message: "Please select role" }]}>
          <Select
            options={[
              { label: "Admin", value: "admin" },
              { label: "Member", value: "member" },
            ]}
          />
        </Form.Item>

        <Button type="primary" htmlType="submit" block>
          {submitText}
        </Button>
      </Form>
    </Modal>
  )
}