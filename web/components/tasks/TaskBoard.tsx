"use client"

import { Task } from "@/types/task"
import { Table, Tag, Space, Button, Popconfirm, message } from "antd"
import { EditOutlined, DeleteOutlined } from "@ant-design/icons"
import { ColumnsType } from "antd/es/table"
import dayjs from "dayjs"

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
      message.error("Failed to delete task")
    }
  }

  const columns: ColumnsType<Task> = [
    {
      title: "STT",
      key: "index",
      render: (_, __, index: number) => index + 1,
      width: 70,
    },
    {
      title: "Title",
      dataIndex: "title",
      key: "title",
      sorter: (a, b) => (a.title || "").localeCompare(b.title || ""),
    },
    {
      title: "Organization",
      dataIndex: "organizationName",
      key: "organizationName",
      render: (name?: string) => name || "N/A",
    },
    {
      title: "Status",
      dataIndex: "status",
      key: "status",
      render: (status: string) => {
        const color = 
          status === "done" ? "green" : 
          status === "in-progress" ? "blue" : 
          "orange"
        return <Tag color={color}>{status}</Tag>
      },
      filters: [
        { text: 'Todo', value: 'todo' },
        { text: 'In Progress', value: 'in-progress' },
        { text: 'Done', value: 'done' },
      ],
      onFilter: (value, record) => record.status === value,
    },
    {
      title: "Priority",
      dataIndex: "priority",
      key: "priority",
      render: (priority: string) => {
        const color = 
          priority === "high" ? "red" : 
          priority === "medium" ? "gold" : 
          "green"
        return <Tag color={color}>{priority}</Tag>
      },
      filters: [
        { text: 'Low', value: 'low' },
        { text: 'Medium', value: 'medium' },
        { text: 'High', value: 'high' },
      ],
      onFilter: (value, record) => record.priority === value,
    },
    
    {
      title: "Created",
      dataIndex: "createdAt",
      key: "createdAt",
      render: (date?: Date) => 
        date ? dayjs(date).format("DD/MM/YYYY") : "",
      sorter: (a, b) => 
        new Date(a.createdAt || "").getTime() - new Date(b.createdAt || "").getTime(),
    },
    {
      title: "Due Date",
      dataIndex: "dueDate",
      key: "dueDate",
      render: (date?: Date | null) => {
        if (!date) return "No due date"
        const dueDate = dayjs(date)
        const today = dayjs()
        const isOverdue = dueDate.isBefore(today, 'day') && !dueDate.isSame(today, 'day')
        
        return (
          <span style={{ color: isOverdue ? 'red' : 'inherit' }}>
            {dueDate.format("DD/MM/YYYY")}
            {isOverdue && " ⚠️"}
          </span>
        )
      },
      sorter: (a, b) => {
        const dateA = a.dueDate ? new Date(a.dueDate).getTime() : 0
        const dateB = b.dueDate ? new Date(b.dueDate).getTime() : 0
        return dateA - dateB
      },
    },
    
    {
      title: "Actions",
      key: "actions",
      width: 150,
      render: (_, record) => (
        <Space>
          <Button 
            icon={<EditOutlined />} 
            onClick={() => onEdit?.(record)}
            type="primary"
            ghost
            size="small"
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
            <Button danger icon={<DeleteOutlined />} size="small">
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