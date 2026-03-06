import { useState } from "react"
import { Button, Typography, Modal, message, Space } from "antd"
import { PlusOutlined } from "@ant-design/icons"
import TaskBoard from "@/components/tasks/TaskBoard"
import TaskForm, { type TaskFormValues } from "@/components/tasks/TaskForm"
import OrgSelector from "@/components/org/OrgSelector"
import DashboardLayout from "@/components/layout/DashboardLayout"

const { Title } = Typography

export default function TasksPage() {
  const [tasks, setTasks] = useState([
    { id: "1", title: "Khởi tạo dự án", status: "done", priority: "high" },
    { id: "2", title: "Viết API Backend", status: "in-progress", priority: "medium" },
  ])
  const [isModalOpen, setIsModalOpen] = useState(false)

  const handleCreateTask = (values: TaskFormValues) => {
    setTasks([...tasks, { id: Date.now().toString(), title: values.title, status: "todo", priority: values.priority }])
    setIsModalOpen(false)
    message.success("Tạo công việc thành công!")
  }

  return (
    <DashboardLayout>
      <div className="flex justify-between items-center mb-6">
        <Space size="large">
          <Title level={3} className="!mb-0">Công việc</Title>
          <div className="w-48"><OrgSelector /></div>
        </Space>
        <Button type="primary" icon={<PlusOutlined />} onClick={() => setIsModalOpen(true)}>Tạo Task</Button>
      </div>
      <TaskBoard tasks={tasks} />
      <Modal title="Thêm công việc mới" open={isModalOpen} onCancel={() => setIsModalOpen(false)} footer={null}>
        <TaskForm onSubmit={handleCreateTask} />
      </Modal>
    </DashboardLayout>
  )
}