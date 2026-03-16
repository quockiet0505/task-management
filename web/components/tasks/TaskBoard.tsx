"use client"

import { Task } from "@/types/task"
import { Table, Tag, Space, Button, Popconfirm, message } from "antd"
import { EditOutlined, DeleteOutlined } from "@ant-design/icons"
import { ColumnsType } from "antd/es/table"

interface Props {
  tasks?: Task[]
  onEdit?: (task: Task) => void
  onDelete?: (taskId: string) => Promise<void>
}

export default function TaskBoard({ tasks = [], onEdit, onDelete }: Props) {
  const handleDelete = async (taskId: string) => {
    try {
      await onDelete?.(taskId)
      message.success("Task deleted successfully")
    } catch (error) {
      console.error("Delete error:", error) 
      message.error("Failed to delete task")
    }
  }

  const columns: ColumnsType<Task> = [
    {
      title: "STT",
      render: (_, __, index: number) => index + 1,
      width: 70,
    },
    {
      title: "Title",
      dataIndex: "title",
      key: "title",
      sorter: (a: Task, b: Task) => (a.title || "").localeCompare(b.title || ""),
    },
    {
      title: "Status",
      dataIndex: "status",
      key: "status",
      render: (status: string) => {
        const color =
          status === "done"
            ? "green"
            : status === "in-progress"
            ? "blue"
            : "orange"

        return <Tag color={color}>{status}</Tag>
      },
      filters: [
        { text: 'Todo', value: 'todo' },
        { text: 'In Progress', value: 'in-progress' },
        { text: 'Done', value: 'done' },
      ],
      onFilter: (value, record) => { if (typeof value === 'string') { return record.status === value } return false },
    },
    {
      title: "Priority",
      dataIndex: "priority",
      key: "priority",
      render: (priority: string) => {
        const color =
          priority === "high"
            ? "red"
            : priority === "medium"
            ? "gold"
            : "green"

        return <Tag color={color}>{priority}</Tag>
      },
      filters: [
        { text: 'Low', value: 'low' },
        { text: 'Medium', value: 'medium' },
        { text: 'High', value: 'high' },
      ],
      onFilter: (value, record) => { if (typeof value === 'string') { return record.status === value } return false },
    },
    {
      title: "Created",
      dataIndex: "created_at",
      key: "created_at",
      render: (date: string) =>
        date ? new Date(date).toLocaleDateString("vi-VN") : "",
      sorter: (a: Task, b: Task) => 
        new Date(a.createdAt || "").getTime() - new Date(b.createdAt || "").getTime(),
    },
    {
      title: "Actions",
      key: "actions",
      width: 200,
      render: (_: unknown, record: Task) => (
        <Space>
          <Button
            type="primary"
            icon={<EditOutlined />}
            size="small"
            onClick={() => onEdit?.(record)}
          >
            Edit
          </Button>
          <Popconfirm
            title="Delete task"
            description="Are you sure you want to delete this task?"
            onConfirm={() => handleDelete(record.id)}
            okText="Yes"
            cancelText="No"
          >
            <Button 
              danger 
              icon={<DeleteOutlined />} 
              size="small"
            >
              Delete
            </Button>
          </Popconfirm>
        </Space>
      ),
    },
  ]

  return (
    <Table
      rowKey="id"
      dataSource={tasks}
      columns={columns}
      pagination={{ 
        pageSize: 8,
        showSizeChanger: true,
        showTotal: (total) => `Total ${total} tasks`
      }}
      bordered
    />
  )
}