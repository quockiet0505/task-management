"use client"

import { Form, Input, Button, Select } from "antd"

export interface TaskFormValues {
  title: string
  status: "todo" | "in-progress" | "done"
}

interface Props {
  onSubmit: (values: TaskFormValues) => void
}

export default function TaskForm({ onSubmit }: Props) {
  return (
    <Form<TaskFormValues> layout="vertical" onFinish={onSubmit}>
      <Form.Item
        label="Task Title"
        name="title"
        rules={[{ required: true, message: "Please enter task title" }]}
      >
        <Input />
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

      <Button type="primary" htmlType="submit">
        Create Task
      </Button>
    </Form>
  )
}