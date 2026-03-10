"use client"

import { Task } from "@/types/task"
import { Table } from "antd"

interface Props {
  tasks?: Task[]
}

export default function TaskBoard({ tasks = [] }: Props) {
  return (
    <Table
      rowKey="id"
      dataSource={tasks}
      columns={[
        {
          title: "Title",
          dataIndex: "title",
        },
        {
          title: "Status",
          dataIndex: "status",
        },
        {
          title: "Priority",
          dataIndex: "priority",
        },
      ]}
    />
  )
}