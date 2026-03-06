import { Table, Tag } from "antd"
import type { ColumnsType } from "antd/es/table"

interface Task { id: string; title: string; status: string; priority: string }

export default function TaskBoard({ tasks }: { tasks: Task[] }) {
  const columns: ColumnsType<Task> = [
    { title: 'Tên công việc', dataIndex: 'title', key: 'title', className: 'font-medium text-slate-700' },
    {
      title: 'Trạng thái', dataIndex: 'status', key: 'status',
      render: (status) => {
        const color = status === 'done' ? 'success' : status === 'in-progress' ? 'processing' : 'default'
        const text = status === 'done' ? 'Hoàn thành' : status === 'in-progress' ? 'Đang làm' : 'Cần làm'
        return <Tag color={color}>{text}</Tag>
      },
    },
    {
      title: 'Ưu tiên', dataIndex: 'priority', key: 'priority',
      render: (priority) => {
        const color = priority === 'high' ? 'error' : priority === 'medium' ? 'warning' : 'success'
        return <Tag color={color} bordered={false}>{priority.toUpperCase()}</Tag>
      }
    },
  ]

  return <Table columns={columns} dataSource={tasks.map(t => ({ ...t, key: t.id }))} pagination={{ pageSize: 5 }} />
}