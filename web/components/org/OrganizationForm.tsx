"use client"

import { Modal, Form, Input, Button } from "antd"
// import { Organization } from "@/types/org"
import { useEffect } from "react"

export interface OrganizationFormValues {
  name: string
}

interface Props {
  open: boolean
  onClose: () => void
  onSubmit: (values: OrganizationFormValues) => void
  initialValues?: Partial<OrganizationFormValues>
  title?: string
  submitText?: string
}

export default function OrganizationForm({
  open,
  onClose,
  onSubmit,
  initialValues,
  title = "Create Organization",
  submitText = "Create Organization"
}: Props) {
  const [form] = Form.useForm<OrganizationFormValues>()

  useEffect(() => {
    if (open) {
      if (initialValues) {
        form.setFieldsValue(initialValues)
      } else {
        form.resetFields()
      }
    }
  }, [open, initialValues, form])

  const handleFinish = (values: OrganizationFormValues) => {
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
      <Form<OrganizationFormValues> form={form} layout="vertical" onFinish={handleFinish}>
        <Form.Item
          label="Organization Name"
          name="name"
          rules={[{ required: true, message: "Please enter organization name" }]}
        >
          <Input placeholder="e.g. My Awesome Team" />
        </Form.Item>

        <Button type="primary" htmlType="submit" block>
          {submitText}
        </Button>
      </Form>
    </Modal>
  )
}