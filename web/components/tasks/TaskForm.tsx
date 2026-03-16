"use client"

import { Form, Input, Button, Select } from "antd"
import { Organization } from "@/types/org" 
import { useEffect } from "react"

export interface TaskFormValues {
  title: string
  status: "todo" | "in-progress" | "done"
  priority?: "low" | "medium" | "high"
  organizationId: string 
}

interface Props {
  organizations: Organization[] 
  initialValues?: TaskFormValues
  onSubmit: (values: TaskFormValues) => void
}

export default function TaskForm({ organizations, initialValues, onSubmit }: Props) {
  const [form] = Form.useForm()

  useEffect(() => {
    if (initialValues) {
      form.setFieldsValue(initialValues)
    } else {
      form.resetFields()
      form.setFieldsValue({
        status: "todo",
        priority: "medium",
        organizationId: organizations?.length > 0 ? organizations[0].id : undefined
      })
    }
  }, [initialValues, organizations, form])

  const handleFinishFailed = (errorInfo: unknown) => {
    console.error("DỮ LIỆU FORM CHƯA HỢP LỆ:", errorInfo)
  }

  return (
    <Form<TaskFormValues> 
      form={form}
      layout="vertical" 
      onFinish={onSubmit}
      onFinishFailed={handleFinishFailed}
    >
      <Form.Item
        label="Organization"
        name="organizationId"
        rules={[{ required: true, message: "Vui lòng chọn tổ chức!" }]}
      >
        <Select
          placeholder="Select an organization"
          options={(organizations || []).map((org) => ({
            label: org.name,
            value: org.id,
          }))}
        />
      </Form.Item>

      <Form.Item
        label="Title"
        name="title"
        rules={[{ required: true, message: "Vui lòng nhập tên công việc!" }]}
      >
        <Input placeholder="Enter task title" />
      </Form.Item>

      <Form.Item label="Status" name="status">
        <Select
          options={[
            { label: "Todo", value: "todo" },
            { label: "In Progress", value: "in-progress" },
            { label: "Done", value: "done" },
          ]}
        />
      </Form.Item>

      <Form.Item label="Priority" name="priority">
        <Select
          options={[
            { label: "Low", value: "low" },
            { label: "Medium", value: "medium" },
            { label: "High", value: "high" },
          ]}
        />
      </Form.Item>

      <Form.Item>
        <Button type="primary" htmlType="submit" block>
          {initialValues ? "Update Task" : "Create Task"}
        </Button>
      </Form.Item>
    </Form>
  )
}