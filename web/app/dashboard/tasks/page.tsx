"use client"

import { Typography, Button, Modal } from "antd"
import { PlusOutlined } from "@ant-design/icons"
import { useState } from "react"
import DashboardLayout from "@/components/layout/DashboardLayout"
import TaskBoard from "@/components/tasks/TaskBoard"
import TaskForm, { TaskFormValues } from "@/components/tasks/TaskForm"

const { Title } = Typography

export default function TasksPage() {
  const [open, setOpen] = useState(false)

  const handleCreateTask = (values: TaskFormValues) => {
    console.log(values)
    setOpen(false)
  }

  return (
    <DashboardLayout>
      <Title level={3}>Tasks</Title>

      <Button
        icon={<PlusOutlined />}
        type="primary"
        onClick={() => setOpen(true)}
      >
        Create Task
      </Button>

      <TaskBoard />

      <Modal open={open} footer={null} onCancel={() => setOpen(false)}>
        <TaskForm onSubmit={handleCreateTask} />
      </Modal>
    </DashboardLayout>
  )
}