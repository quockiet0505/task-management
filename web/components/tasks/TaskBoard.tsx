"use client"

import { Table, Tag, Card } from "antd"

interface Task {
  id: string
  title: string
  status: "todo" | "in-progress" | "done"
}

interface Props {
  tasks?: Task[]
}

export default function TaskBoard({ tasks = [] }: Props) {
  const columns = [
    {
      title: "Task",
      dataIndex: "title",
    },
    {
      title: "Status",
      dataIndex: "status",
      render: (status: Task["status"]) => {
        const color =
          status === "done"
            ? "green"
            : status === "in-progress"
            ? "blue"
            : "orange"

        return <Tag color={color}>{status}</Tag>
      },
    },
  ]

  return (
    <Card title="Task Board">
      <Table
        rowKey="id"
        columns={columns}
        dataSource={tasks}
        pagination={false}
      />
    </Card>
  )
}