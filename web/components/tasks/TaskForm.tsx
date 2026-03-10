"use client"

import { Form, Input, Button, Select } from "antd"
import { Organization } from "@/types/org" 

export interface TaskFormValues {
  title: string
  status: "todo" | "in-progress" | "done"
  priority?: "low" | "medium" | "high"
  organizationId: string 
}

interface Props {
  organizations: Organization[] 
  onSubmit: (values: TaskFormValues) => void
}

export default function TaskForm({ organizations, onSubmit }: Props) {
  return (
    <Form<TaskFormValues> layout="vertical" onFinish={onSubmit}>
      <Form.Item
        label="Organization"
        name="organizationId"
        rules={[{ required: true, message: "Vui lòng chọn tổ chức!" }]}
      >
        <Select
          placeholder="Select an organization"
          options={organizations.map((org) => ({
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

      <Form.Item label="Status" name="status" initialValue="todo">
        <Select
          options={[
            { label: "Todo", value: "todo" },
            { label: "In Progress", value: "in-progress" },
            { label: "Done", value: "done" },
          ]}
        />
      </Form.Item>

      <Form.Item label="Priority" name="priority" initialValue="medium">
        <Select
          options={[
            { label: "Low", value: "low" },
            { label: "Medium", value: "medium" },
            { label: "High", value: "high" },
          ]}
        />
      </Form.Item>

      <Button type="primary" htmlType="submit" block>
        Create Task
      </Button>
    </Form>
  )
}