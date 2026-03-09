"use client"

import { Table } from "antd"

interface Member {
  userId: string
  role: string
}

interface Props {
  members?: Member[]
}

export default function MemberList({ members = [] }: Props) {
  return (
    <Table
      rowKey="userId"
      columns={[
        {
          title: "User",
          dataIndex: "userId",
        },
        {
          title: "Role",
          dataIndex: "role",
        },
      ]}
      dataSource={members}
    />
  )
}